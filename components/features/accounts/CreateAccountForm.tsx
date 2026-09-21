"use client";

import { SyntheticEvent, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { storeAccount } from "@/redux/features/account/accountSlice";
import { AccountRole } from "@/lib/types/accountType";
import { generateUsername } from "@/lib/utils/generateUsername";
import TextInput from "@/components/ui/Input/TextInput";
import MainSelect from "@/components/ui/Select/MainSelect";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";

interface Props {
  onSuccess: () => void;
}

// Akun Kepala Sekolah dibuat dulu di sini tanpa terikat sekolah ("belum
// ditugaskan"). Penugasan ke sekolah dilakukan lewat form Tambah/Edit
// Sekolah di halaman Akun Sekolah.
//
// Username nggak diketik manual — digenerate otomatis dari Nama Lengkap
// (lihat lib/utils/generateUsername.ts). Password wajib diisi pakai NIP,
// biar kepsek bisa login pakai username hasil generate + NIP-nya sendiri.
function CreateAccountForm({ onSuccess }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.account);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<AccountRole>("headmaster");

  const username = useMemo(() => generateUsername(name), [name]);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("role", role);

    const result = await dispatch(storeAccount(formData));
    if (storeAccount.fulfilled.match(result) && result.payload.code === 201) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <MainSelect
        id="account-role"
        name="role"
        label="Peran"
        value={role}
        onChange={(e) => setRole(e.target.value as AccountRole)}
        options={[{ label: "Kepala Sekolah", value: "headmaster" }]}
      />
      <TextInput
        id="account-name"
        name="name"
        label="Nama Lengkap"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextInput
        id="account-password"
        name="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        hint="Gunakan NIP kepala sekolah sebagai password. Wajib diisi."
      />
      <PrimaryButton type="submit" loading={loading} label="Simpan Akun" />
    </form>
  );
}

export default CreateAccountForm;
