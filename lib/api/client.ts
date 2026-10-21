import { envConfig } from "@/lib/config/envConfig";

// Client API bersama untuk aplikasi Super Admin. Membuka envelope backend:
//   sukses -> { data, meta }
//   error  -> { error: { code, message, details } }
// dan memutuskan perilaku berdasarkan STATUS HTTP, bukan field `code` di body.

export const ACCESS_TOKEN_KEY = "access_token";

export interface ApiMeta {
  page?: number;
  per_page?: number;
  total?: number;
  total_pages?: number;
}

export interface ApiResult<T> {
  data: T;
  meta?: ApiMeta;
}

export class ApiError extends Error {
  status: number;
  code: string;
  details?: unknown;

  constructor(
    status: number,
    code: string,
    message: string,
    details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
};

export const saveAccessToken = (token: string) => {
  window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const clearAccessToken = () => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  } catch {
    // abaikan: storage bisa diblokir browser
  }
};

// Sesi habis / token ditolak: hapus token lalu kembali ke halaman login.
// Pakai navigasi penuh (bukan router) supaya seluruh state Redux ikut bersih.
export const handleSessionExpired = () => {
  clearAccessToken();
  if (typeof window !== "undefined" && window.location.pathname !== "/") {
    window.location.replace("/");
  }
};

// Validasi Laravel: details berbentuk { field: ["pesan", ...] }.
const firstDetailMessage = (details: unknown): string | null => {
  if (!details || typeof details !== "object") return null;
  for (const value of Object.values(details as Record<string, unknown>)) {
    if (Array.isArray(value) && typeof value[0] === "string") return value[0];
    if (typeof value === "string") return value;
  }
  return null;
};

const fallbackMessage = (status: number) => {
  if (status === 401) return "Sesi berakhir. Silakan masuk kembali.";
  if (status === 403) return "Kamu tidak punya akses untuk tindakan ini.";
  if (status === 404) return "Data tidak ditemukan.";
  if (status === 429)
    return "Terlalu banyak percobaan. Tunggu sebentar lalu coba lagi.";
  if (status === 409) return "Data bentrok dengan data yang sudah ada.";
  if (status === 422) return "Data yang dikirim tidak valid.";
  if (status >= 500) return "Server sedang bermasalah. Coba lagi nanti.";
  return "Request API gagal.";
};

interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  query?: Record<string, string | number | undefined | null>;
  // Token eksplisit, dipakai tepat setelah login sebelum token disimpan.
  token?: string;
  // false untuk endpoint login: 401 di sana artinya kredensial salah,
  // bukan sesi habis.
  redirectOn401?: boolean;
}

export async function apiRequest<T>(
  path: string,
  {
    method = "GET",
    body,
    query,
    token,
    redirectOn401 = true,
  }: RequestOptions = {},
): Promise<ApiResult<T>> {
  if (!envConfig.apiBaseUrl)
    throw new Error("NEXT_PUBLIC_API_BASE_URL belum dikonfigurasi.");

  const params = new URLSearchParams();
  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "")
      params.set(key, String(value));
  });
  const queryString = params.toString();
  const url = `${envConfig.apiBaseUrl}${path}${queryString ? `?${queryString}` : ""}`;

  const accessToken = token ?? getAccessToken();
  // Kegagalan jaringan sengaja dibiarkan sebagai TypeError dari fetch —
  // alur offline (PWA) mengandalkan itu untuk mendeteksi "sedang offline".
  const response = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // Body bisa kosong atau bukan JSON (mis. 204, atau error dari proxy).
  const raw = await response.text();
  let json: Record<string, unknown> | null = null;
  try {
    json = raw ? (JSON.parse(raw) as Record<string, unknown>) : null;
  } catch {
    json = null;
  }

  if (!response.ok) {
    if (response.status === 401 && redirectOn401) handleSessionExpired();

    const errorBody = (json?.error ?? null) as {
      code?: string;
      message?: string;
      details?: unknown;
    } | null;
    const message =
      (response.status === 422
        ? firstDetailMessage(errorBody?.details)
        : null) ??
      errorBody?.message ??
      (typeof json?.message === "string" ? json.message : null) ??
      fallbackMessage(response.status);
    throw new ApiError(
      response.status,
      errorBody?.code ?? `HTTP_${response.status}`,
      message,
      errorBody?.details,
    );
  }

  if (!json) return { data: undefined as T };
  return {
    data: (json.data !== undefined ? json.data : json) as T,
    meta: json.meta as ApiMeta | undefined,
  };
}

// Ambil SEMUA halaman sebuah daftar (per_page maks 100 di backend). Dipakai
// untuk daftar kecil (sekolah, kepala sekolah) yang difilter/digabung di
// frontend karena backend belum mendukung pencarian.
export async function apiRequestAll(
  path: string,
  maxPages = 20,
): Promise<unknown[]> {
  const rows: unknown[] = [];
  for (let page = 1; page <= maxPages; page += 1) {
    const { data, meta } = await apiRequest<unknown>(path, {
      query: { page, per_page: 100 },
    });
    if (Array.isArray(data)) rows.push(...data);
    if (!meta?.total_pages || page >= meta.total_pages) break;
  }
  return rows;
}

// 429 = kena rate limit (error.code rate_limit_exceeded). Jangan retry
// otomatis: tampilkan pesan dan nonaktifkan tombol sementara.
export const isRateLimited = (error: unknown) =>
  error instanceof ApiError && error.status === 429;

export const getErrorMessage = (
  error: unknown,
  fallback = "Terjadi kesalahan.",
) => (error instanceof Error && error.message ? error.message : fallback);
