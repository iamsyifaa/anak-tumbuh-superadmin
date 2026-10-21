// Requirement doc bagian 2: hanya Super Admin yang bisa bikin sekolah baru.
// Backend (POST /schools) hanya menyimpan nama & alamat; jenjang (TK/SD) dan
// penugasan kepala sekolah tidak ada di backend.
export type EducationLevel = "TK" | "SD";

export interface School {
  id: string;
  name: string;
  // Hanya terisi di mode dummy; backend tidak punya field jenjang.
  level?: EducationLevel;
  address?: string;
  // Kepala sekolah AKTIF sekolah ini (digabung dari GET /headmasters).
  headmasterName?: string;
  headmasterAccountId?: string;
  totalTeachers: number;
  totalStudents: number;
  createdAt: string;
}

export interface CreateSchoolInput {
  name: string;
  address?: string;
}
