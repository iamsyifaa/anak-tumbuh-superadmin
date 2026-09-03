"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getAccountList } from "@/redux/features/account/accountSlice";
import { Account } from "@/lib/types/accountType";
import { useDebounce } from "@/hook/useDebounce";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import StatusBadge from "@/components/ui/Badge/StatusBadge";
import CreateModal from "@/components/ui/Modal/CreateModal";
import EditModal from "@/components/ui/Modal/EditModal";
import SuccessModal from "@/components/ui/Modal/SuccessModal";
import CreateAccountForm from "./CreateAccountForm";
import EditAccountForm from "./EditAccountForm";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

function AccountDataTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { accounts, loading } = useSelector(
    (state: RootState) => state.account,
  );
  const headmasterAccounts = accounts.filter(
    (account) => account.role === "headmaster",
  );
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
        <button
          type="button"
          onClick={() => setEditingAccount(row)}
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
            placeholder="Cari nama/username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border-2 border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#203A5B]"
          />
          <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
        <PrimaryButton
          label="Tambah Akun"
          fullWidth={false}
          onClick={() => setModal("create")}
        />
      </div>

      <DataTable
        columns={columns}
        data={headmasterAccounts}
        progressPending={loading}
        pagination
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
    </div>
  );
}

export default AccountDataTable;
