// Requirement doc bagian 2: Super Admin kelola akun Headmaster (1 per
// sekolah) dan Teacher (1 per rombel) lintas semua sekolah secara terpusat.
export type AccountRole = "headmaster" | "teacher";

export interface Account {
  id: string;
  name: string;
  username: string;
  email?: string;
  role: AccountRole;
  schoolId: string;
  schoolName: string;
  classGroupName?: string; // hanya relevan untuk role teacher
}

export interface CreateAccountInput {
  name: string;
  username: string;
  email?: string;
  role: AccountRole;
  schoolId: string;
}

export type UpdateAccountInput = Partial<CreateAccountInput>;
