const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").trim();

// Dipakai buat coba tampilan dashboard sambil nunggu backend Laravel-nya
// siap — lihat lib/api/mockData.ts. Cabut flag ini (atau set "false" di
// .env.local) begitu backend-nya udah bisa dipanggil beneran.
const useMockApi = (process.env.NEXT_PUBLIC_USE_MOCK_API ?? "false") === "true";

export const envConfig = {
  apiBaseUrl: apiBaseUrl.replace(/\/$/, ""),
  useMockApi,
} as const;
