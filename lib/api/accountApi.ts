import { envConfig } from "@/lib/config/envConfig";
import { apiRequest, apiRequestAll, type ApiResult } from "@/lib/api/client";
import { asRec, toStr, type Rec } from "@/lib/api/mappers";
import type {
  Account,
  AccountStatus,
  CreateAccountInput,
  Gender,
} from "@/lib/types/accountType";
import { mockGetAccountList, mockStoreAccount, unwrapMock } from "./mockData";

// Endpoint backend: /headmasters (GET list, POST, GET {id}, POST
// {id}/reset-password), khusus super admin. Tidak ada PATCH/DELETE akun.
const ENDPOINT = "/headmasters";

export interface AccountListParams {
  search: string;
  page: number;
  perPage: number;
}

const mapAccount = (raw: Rec, schoolName?: string): Account => ({
  id: toStr(raw.id),
  name: toStr(raw.name),
  // Backend: username login kepala sekolah = NIP.
  username: toStr(raw.nip),
  nip: toStr(raw.nip) || undefined,
  gender: (toStr(raw.gender) || undefined) as Gender | undefined,
  status: (toStr(raw.status) || undefined) as AccountStatus | undefined,
  role: "headmaster",
  schoolId: toStr(raw.school_id) || undefined,
  schoolName,
});

const fetchSchoolNames = async (): Promise<Map<string, string>> => {
  const rows = await apiRequestAll("/schools").catch(() => [] as unknown[]);
  return new Map(
    rows.map(asRec).map((row) => [toStr(row.id), toStr(row.name)]),
  );
};

// Backend belum mendukung pencarian & resource kepala sekolah tidak memuat
// nama sekolah: ambil semua, gabungkan nama sekolah, cari & paginasi di sini.
export const getAccountListApi = async ({
  search,
  page,
  perPage,
}: AccountListParams): Promise<ApiResult<Account[]>> => {
  if (envConfig.useMockApi) return unwrapMock(await mockGetAccountList(search));

  const [rows, schoolNames] = await Promise.all([
    apiRequestAll(ENDPOINT),
    fetchSchoolNames(),
  ]);

  const keyword = search.trim().toLowerCase();
  const all = rows
    .map(asRec)
    .map((row) => mapAccount(row, schoolNames.get(toStr(row.school_id))))
    .filter(
      (account) =>
        !keyword ||
        account.name.toLowerCase().includes(keyword) ||
        (account.nip ?? "").toLowerCase().includes(keyword),
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

export const storeAccountApi = async (
  input: CreateAccountInput,
): Promise<ApiResult<Account>> => {
  if (envConfig.useMockApi) {
    return unwrapMock(
      await mockStoreAccount(input.name, input.nip, input.nip, "headmaster"),
    );
  }

  const { data } = await apiRequest<unknown>(ENDPOINT, {
    method: "POST",
    body: {
      school_id: Number(input.schoolId),
      name: input.name,
      nip: input.nip,
      gender: input.gender,
    },
  });
  return { data: mapAccount(asRec(data)) };
};
