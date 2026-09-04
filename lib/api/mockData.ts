import { Account } from "@/lib/types/accountType";
import { AuthApiResponse, AuthenticatedUser } from "@/lib/types/authType";
import { PlatformSummary, SchoolRecapRow } from "@/lib/types/reportType";
import { School } from "@/lib/types/schoolType";

// Data dummy sementara buat preview UI selagi backend Laravel belum siap.
// Semua fungsi di sini dipakai dari lib/api/*.ts kalau
// NEXT_PUBLIC_USE_MOCK_API="true". Hapus file ini + baris pengecekan
// envConfig.useMockApi di tiap lib/api/*.ts begitu backend-nya udah jalan.

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_USER: AuthenticatedUser = {
  id: "1",
  name: "Admin anaktumbuh",
  username: "admin",
  role: "super_admin",
  avatarUrl: undefined,
};

export async function mockLogin(
  username: string,
  password: string,
): Promise<AuthApiResponse> {
  await delay();
  if (username === "admin" && password === "admin123") {
    return {
      code: 200,
      status: "success",
      message: "Berhasil masuk (mode dummy).",
      data: MOCK_USER,
      access_token: "mock-access-token",
    };
  }
  return {
    code: 401,
    status: "error",
    message:
      "Username atau password salah. (mode dummy: pakai admin / admin123)",
    data: MOCK_USER,
    access_token: "",
  };
}

const MOCK_SCHOOLS: School[] = [
  {
    id: "s1",
    name: "SDN Melati 01",
    level: "SD",
    address: "Jl. Melati No. 1",
    headmasterName: "Budi Santoso",
    totalTeachers: 12,
    totalStudents: 240,
    createdAt: "2025-07-01",
  },
  {
    id: "s2",
    name: "TK Ceria Bahagia",
    level: "TK",
    address: "Jl. Kenanga No. 5",
    headmasterName: "Siti Aminah",
    totalTeachers: 6,
    totalStudents: 90,
    createdAt: "2025-07-02",
  },
  {
    id: "s3",
    name: "SDN Mawar 03",
    level: "SD",
    address: "Jl. Mawar No. 3",
    headmasterName: "Andi Wijaya",
    totalTeachers: 18,
    totalStudents: 360,
    createdAt: "2025-07-03",
  },
];

export async function mockGetSchoolList(search: string) {
  await delay();
  const data = MOCK_SCHOOLS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );
  return {
    code: 200,
    message: "OK (mode dummy)",
    data,
    pagination: { total_items: data.length },
  };
}

export async function mockStoreSchool(
  name: string,
  level: "SD" | "TK",
  address: string,
) {
  await delay();
  const newSchool: School = {
    id: `s${Date.now()}`,
    name,
    level,
    address,
    totalTeachers: 0,
    totalStudents: 0,
    createdAt: new Date().toISOString(),
  };
  MOCK_SCHOOLS.unshift(newSchool);
  return {
    code: 201,
    message: "Sekolah berhasil ditambahkan (mode dummy).",
    data: newSchool,
  };
}

export async function mockUpdateSchool(id: string) {
  await delay();
  const school = MOCK_SCHOOLS.find((s) => s.id === id) ?? MOCK_SCHOOLS[0];
  return {
    code: 200,
    message: "Sekolah berhasil diperbarui (mode dummy).",
    data: school,
  };
}

const MOCK_ACCOUNTS: Account[] = [
  {
    id: "a1",
    name: "Budi Santoso",
    username: "budi.headmaster",
    role: "headmaster",
    schoolId: "s1",
    schoolName: "SDN Melati 01",
  },
  {
    id: "a2",
    name: "Siti Aminah",
    username: "siti.headmaster",
    role: "headmaster",
    schoolId: "s2",
    schoolName: "TK Ceria Bahagia",
  },
];

export async function mockGetAccountList(search: string) {
  await delay();
  const data = MOCK_ACCOUNTS.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()),
  );
  return {
    code: 200,
    message: "OK (mode dummy)",
    data,
    pagination: { total_items: data.length },
  };
}

export async function mockStoreAccount(
  name: string,
  username: string,
  email: string,
  role: "headmaster",
  schoolId: string,
) {
  await delay();
  const school = MOCK_SCHOOLS.find((s) => s.id === schoolId);
  const newAccount: Account = {
    id: `a${Date.now()}`,
    name,
    username,
    email,
    role,
    schoolId,
    schoolName: school?.name ?? "-",
  };
  MOCK_ACCOUNTS.unshift(newAccount);
  return {
    code: 201,
    message: "Akun berhasil ditambahkan (mode dummy).",
    data: newAccount,
  };
}

export async function mockUpdateAccount(id: string) {
  await delay();
  const account = MOCK_ACCOUNTS.find((a) => a.id === id) ?? MOCK_ACCOUNTS[0];
  return {
    code: 200,
    message: "Akun berhasil diperbarui (mode dummy).",
    data: account,
  };
}

const MOCK_SUMMARY: PlatformSummary = {
  totalSchools: MOCK_SCHOOLS.length,
  totalHeadmasters: 2,
  totalTeachers: 0,
  totalStudents: 690,
};

export async function mockGetPlatformSummary() {
  await delay();
  return { code: 200, message: "OK (mode dummy)", data: MOCK_SUMMARY };
}

const MOCK_SCHOOL_RECAP: SchoolRecapRow[] = [
  {
    schoolId: "s1",
    schoolName: "SDN Melati 01",
    totalStudents: 240,
    averagePoints: 82,
    fillRatePercent: 91,
  },
  {
    schoolId: "s2",
    schoolName: "TK Ceria Bahagia",
    totalStudents: 90,
    averagePoints: 76,
    fillRatePercent: 88,
  },
  {
    schoolId: "s3",
    schoolName: "SDN Mawar 03",
    totalStudents: 360,
    averagePoints: 79,
    fillRatePercent: 85,
  },
];

export async function mockGetSchoolRecap() {
  await delay();
  return { code: 200, message: "OK (mode dummy)", data: MOCK_SCHOOL_RECAP };
}
