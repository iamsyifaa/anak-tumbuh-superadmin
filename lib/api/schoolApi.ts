import { envConfig } from "@/lib/config/envConfig";
import { apiRequest, apiRequestAll, type ApiResult } from "@/lib/api/client";
import { asRec, pick, toNum, toStr, type Rec } from "@/lib/api/mappers";
import type { CreateSchoolInput, School } from "@/lib/types/schoolType";
import { mockGetSchoolList, mockStoreSchool, unwrapMock } from "./mockData";

// Endpoint backend: GET/POST /schools dan GET /schools/{id} (khusus super
// admin). Tidak ada PATCH/DELETE sekolah, jadi edit & hapus tidak tersedia.
const ENDPOINT = "/schools";

export interface ListParams {
  search: string;
  page: number;
  perPage: number;
}

const mapSchool = (
  raw: Rec,
  headmaster?: { id: string; name: string },
): School => ({
  id: toStr(raw.id),
  name: toStr(raw.name),
  address: toStr(raw.address) || undefined,
  headmasterName: headmaster?.name,
  headmasterAccountId: headmaster?.id,
  totalTeachers: toNum(pick(raw, "teachers_count")),
  totalStudents: toNum(pick(raw, "students_count")),
  createdAt: toStr(raw.created_at),
});

// Backend belum mendukung pencarian dan resource sekolah tidak memuat kepala
// sekolah. Jadi: ambil semua sekolah + semua kepala sekolah, gabungkan
// (kepala sekolah berstatus active), cari dan paginasi di frontend.
export const getSchoolListApi = async ({
  search,
  page,
  perPage,
}: ListParams): Promise<ApiResult<School[]>> => {
  if (envConfig.useMockApi) return unwrapMock(await mockGetSchoolList(search));

  const [schoolRows, headmasterRows] = await Promise.all([
    apiRequestAll(ENDPOINT),
    apiRequestAll("/headmasters").catch(() => [] as unknown[]),
  ]);

  const activeHeadmasterBySchool = new Map<
    string,
    { id: string; name: string }
  >();
  headmasterRows.map(asRec).forEach((row) => {
    if (toStr(row.status) !== "active") return;
    activeHeadmasterBySchool.set(toStr(row.school_id), {
      id: toStr(row.id),
      name: toStr(row.name),
    });
  });

  const keyword = search.trim().toLowerCase();
  const all = schoolRows
    .map(asRec)
    .map((row) => mapSchool(row, activeHeadmasterBySchool.get(toStr(row.id))))
    .filter(
      (school) => !keyword || school.name.toLowerCase().includes(keyword),
    );

  const size = Math.max(1, perPage);
  const start = (Math.max(1, page) - 1) * size;
  return {
    data: all.slice(start, start + size),
    meta: {
      page,
      per_page: size,
      total: all.length,
      total_pages: Math.max(1, Math.ceil(all.length / size)),
    },
  };
};

export const storeSchoolApi = async (
  input: CreateSchoolInput,
): Promise<ApiResult<School>> => {
  if (envConfig.useMockApi) {
    return unwrapMock(
      await mockStoreSchool(input.name, "SD", input.address ?? "", undefined),
    );
  }

  const { data } = await apiRequest<unknown>(ENDPOINT, {
    method: "POST",
    body: { name: input.name, address: input.address || undefined },
  });
  return { data: mapSchool(asRec(data)) };
};
