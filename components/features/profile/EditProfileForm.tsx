"use client";

import { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { updateProfile } from "@/redux/features/auth/authSlice";
import TextInput from "@/components/ui/Input/TextInput";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";

function EditProfileForm({ onSuccess }: { onSuccess: () => void }) {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [name, setName] = useState(user?.name ?? "");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (password) formData.append("password", password);

    const result = await dispatch(updateProfile(formData));
    if (updateProfile.fulfilled.match(result)) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput id="profile-name" name="name" label="Nama Lengkap" value={name} onChange={(e) => setName(e.target.value)} />
      <TextInput
        id="profile-password"
        name="password"
        label="Password Baru (opsional)"
        type="text"
        required={false}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <PrimaryButton type="submit" loading={loading} label="Simpan Perubahan" />
    </form>
  );
}

export default EditProfileForm;
