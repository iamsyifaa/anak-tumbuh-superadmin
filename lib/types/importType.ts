// Requirement doc bagian 7: alur Upload -> Validasi Strict -> Preview ->
// Generate Akun. Super Admin punya cakupan import paling luas (Sekolah,
// Headmaster, Teacher, Student).
export type ImportTarget = "school" | "headmaster" | "teacher" | "student";

export interface ImportResult {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  errors: { row: number; message: string }[];
}
