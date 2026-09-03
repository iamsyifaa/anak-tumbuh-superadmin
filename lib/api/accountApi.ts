import { envConfig } from "@/lib/config/envConfig";
import { AccountRole } from "@/lib/types/accountType";
import { mockGetAccountList, mockStoreAccount, mockUpdateAccount } from "./mockData";

const authHeaders = (token: string) => ({
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
});

export const getAccountListApi = async (token: string, search: string, page: number, limit: number) => {
  if (envConfig.useMockApi) return mockGetAccountList(search);

  const params = new URLSearchParams({ search, page: String(page), limit: String(limit) });
  const response = await fetch(`${envConfig.apiBaseUrl}/v1/accounts?${params.toString()}`, {
    headers: authHeaders(token),
  });
  return response.json();
};

export const storeAccountApi = async (formData: FormData, token: string) => {
  if (envConfig.useMockApi) {
    return mockStoreAccount(
      String(formData.get("name")),
      String(formData.get("username")),
      String(formData.get("email")),
      formData.get("role") as AccountRole,
      String(formData.get("school_id"))
    );
  }

  const response = await fetch(`${envConfig.apiBaseUrl}/v1/accounts`, {
    method: "POST",
    headers: authHeaders(token),
    body: formData,
  });
  return response.json();
};

export const updateAccountApi = async (id: string, formData: FormData, token: string) => {
  if (envConfig.useMockApi) return mockUpdateAccount(id);

  formData.append("_method", "PUT");
  const response = await fetch(`${envConfig.apiBaseUrl}/v1/accounts/${id}`, {
    method: "POST",
    headers: authHeaders(token),
    body: formData,
  });
  return response.json();
};
