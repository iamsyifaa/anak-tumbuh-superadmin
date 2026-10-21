"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getAccountList } from "@/redux/features/account/accountSlice";
import { Account } from "@/lib/types/accountType";
import { useDebounce } from "@/hook/useDebounce";
import MainCard from "@/components/ui/Card/MainCard";
import CreateModal from "@/components/ui/Modal/CreateModal";
import SuccessModal from "@/components/ui/Modal/SuccessModal";
import TableToolbar from "@/components/common/DataTable/TableToolbar";
import CreateAccountForm from "./CreateAccountForm";

function AccountDataTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { accounts, loading, totalData } = useSelector(
    (state: RootState) => state.account,
  );
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [modal, setModal] = useState<"create" | "success" | null>(null);

  useEffect(() => {
    dispatch(getAccountList({ search: debouncedSearch, page, perPage }));
  }, [dispatch, debouncedSearch, page, perPage]);

  const refresh = () =>
    dispatch(getAccountList({ search: debouncedSearch, page, perPage }));

  const columns = [
    {
      name: "Nama Lengkap",
      selector: (row: Account) => row.name,
      sortable: true,
    },
    {
      name: "NIP/ID",
      cell: (row: Account) =>
        row.nip ?? <span className="italic text-slate-400">-</span>,
    },
    {
      name: "Sekolah",
      cell: (row: Account) =>
        row.schoolName ?? <span className="italic text-slate-400">-</span>,
    },
    {
      name: "Status",
      cell: (row: Account) =>
        row.status === "inactive" ? (
          <span className="text-slate-400">Nonaktif</span>
        ) : (
          <span className="font-semibold text-emerald-600">Aktif</span>
        ),
    },
  ];

  return (
    <MainCard>
      <TableToolbar
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        searchPlaceholder="Cari nama/NIP..."
        actionLabel="Tambah Akun"
        onAction={() => setModal("create")}
      />

      <DataTable
        columns={columns}
        data={accounts}
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
        <CreateModal title="Tambah Akun Baru" onClose={() => setModal(null)}>
          <CreateAccountForm
            onSuccess={() => {
              setModal("success");
              refresh();
            }}
          />
        </CreateModal>
      )}

      {modal === "success" && (
        <SuccessModal
          description="Akun berhasil disimpan."
          onClose={() => setModal(null)}
        />
      )}
    </MainCard>
  );
}

export default AccountDataTable;
