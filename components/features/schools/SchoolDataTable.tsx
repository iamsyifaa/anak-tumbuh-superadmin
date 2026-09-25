"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getSchoolList, deleteSchool } from "@/redux/features/school/schoolSlice";
import { School } from "@/lib/types/schoolType";
import { useDebounce } from "@/hook/useDebounce";
import MainCard from "@/components/ui/Card/MainCard";
import CreateModal from "@/components/ui/Modal/CreateModal";
import EditModal from "@/components/ui/Modal/EditModal";
import SuccessModal from "@/components/ui/Modal/SuccessModal";
import DeleteModal from "@/components/ui/Modal/DeleteModal";
import TableToolbar from "@/components/common/DataTable/TableToolbar";
import TableEditButton from "@/components/common/DataTable/TableEditButton";
import TableDeleteButton from "@/components/common/DataTable/TableDeleteButton";
import CreateSchoolForm from "./CreateSchoolForm";
import EditSchoolForm from "./EditSchoolForm";

function SchoolDataTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { schools, loading } = useSelector((state: RootState) => state.school);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [modal, setModal] = useState<"create" | "success" | null>(null);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [deletingSchool, setDeletingSchool] = useState<School | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    dispatch(getSchoolList({ search: debouncedSearch, page: 1, limit: 10 }));
  }, [dispatch, debouncedSearch]);

  const refresh = () =>
    dispatch(getSchoolList({ search: debouncedSearch, page: 1, limit: 10 }));

  const handleConfirmDelete = async () => {
    if (!deletingSchool) return;
    setDeleting(true);
    const result = await dispatch(deleteSchool(deletingSchool.id));
    setDeleting(false);
    if (deleteSchool.fulfilled.match(result)) {
      setDeletingSchool(null);
      refresh();
    }
  };

  const columns = [
    { name: "Nama Sekolah", selector: (row: School) => row.name, sortable: true },
    { name: "Jenjang", selector: (row: School) => row.level },
    { name: "Kepala Sekolah", selector: (row: School) => row.headmasterName ?? "-" },
    {
      name: "Aksi",
      cell: (row: School) => (
        <div className="flex items-center gap-1">
          <TableEditButton onClick={() => setEditingSchool(row)} />
          <TableDeleteButton onClick={() => setDeletingSchool(row)} />
        </div>
      ),
    },
  ];

  return (
    <MainCard>
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari nama sekolah..."
        actionLabel="Tambah Sekolah"
        onAction={() => setModal("create")}
      />

      <DataTable columns={columns} data={schools} progressPending={loading} pagination />

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
        <SuccessModal description="Sekolah berhasil disimpan." onClose={() => setModal(null)} />
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

      {deletingSchool && (
        <DeleteModal
          title="Hapus sekolah ini?"
          description={`Sekolah "${deletingSchool.name}" akan dihapus permanen dan gak bisa dibatalkan.`}
          loading={deleting}
          onClose={() => setDeletingSchool(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </MainCard>
  );
}

export default SchoolDataTable;
