const rawBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "")
  .trim()
  .replace(/\/+$/, "");

// Semua route backend ada di bawah prefiks /api/v1 (routes/api.php memakai
// Route::prefix('v1'); API Contract §7). Awalan yang kurang dilengkapi di sini
// supaya salah set env tidak membuat semua request nyasar (404):
//   http://host            -> http://host/api/v1
//   http://host/api        -> http://host/api/v1
//   http://host/api/v1     -> tetap
const normalizeBaseUrl = (url: string) => {
  if (!url) return url;
  if (/\/api\/v1$/i.test(url)) return url;
  if (/\/api$/i.test(url)) return `${url}/v1`;
  return `${url}/api/v1`;
};
const apiBaseUrl = normalizeBaseUrl(rawBaseUrl);

// Dipakai buat coba tampilan dashboard sambil nunggu backend Laravel-nya
// siap — lihat lib/api/mockData.ts. Cabut flag ini (atau set "false" di
// .env.local) begitu backend-nya udah bisa dipanggil beneran.
const useMockApi = (process.env.NEXT_PUBLIC_USE_MOCK_API ?? "false") === "true";

export const envConfig = {
  apiBaseUrl,
  useMockApi,
} as const;
