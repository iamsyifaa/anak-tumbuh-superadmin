import { envConfig } from "@/lib/config/envConfig";
import { mockGetPlatformSummary, mockGetSchoolRecap } from "./mockData";

const authHeaders = (token: string) => ({
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
});

export const getPlatformSummaryApi = async (token: string) => {
  if (envConfig.useMockApi) return mockGetPlatformSummary();

  const response = await fetch(`${envConfig.apiBaseUrl}/v1/dashboard/summary`, {
    headers: authHeaders(token),
  });
  return response.json();
};

export const getSchoolRecapApi = async (token: string, startDate: string, endDate: string) => {
  if (envConfig.useMockApi) return mockGetSchoolRecap();

  const params = new URLSearchParams({ start_date: startDate, end_date: endDate });
  const response = await fetch(`${envConfig.apiBaseUrl}/v1/reports/schools?${params.toString()}`, {
    headers: authHeaders(token),
  });
  return response.json();
};
