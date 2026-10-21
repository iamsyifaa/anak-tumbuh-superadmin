"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  clearSchoolMessage,
  storeSchool,
} from "@/redux/features/school/schoolSlice";
import TextInput from "@/components/ui/Input/TextInput";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import ErrorAlert from "@/components/ui/Alert/ErrorAlert";

interface Props {
  onSuccess: () => void;
}

// Requirement doc bagian 2: cuma Super Admin yang bisa bikin sekolah baru.
// Backend (POST /schools) hanya menyimpan nama (unik) dan alamat. Kepala
// sekolah ditugaskan lewat halaman Akun Kepala Sekolah (POST /headmasters).
function CreateSchoolForm({ onSuccess }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.school);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  // Kalau ada pesan error yang ketinggalan dari percobaan simpan
  // sebelumnya, bersihkan begitu form ini dibuka.
  useEffect(() => {
    dispatch(clearSchoolMessage());
  }, [dispatch]);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(clearSchoolMessage());
    const result = await dispatch(storeSchool({ name, address }));
    if (storeSchool.fulfilled.match(result)) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <ErrorAlert
          message={error}
          onClose={() => dispatch(clearSchoolMessage())}
        />
      )}
      <TextInput
        id="school-name"
        name="name"
        label="Nama Sekolah"
        placeholder="Masukkan nama sekolah"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <TextInput
        id="school-address"
        name="address"
        label="Alamat (opsional)"
        placeholder="Masukkan alamat sekolah"
        value={address}
        required={false}
        onChange={(event) => setAddress(event.target.value)}
      />
      <PrimaryButton type="submit" loading={loading} label="Simpan Sekolah" />
    </form>
  );
}

export default CreateSchoolForm;
