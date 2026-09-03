import { envConfig } from "@/lib/config/envConfig";
import { AuthApiResponse } from "@/lib/types/authType";
import { mockLogin } from "./mockData";

// Requirement doc bagian 8: Super Admin (bersama Headmaster & Teacher)
// login menggunakan Username/Email + Password yang diamankan Laravel
// Sanctum. Tidak ada login QR di app ini — QR hanya untuk Student.
export const loginWithPasswordApi = async (
  formData: FormData
): Promise<AuthApiResponse> => {
  if (envConfig.useMockApi) {
    return mockLogin(String(formData.get("username")), String(formData.get("password")));
  }

  const response = await fetch(`${envConfig.apiBaseUrl}/v1/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });
  const result = await response.json();
  return result;
};
