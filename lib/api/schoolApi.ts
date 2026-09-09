import { envConfig } from "@/lib/config/envConfig";
import { EducationLevel } from "@/lib/types/schoolType";
import { mockGetSchoolList, mockStoreSchool, mockUpdateSchool } from "./mockData";

const authHeaders = (token: string) => ({
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
});

export const getSchoolListApi = async (token: string, search: string, page: number, limit: number) => {
  if (envConfig.useMockApi) return mockGetSchoolList(search);

  const params = new URLSearchParams({ search, page: String(page), limit: String(limit) });
  const response = await fetch(`${envConfig.apiBaseUrl}/v1/schools?${params.toString()}`, {
    headers: authHeaders(token),
  });
  return response.json();
};

export const storeSchoolApi = async (formData: FormData, token: string) => {
  if (envConfig.useMockApi) {
    const headmasterAccountId = formData.get("headmaster_account_id");
    return mockStoreSchool(
      String(formData.get("name")),
      formData.get("level") as EducationLevel,
      String(formData.get("address")),
      headmasterAccountId ? String(headmasterAccountId) : undefined
    );
  }

  const response = await fetch(`${envConfig.apiBaseUrl}/v1/schools`, {
    method: "POST",
    headers: authHeaders(token),
    body: formData,
  });
  return parseSchoolResponse(response);
};

export const updateSchoolApi = async (id: string, formData: FormData, token: string) => {
  if (envConfig.useMockApi) {
    const headmasterAccountId = formData.get("headmaster_account_id");
    return mockUpdateSchool(id, headmasterAccountId ? String(headmasterAccountId) : undefined);
  }

  formData.append("_method", "PUT");
  const response = await fetch(`${envConfig.apiBaseUrl}/v1/schools/${id}`, {
    method: "POST",
    headers: authHeaders(token),
    body: formData,
  });
  return parseSchoolResponse(response);
};

// Backend kadang balikin body non-JSON kalau error (mis. 404/500 dari
// proxy, atau apiBaseUrl belum di-set jadi nyasar ke halaman Next.js
// sendiri). Tanpa ini, response.json() bakal throw error parsing yang
// bikin bingung ("Unexpected token '<'...") dan gagal simpan jadi
// kelihatan seperti tidak terjadi apa-apa.
const parseSchoolResponse = async (response: Response) => {
  const raw = await response.text();
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error(
      response.ok
        ? "Server memberi respons yang tidak valid."
        : `Gagal menghubungi server (status ${response.status}). Pastikan NEXT_PUBLIC_API_BASE_URL sudah benar.`
    );
  }
};
