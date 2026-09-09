// Requirement doc bagian 2: hanya Super Admin yang bisa bikin sekolah baru.
export type EducationLevel = "TK" | "SD";

export interface School {
  id: string;
  name: string;
  level: EducationLevel;
  address?: string;
  headmasterName?: string;
  // id akun Kepala Sekolah yang ditugaskan ke sekolah ini (kalau sudah ada).
  headmasterAccountId?: string;
  totalTeachers: number;
  totalStudents: number;
  createdAt: string;
}

export interface CreateSchoolInput {
  name: string;
  level: EducationLevel;
  address?: string;
  // Opsional: id akun Kepala Sekolah yang belum ditugaskan ke sekolah manapun.
  headmasterAccountId?: string;
}

export type UpdateSchoolInput = Partial<CreateSchoolInput>;
