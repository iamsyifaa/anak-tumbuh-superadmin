"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { clearAccessToken } from "@/lib/api/client";
import { resetAuth } from "@/redux/features/auth/authSlice";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";

function LogoutModal({ onClose }: { onClose: () => void }) {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const handleSignout = () => {
    setLoading(true);
    clearAccessToken();
    dispatch(resetAuth());
    // Navigasi penuh supaya seluruh state Redux (daftar sekolah/akun) ikut bersih.
    window.location.replace("/");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
        <h3 className="text-lg font-bold text-[#203A5B]">Keluar dari akun?</h3>
        <p className="mt-2 text-sm text-gray-500">
          Kamu perlu login lagi untuk melanjutkan.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            Batal
          </button>
          <PrimaryButton
            label="Keluar"
            loading={loading}
            onClick={handleSignout}
          />
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
