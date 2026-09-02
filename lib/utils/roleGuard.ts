import { UserRole } from "@/lib/types/authType";

// App ini khusus Super Admin (per prinsip "1 dashboard = 1 aplikasi").
// Backend bisa saja meloloskan login untuk role lain (Headmaster/Teacher/
// Student pakai endpoint yang sama), jadi role tetap dicek ulang di sini
// sebelum mengizinkan masuk ke dashboard.
export function isSuperAdmin(role: UserRole): boolean {
  return role === "super_admin";
}
