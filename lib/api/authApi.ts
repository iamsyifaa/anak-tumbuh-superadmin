import { envConfig } from "@/lib/config/envConfig";
import { ApiError, apiRequest } from "@/lib/api/client";
import {
  asRec,
  normalizeRole,
  pick,
  renameLegacyFields,
  toStr,
} from "@/lib/api/mappers";
import type {
  AuthenticatedUser,
  AuthResult,
  PasswordLoginPayload,
} from "@/lib/types/authType";
import { mockLogin } from "./mockData";

const mapLoginUser = (raw: unknown): AuthenticatedUser => {
  const rec = asRec(raw);
  return {
    id: toStr(rec.id),
    name: toStr(rec.name),
    role: normalizeRole(rec.role),
  };
};

// GET /auth/me: data tambahan di luar id, role, name.
export const fetchCurrentUserApi = async (
  token?: string,
): Promise<AuthenticatedUser> => {
  const { data } = await apiRequest<unknown>("/auth/me", { token });
  const root = asRec(data);
  const me = renameLegacyFields(root.user ?? root);
  const school = asRec(me.school);
  return {
    id: toStr(me.id),
    name: toStr(me.name),
    role: normalizeRole(me.role),
    username: toStr(me.username) || undefined,
    schoolId: toStr(pick(me, "school_id") ?? school.id) || undefined,
    // Foto dari backend berupa URL terproteksi; tidak dipakai langsung di <img>.
    avatarUrl: undefined,
  };
};

// Requirement doc bagian 8: Super Admin (bersama Headmaster & Teacher)
// login memakai username + password (Laravel Sanctum) lewat
// POST /auth/login/staff. Tidak ada login QR di app ini — QR hanya untuk Student.
export const loginWithPasswordApi = async ({
  username,
  password,
}: PasswordLoginPayload): Promise<AuthResult> => {
  if (envConfig.useMockApi) {
    const result = await mockLogin(username, password);
    if (result.code !== 200)
      throw new ApiError(result.code, "UNAUTHENTICATED", result.message);
    return { accessToken: result.access_token, user: result.data };
  }

  const { data } = await apiRequest<unknown>("/auth/login/staff", {
    method: "POST",
    body: { username, password },
    // 401 di endpoint login = kredensial salah, bukan sesi habis.
    redirectOn401: false,
  });
  const rec = asRec(data);
  const accessToken = toStr(rec.access_token);
  if (!accessToken)
    throw new ApiError(
      500,
      "INVALID_RESPONSE",
      "Respons login tidak berisi token.",
    );

  const loginUser = mapLoginUser(rec.user);
  // Data tambahan dari /auth/me. Kalau gagal, login tetap lanjut dengan
  // data dasar dari respons login.
  try {
    const me = await fetchCurrentUserApi(accessToken);
    return {
      accessToken,
      user: { ...me, ...loginUser, name: loginUser.name || me.name },
    };
  } catch {
    return { accessToken, user: loginUser };
  }
};
