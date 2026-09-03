// Requirement doc bagian 2: hanya Super Admin yang bisa bikin sekolah baru.
export type EducationLevel = "TK" | "SD";

export interface School {
  id: string;
  name: string;
  level: EducationLevel;
  address?: string;
  headmasterName?: string;
  totalTeachers: number;
  totalStudents: number;
  createdAt: string;
}

export interface CreateSchoolInput {
  name: string;
  level: EducationLevel;
  address?: string;
}

export type UpdateSchoolInput = Partial<CreateSchoolInput>;
