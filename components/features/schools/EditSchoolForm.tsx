"use client";

import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { clearSchoolMessage, updateSchool } from "@/redux/features/school/schoolSlice";
import { getAccountList } from "@/redux/features/account/accountSlice";
import { EducationLevel, School } from "@/lib/types/schoolType";
import TextInput from "@/components/ui/Input/TextInput";
import MainSelect from "@/components/ui/Select/MainSelect";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import ErrorAlert from "@/components/ui/Alert/ErrorAlert";

interface Props {
  school: School;
  onSuccess: () => void;
}

function EditSchoolForm({ school, onSuccess }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, code, message, error } = useSelector((state: RootState) => state.school);
  const { accounts } = useSelector((state: RootState) => state.account);
  const [name, setName] = useState(school.name);
  const [level, setLevel] = useState<EducationLevel>(school.level);
  const [address, setAddress] = useState(school.address ?? "");
  const [headmasterAccountId, setHeadmasterAccountId] = useState(
    school.headmasterAccountId ?? ""
  );

  useEffect(() => {
    dispatch(getAccountList({ search: "", page: 1, limit: 100 }));
    dispatch(clearSchoolMessage());
  }, [dispatch]);

  // Ditampilkan kalau request gagal total (network/exception) ATAU kalau
  // backend menolak datanya (fulfilled tapi code bukan 200, mis. validasi).
  const errorMessage = error || (message && code !== 200 ? message : null);

  // Yang boleh dipilih: akun yang belum ditugaskan ke sekolah manapun,
  // ditambah akun kepsek yang sudah menjabat di sekolah ini (biar tetap
  // muncul dan tidak hilang dari pilihan saat form dibuka).
  const availableHeadmasters = useMemo(
    () =>
      accounts.filter(
        (account) => !account.schoolId || account.schoolId === school.id
      ),
    [accounts, school.id]
  );

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(clearSchoolMessage());
    const formData = new FormData();
    formData.append("name", name);
    formData.append("level", level);
    formData.append("address", address);
    formData.append("headmaster_account_id", headmasterAccountId);

    const result = await dispatch(updateSchool({ id: school.id, formData }));
    if (updateSchool.fulfilled.match(result) && result.payload.code === 200) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <ErrorAlert message={errorMessage} onClose={() => dispatch(clearSchoolMessage())} />
      )}
      <TextInput id="edit-school-name" name="name" label="Nama Sekolah" value={name} onChange={(e) => setName(e.target.value)} />
      <MainSelect
        id="edit-school-level"
        name="level"
        label="Jenjang"
        value={level}
        onChange={(e) => setLevel(e.target.value as EducationLevel)}
        options={[
          { label: "SD", value: "SD" },
          { label: "TK", value: "TK" },
        ]}
      />
      <MainSelect
        id="edit-school-headmaster"
        name="headmaster_account_id"
        label="Kepala Sekolah (opsional)"
        value={headmasterAccountId}
        onChange={(e) => setHeadmasterAccountId(e.target.value)}
        options={[
          { label: "Tidak ada kepala sekolah", value: "" },
          ...availableHeadmasters.map((account) => ({
            label: account.name,
            value: account.id,
          })),
        ]}
      />
      <TextInput
        id="edit-school-address"
        name="address"
        label="Alamat (opsional)"
        value={address}
        required={false}
        onChange={(e) => setAddress(e.target.value)}
      />
      <PrimaryButton type="submit" loading={loading} label="Simpan Perubahan" />
    </form>
  );
}

export default EditSchoolForm;
