const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").trim();

export const envConfig = {
  apiBaseUrl: apiBaseUrl.replace(/\/$/, ""),
} as const;
