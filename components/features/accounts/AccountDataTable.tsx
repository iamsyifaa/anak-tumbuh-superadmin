"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getAccountList } from "@/redux/features/account/accountSlice";
import { Account } from "@/lib/types/accountType";
import { useDebounce } from "@/hook/useDebounce";
import MainCard from "@/components/ui/Card/MainCard";
import StatusBadge from "@/components/ui/Badge/StatusBadge";
import CreateModal from "@/components/ui/Modal/CreateModal";
import EditModal from "@/components/ui/Modal/EditModal";
import SuccessModal from "@/components/ui/Modal/SuccessModal";
import TableToolbar from "@/components/common/DataTable/TableToolbar";
import TableEditButton from "@/components/common/DataTable/TableEditButton";
import CreateAccountForm from "./CreateAccountForm";
import EditAccountForm from "./EditAccountForm";

function AccountDataTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { accounts, loading } = useSelector((state: RootState) => state.account);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [modal, setModal] = useState<"create" | "success" | null>(null);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);

  useEffect(() => {
    dispatch(getAccountList({ search: debouncedSearch, page: 1, limit: 10 }));
  }, [dispatch, debouncedSearch]);

  const refresh = () =>
    dispatch(getAccountList({ search: debouncedSearch, page: 1, limit: 10 }));

  const columns = [
    { name: "Nama", selector: (row: Account) => row.name, sortable: true },
    { name: "Username", selector: (row: Account) => row.username },
    {
      name: "Peran",
      cell: () => <StatusBadge label="Kepala Sekolah" tone="headmaster" />,
    },
    { name: "Sekolah", selector: (row: Account) => row.schoolName },
    {
      name: "Aksi",
      cell: (row: Account) => (
        <TableEditButton onClick={() => setEditingAccount(row)} />
      ),
    },
  ];

  return (
    <MainCard>
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari nama/username..."
        actionLabel="Tambah Akun"
        onAction={() => setModal("create")}
      />

      <DataTable columns={columns} data={accounts} progressPending={loading} pagination />

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
        <SuccessModal description="Akun berhasil disimpan." onClose={() => setModal(null)} />
      )}

      {editingAccount && (
        <EditModal title="Edit Akun" onClose={() => setEditingAccount(null)}>
          <EditAccountForm
            account={editingAccount}
            onSuccess={() => {
              setEditingAccount(null);
              refresh();
            }}
          />
        </EditModal>
      )}
    </MainCard>
  );
}

export default AccountDataTable;
