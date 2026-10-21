"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getSchoolList } from "@/redux/features/school/schoolSlice";
import { School } from "@/lib/types/schoolType";
import { useDebounce } from "@/hook/useDebounce";
import MainCard from "@/components/ui/Card/MainCard";
import CreateModal from "@/components/ui/Modal/CreateModal";
import SuccessModal from "@/components/ui/Modal/SuccessModal";
import TableToolbar from "@/components/common/DataTable/TableToolbar";
import CreateSchoolForm from "./CreateSchoolForm";

function SchoolDataTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { schools, loading, totalData } = useSelector(
    (state: RootState) => state.school,
  );
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [modal, setModal] = useState<"create" | "success" | null>(null);

  useEffect(() => {
    dispatch(getSchoolList({ search: debouncedSearch, page, perPage }));
  }, [dispatch, debouncedSearch, page, perPage]);

  const refresh = () =>
    dispatch(getSchoolList({ search: debouncedSearch, page, perPage }));

  const columns = [
    {
      name: "Nama Sekolah",
      selector: (row: School) => row.name,
      sortable: true,
    },
    {
      name: "Kepala Sekolah",
      selector: (row: School) => row.headmasterName ?? "-",
    },
    { name: "Guru", selector: (row: School) => row.totalTeachers },
    { name: "Siswa", selector: (row: School) => row.totalStudents },
  ];

  return (
    <MainCard>
      <TableToolbar
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        searchPlaceholder="Cari nama sekolah..."
        actionLabel="Tambah Sekolah"
        onAction={() => setModal("create")}
      />

      <DataTable
        columns={columns}
        data={schools}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalData}
        paginationPerPage={perPage}
        paginationDefaultPage={page}
        onChangePage={setPage}
        onChangeRowsPerPage={(newPerPage, newPage) => {
          setPerPage(newPerPage);
          setPage(newPage);
        }}
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
    </MainCard>
  );
}

export default SchoolDataTable;
