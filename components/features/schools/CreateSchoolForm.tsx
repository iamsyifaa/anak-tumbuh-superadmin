"use client";

import { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { storeSchool } from "@/redux/features/school/schoolSlice";
import { EducationLevel } from "@/lib/types/schoolType";
import TextInput from "@/components/ui/Input/TextInput";
import MainSelect from "@/components/ui/Select/MainSelect";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";

interface Props {
  onSuccess: () => void;
}

// Requirement doc bagian 2: cuma Super Admin yang bisa bikin sekolah baru.
function CreateSchoolForm({ onSuccess }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.school);
  const [name, setName] = useState("");
  const [level, setLevel] = useState<EducationLevel>("SD");
  const [address, setAddress] = useState("");

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("level", level);
    formData.append("address", address);

    const result = await dispatch(storeSchool(formData));
    if (storeSchool.fulfilled.match(result) && result.payload.code === 201) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
