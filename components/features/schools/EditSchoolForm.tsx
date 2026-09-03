"use client";

import { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { updateSchool } from "@/redux/features/school/schoolSlice";
import { EducationLevel, School } from "@/lib/types/schoolType";
import TextInput from "@/components/ui/Input/TextInput";
import MainSelect from "@/components/ui/Select/MainSelect";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";

interface Props {
  school: School;
  onSuccess: () => void;
}

function EditSchoolForm({ school, onSuccess }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.school);
  const [name, setName] = useState(school.name);
  const [level, setLevel] = useState<EducationLevel>(school.level);
  const [address, setAddress] = useState(school.address ?? "");

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("level", level);
    formData.append("address", address);

    const result = await dispatch(updateSchool({ id: school.id, formData }));
    if (updateSchool.fulfilled.match(result)) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
