"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  clearAccountMessage,
  storeAccount,
} from "@/redux/features/account/accountSlice";
import { getSchoolList } from "@/redux/features/school/schoolSlice";
import { Gender } from "@/lib/types/accountType";
import TextInput from "@/components/ui/Input/TextInput";
import MainSelect from "@/components/ui/Select/MainSelect";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import ErrorAlert from "@/components/ui/Alert/ErrorAlert";

interface Props {
  onSuccess: () => void;
}

// POST /headmasters: sekolah WAJIB dipilih saat akun dibuat. Username login =
// NIP, dan password awal juga NIP (diatur backend). Membuat kepala sekolah
// baru di sekolah yang sudah punya kepala sekolah aktif menonaktifkan yang lama.
function CreateAccountForm({ onSuccess }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.account);
  const { schools } = useSelector((state: RootState) => state.school);
  const [name, setName] = useState("");
  const [nip, setNip] = useState("");
  const [gender, setGender] = useState<Gender>("laki-laki");
  const [schoolId, setSchoolId] = useState("");

  // Bersihkan pesan error sisa percobaan sebelumnya saat form dibuka, dan
  // muat daftar sekolah untuk pilihan.
  useEffect(() => {
    dispatch(clearAccountMessage());
    dispatch(getSchoolList({ search: "", page: 1, perPage: 100 }));
  }, [dispatch]);

  const selectedSchool = schools.find((school) => school.id === schoolId);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!schoolId) return;
    const result = await dispatch(
      storeAccount({ name, nip, gender, schoolId }),
    );
    if (storeAccount.fulfilled.match(result)) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <ErrorAlert
          message={error}
          onClose={() => dispatch(clearAccountMessage())}
        />
      )}
      <TextInput
        id="account-name"
        name="name"
        label="Nama Lengkap"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextInput
        id="account-nip"
        name="nip"
        label="NIP/ID"
        value={nip}
        onChange={(e) => setNip(e.target.value)}
        hint="NIP/ID ini jadi username login, dan password awalnya juga NIP/ID yang sama."
      />
      <MainSelect
        id="account-gender"
        name="gender"
        label="Jenis Kelamin"
        value={gender}
        onChange={(e) => setGender(e.target.value as Gender)}
        options={[
          { label: "Laki-laki", value: "laki-laki" },
          { label: "Perempuan", value: "perempuan" },
        ]}
      />
      <MainSelect
        id="account-school"
        name="school_id"
        label="Sekolah"
        value={schoolId}
        onChange={(e) => setSchoolId(e.target.value)}
        options={[
          {
            label: schools.length === 0 ? "Belum ada sekolah" : "Pilih sekolah",
            value: "",
          },
          ...schools.map((school) => ({
            label: school.name,
            value: school.id,
          })),
        ]}
      />
      {selectedSchool?.headmasterName && (
        <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
          Sekolah ini sudah punya kepala sekolah aktif (
          {selectedSchool.headmasterName}). Akun baru akan menggantikannya dan
          akun lama dinonaktifkan.
        </p>
      )}
      <PrimaryButton
        type="submit"
        loading={loading}
        disabled={!schoolId}
        label="Simpan Akun"
      />
    </form>
  );
}

export default CreateAccountForm;
