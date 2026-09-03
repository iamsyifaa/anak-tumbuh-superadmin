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
    return mockStoreSchool(
      String(formData.get("name")),
      formData.get("level") as EducationLevel,
      String(formData.get("address"))
    );
  }

  const response = await fetch(`${envConfig.apiBaseUrl}/v1/schools`, {
    method: "POST",
    headers: authHeaders(token),
    body: formData,
  });
  return response.json();
};

export const updateSchoolApi = async (id: string, formData: FormData, token: string) => {
  if (envConfig.useMockApi) return mockUpdateSchool(id);

  formData.append("_method", "PUT");
  const response = await fetch(`${envConfig.apiBaseUrl}/v1/schools/${id}`, {
    method: "POST",
    headers: authHeaders(token),
    body: formData,
  });
  return response.json();
};
