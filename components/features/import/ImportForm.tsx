"use client";

import { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { importData } from "@/redux/features/import/importSlice";
import { ImportTarget } from "@/lib/types/importType";
import MainSelect from "@/components/ui/Select/MainSelect";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";

// Requirement doc bagian 7: Upload -> Validasi Strict -> Preview -> Generate
// Akun. Backend yang menjalankan validasi + preview; form ini menangani
// upload + konfirmasi, lalu menampilkan hasil apa adanya dari backend.
function ImportForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, result, error } = useSelector((state: RootState) => state.import);
  const [target, setTarget] = useState<ImportTarget>("school");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("target", target);
    formData.append("file", file);

    await dispatch(importData(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <MainSelect
        id="import-target"
        name="target"
        label="Jenis Data"
        value={target}
        onChange={(e) => setTarget(e.target.value as ImportTarget)}
        options={[
          { label: "Sekolah", value: "school" },
          { label: "Headmaster", value: "headmaster" },
          { label: "Teacher", value: "teacher" },
          { label: "Student", value: "student" },
        ]}
      />

      <div>
        <label htmlFor="import-file" className="block text-[10px] font-black uppercase tracking-wider text-[#203A5B] sm:text-xs">
          File Excel
        </label>
        <input
          id="import-file"
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="mt-1.5 block w-full text-sm text-gray-600 file:mr-3 file:rounded-xl file:border-0 file:bg-[#D7EFFF]/20 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[#203A5B] sm:mt-2"
          required
        />
      </div>

      {error && <p className="text-sm text-rose-600">{error}</p>}

      {result && (
        <div className="rounded-xl bg-gray-50 p-3 text-sm text-gray-600">
          {result.validRows} dari {result.totalRows} baris berhasil diimport.
          {result.invalidRows > 0 && <span className="text-rose-600"> {result.invalidRows} baris ditolak.</span>}
        </div>
      )}

      <PrimaryButton type="submit" loading={loading} label="Upload & Import" disabled={!file} />
    </form>
  );
}

export default ImportForm;
