"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getAccountList, deleteAccount } from "@/redux/features/account/accountSlice";
import { Account } from "@/lib/types/accountType";
import { useDebounce } from "@/hook/useDebounce";
import MainCard from "@/components/ui/Card/MainCard";
import CreateModal from "@/components/ui/Modal/CreateModal";
import EditModal from "@/components/ui/Modal/EditModal";
import SuccessModal from "@/components/ui/Modal/SuccessModal";
import DeleteModal from "@/components/ui/Modal/DeleteModal";
import TableToolbar from "@/components/common/DataTable/TableToolbar";
import TableEditButton from "@/components/common/DataTable/TableEditButton";
import TableDeleteButton from "@/components/common/DataTable/TableDeleteButton";
import CreateAccountForm from "./CreateAccountForm";
import EditAccountForm from "./EditAccountForm";

function AccountDataTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { accounts, loading } = useSelector((state: RootState) => state.account);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [modal, setModal] = useState<"create" | "success" | null>(null);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [deletingAccount, setDeletingAccount] = useState<Account | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    dispatch(getAccountList({ search: debouncedSearch, page: 1, limit: 10 }));
  }, [dispatch, debouncedSearch]);

  const refresh = () =>
    dispatch(getAccountList({ search: debouncedSearch, page: 1, limit: 10 }));

  const handleConfirmDelete = async () => {
    if (!deletingAccount) return;
    setDeleting(true);
    const result = await dispatch(deleteAccount(deletingAccount.id));
    setDeleting(false);
    if (deleteAccount.fulfilled.match(result)) {
      setDeletingAccount(null);
      refresh();
    }
  };

  const columns = [
    { name: "Nama Lengkap", selector: (row: Account) => row.name, sortable: true },
    {
      name: "NIP/ID",
      cell: (row: Account) =>
        row.nip ?? <span className="italic text-slate-400">-</span>,
    },
    {
      name: "Sekolah",
      cell: (row: Account) =>
        row.schoolName ?? <span className="italic text-slate-400">Belum ditugaskan</span>,
    },
    {
      name: "Aksi",
      cell: (row: Account) => (
        <div className="flex items-center gap-3">
          <TableEditButton onClick={() => setEditingAccount(row)} />
          <TableDeleteButton onClick={() => setDeletingAccount(row)} />
        </div>
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

      {deletingAccount && (
        <DeleteModal
          title="Hapus akun ini?"
          description={`Akun "${deletingAccount.name}" akan dihapus permanen dan gak bisa dibatalkan.`}
          loading={deleting}
          onClose={() => setDeletingAccount(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </MainCard>
  );
}

export default AccountDataTable;
