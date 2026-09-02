// Role resmi mengikuti Dokumen Requirement ANAKTUMBUH v2 bagian 2. App ini
// (anak-tumbuh-superadmin) hanya mengizinkan role "super_admin" masuk —
// role lain tetap didefinisikan karena backend-nya sama untuk semua app,
// tapi akan ditolak oleh useRedirectAfterLogin di bawah.
export type UserRole = "super_admin" | "headmaster" | "teacher" | "student";

export interface AuthenticatedUser {
  id: string;
  name: string;
  username: string;
  role: UserRole;
  schoolId?: string;
  avatarUrl?: string;
}

export interface PasswordLoginPayload {
  username: string;
  password: string;
}

export interface AuthApiResponse {
  code: number;
  status: string;
  message: string;
  data: AuthenticatedUser;
  access_token: string;
}
