"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { AuthenticatedUser } from "@/lib/types/authType";
import { isSuperAdmin } from "@/lib/utils/roleGuard";

interface RedirectResult {
  allowed: boolean;
}

// Karena app ini khusus Super Admin, login yang berhasil tapi rolenya bukan
// super_admin TIDAK disimpan token-nya dan TIDAK diarahkan ke dashboard —
// cukup dikembalikan allowed: false supaya form bisa menampilkan pesan error.
export function useRedirectAfterLogin() {
  const router = useRouter();

  return useCallback(
    (accessToken: string, user: AuthenticatedUser): RedirectResult => {
      if (!isSuperAdmin(user.role)) {
        return { allowed: false };
      }

      localStorage.setItem("access_token", accessToken);
      router.push("/dashboard");
      return { allowed: true };
    },
    [router]
  );
}
