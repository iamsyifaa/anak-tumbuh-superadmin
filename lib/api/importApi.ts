import { envConfig } from "@/lib/config/envConfig";
import { mockImportData } from "./mockData";

const authHeaders = (token: string) => ({
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
});

// Requirement doc bagian 7: backend menjalankan Upload -> Validasi Strict ->
// Preview -> Generate Akun dalam satu alur; endpoint ini menangani
// upload + konfirmasi setelah pengguna melihat preview-nya.
export const importDataApi = async (formData: FormData, token: string) => {
  if (envConfig.useMockApi) return mockImportData();

  const response = await fetch(`${envConfig.apiBaseUrl}/v1/import`, {
    method: "POST",
    headers: authHeaders(token),
    body: formData,
  });
  return response.json();
};
