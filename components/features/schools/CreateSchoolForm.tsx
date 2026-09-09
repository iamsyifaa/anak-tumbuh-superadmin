"use client";

import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { clearSchoolMessage, storeSchool } from "@/redux/features/school/schoolSlice";
import { getAccountList } from "@/redux/features/account/accountSlice";
import { EducationLevel } from "@/lib/types/schoolType";
import TextInput from "@/components/ui/Input/TextInput";
import MainSelect from "@/components/ui/Select/MainSelect";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import ErrorAlert from "@/components/ui/Alert/ErrorAlert";

interface Props {
  onSuccess: () => void;
}

// Requirement doc bagian 2: cuma Super Admin yang bisa bikin sekolah baru.
function CreateSchoolForm({ onSuccess }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, code, message, error } = useSelector((state: RootState) => state.school);
  const { accounts } = useSelector((state: RootState) => state.account);
  const [name, setName] = useState("");
  const [level, setLevel] = useState<EducationLevel>("SD");
  const [address, setAddress] = useState("");
  const [headmasterAccountId, setHeadmasterAccountId] = useState("");

  // Kalau ada pesan error yang ketinggalan dari percobaan simpan
  // sebelumnya, bersihkan begitu form ini dibuka.
  useEffect(() => {
    dispatch(clearSchoolMessage());
  }, [dispatch]);

  // Ditampilkan kalau request gagal total (network/exception) ATAU kalau
  // backend menolak datanya (fulfilled tapi code bukan 201, mis. validasi).
  const errorMessage = error || (message && code !== 201 ? message : null);

  useEffect(() => {
    dispatch(getAccountList({ search: "", page: 1, limit: 100 }));
  }, [dispatch]);

  // Cuma akun Kepala Sekolah yang belum ditugaskan ke sekolah manapun yang
  // boleh dipilih di sini.
  const availableHeadmasters = useMemo(
    () => accounts.filter((account) => !account.schoolId),
    [accounts]
  );

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(clearSchoolMessage());
    const formData = new FormData();
    formData.append("name", name);
    formData.append("level", level);
    formData.append("address", address);
    if (headmasterAccountId) {
      formData.append("headmaster_account_id", headmasterAccountId);
    }

    const result = await dispatch(storeSchool(formData));
    if (storeSchool.fulfilled.match(result) && result.payload.code === 201) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <ErrorAlert message={errorMessage} onClose={() => dispatch(clearSchoolMessage())} />
      )}
      <TextInput
        id="school-name"
        name="name"
        label="Nama Sekolah"
        placeholder="Masukkan nama sekolah"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <MainSelect
        id="school-level"
        name="level"
        label="Jenjang"
        value={level}
        onChange={(event) => setLevel(event.target.value as EducationLevel)}
        options={[
          { label: "SD", value: "SD" },
          { label: "TK", value: "TK" },
        ]}
      />
      <MainSelect
        id="school-headmaster"
        name="headmaster_account_id"
        label="Kepala Sekolah (opsional)"
        value={headmasterAccountId}
        onChange={(event) => setHeadmasterAccountId(event.target.value)}
        options={[
          {
            label:
              availableHeadmasters.length === 0
                ? "Belum ada akun Kepsek yang tersedia"
                : "Pilih kepala sekolah",
            value: "",
          },
          ...availableHeadmasters.map((account) => ({
            label: account.name,
            value: account.id,
          })),
        ]}
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
