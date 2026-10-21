import { envConfig } from "@/lib/config/envConfig";
import { apiRequest, apiRequestAll } from "@/lib/api/client";
import { asRec, pick, toNum } from "@/lib/api/mappers";
import type { PlatformSummary, SchoolRecapRow } from "@/lib/types/reportType";
import {
  mockGetPlatformSummary,
  mockGetSchoolRecap,
  unwrapMock,
} from "./mockData";

// Backend: GET /dashboard/super-admin -> { school_count, headmaster_count }.
// Total guru & siswa tidak ada di sana; dijumlahkan dari daftar sekolah
// (teachers_count & students_count per sekolah).
export const getPlatformSummaryApi = async (): Promise<PlatformSummary> => {
  if (envConfig.useMockApi)
    return unwrapMock<PlatformSummary>(await mockGetPlatformSummary()).data;

  const [{ data }, schools] = await Promise.all([
    apiRequest<unknown>("/dashboard/super-admin"),
    apiRequestAll("/schools").catch(() => [] as unknown[]),
  ]);
  const rec = asRec(data);
  const rows = schools.map(asRec);
  return {
    totalSchools: toNum(pick(rec, "school_count")),
    totalHeadmasters: toNum(pick(rec, "headmaster_count")),
    totalTeachers: rows.reduce((sum, row) => sum + toNum(row.teachers_count), 0),
    totalStudents: rows.reduce((sum, row) => sum + toNum(row.students_count), 0),
  };
};

// Backend belum punya endpoint rekap per sekolah, jadi mode asli mengembalikan
// daftar kosong (grafik rekap disembunyikan dari dashboard).
export const getSchoolRecapApi = async (
  startDate: string,
  endDate: string,
): Promise<SchoolRecapRow[]> => {
  if (envConfig.useMockApi) {
    void startDate;
    void endDate;
    return unwrapMock<SchoolRecapRow[]>(await mockGetSchoolRecap()).data;
  }
  return [];
};
