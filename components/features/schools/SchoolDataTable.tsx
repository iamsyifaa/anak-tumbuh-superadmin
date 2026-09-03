"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getSchoolList } from "@/redux/features/school/schoolSlice";
import { School } from "@/lib/types/schoolType";
import { useDebounce } from "@/hook/useDebounce";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import CreateModal from "@/components/ui/Modal/CreateModal";
import EditModal from "@/components/ui/Modal/EditModal";
import SuccessModal from "@/components/ui/Modal/SuccessModal";
import CreateSchoolForm from "./CreateSchoolForm";
import EditSchoolForm from "./EditSchoolForm";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

function SchoolDataTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { schools, loading } = useSelector((state: RootState) => state.school);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [modal, setModal] = useState<"create" | "success" | null>(null);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);

  useEffect(() => {
    dispatch(getSchoolList({ search: debouncedSearch, page: 1, limit: 10 }));
  }, [dispatch, debouncedSearch]);

  const refresh = () =>
    dispatch(getSchoolList({ search: debouncedSearch, page: 1, limit: 10 }));

  const columns = [
    {
      name: "Nama Sekolah",
      selector: (row: School) => row.name,
      sortable: true,
    },
    { name: "Jenjang", selector: (row: School) => row.level },
    {
      name: "Kepala Sekolah",
      selector: (row: School) => row.headmasterName ?? "-",
    },
    {
      name: "Aksi",
      cell: (row: School) => (
        <button
          type="button"
          onClick={() => setEditingSchool(row)}
          className="text-sm font-semibold text-[#203A5B] hover:underline"
        >
          Edit
        </button>
      ),
    },
  ];

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#D7EFFF]">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Cari nama sekolah..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border-2 border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#203A5B]"
          />
          <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
        <PrimaryButton
          label="Tambah Sekolah"
          fullWidth={false}
          onClick={() => setModal("create")}
        />
      </div>

      <DataTable
        columns={columns}
        data={schools}
        progressPending={loading}
        pagination
      />

      {modal === "create" && (
        <CreateModal title="Tambah Sekolah Baru" onClose={() => setModal(null)}>
          <CreateSchoolForm
            onSuccess={() => {
              setModal("success");
              refresh();
            }}
          />
        </CreateModal>
      )}

      {modal === "success" && (
        <SuccessModal
          description="Sekolah berhasil disimpan."
          onClose={() => setModal(null)}
        />
      )}

      {editingSchool && (
        <EditModal title="Edit Sekolah" onClose={() => setEditingSchool(null)}>
          <EditSchoolForm
            school={editingSchool}
            onSuccess={() => {
              setEditingSchool(null);
              refresh();
            }}
          />
        </EditModal>
      )}
    </div>
  );
}

export default SchoolDataTable;
