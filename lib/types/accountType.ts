// Requirement doc bagian 2: Super Admin kelola akun Headmaster (1 per
// sekolah) secara terpusat. Akun Teacher dikelola oleh Headmaster di level
// sekolah masing-masing, jadi di luar cakupan Super Admin.
export type AccountRole = "headmaster";

export interface Account {
  id: string;
  name: string;
  username: string;
  email?: string;
  role: AccountRole;
  schoolId: string;
  schoolName: string;
}

export interface CreateAccountInput {
  name: string;
  username: string;
  email?: string;
  role: AccountRole;
  schoolId: string;
}

export type UpdateAccountInput = Partial<CreateAccountInput>;
