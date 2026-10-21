// Role resmi mengikuti Dokumen Requirement ANAKTUMBUH v2 bagian 2. App ini
// (anak-tumbuh-superadmin) hanya mengizinkan role "super_admin" masuk —
// role lain tetap didefinisikan karena backend-nya sama untuk semua app,
// tapi akan ditolak oleh useRedirectAfterLogin di bawah.
export type UserRole = "super_admin" | "headmaster" | "teacher" | "student";

// Login hanya mengembalikan id, role, name. Data tambahan (username, sekolah)
// diisi dari GET /auth/me dan bisa kosong.
export interface AuthenticatedUser {
  id: string;
  name: string;
  role: UserRole;
  username?: string;
  schoolId?: string;
  avatarUrl?: string;
}

export interface PasswordLoginPayload {
  username: string;
  password: string;
}

export interface AuthResult {
  accessToken: string;
  user: AuthenticatedUser;
}

// Bentuk lama ({code, status, ...}). Sekarang hanya dipakai lib/api/mockData.ts
// untuk mode dummy; API asli memakai envelope {data, meta} lewat lib/api/client.ts.
export interface AuthApiResponse {
  code: number;
  status: string;
  message: string;
  data: AuthenticatedUser;
  access_token: string;
}
