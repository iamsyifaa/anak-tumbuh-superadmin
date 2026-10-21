// Requirement doc bagian 2: Super Admin kelola akun Headmaster (1 aktif per
// sekolah) secara terpusat. Akun Teacher dikelola oleh Headmaster di level
// sekolah masing-masing, jadi di luar cakupan Super Admin.
export type AccountRole = "headmaster";
export type Gender = "laki-laki" | "perempuan";
export type AccountStatus = "active" | "inactive";

export interface Account {
  id: string;
  name: string;
  // Username login = NIP (aturan backend).
  username: string;
  nip?: string;
  gender?: Gender;
  status?: AccountStatus;
  role: AccountRole;
  schoolId?: string;
  schoolName?: string;
}

// POST /headmasters: sekolah WAJIB dipilih saat akun dibuat. Membuat kepala
// sekolah baru di sekolah yang sudah punya kepala sekolah aktif akan
// menonaktifkan yang lama (suksesi).
export interface CreateAccountInput {
  name: string;
  nip: string;
  gender: Gender;
  schoolId: string;
}
