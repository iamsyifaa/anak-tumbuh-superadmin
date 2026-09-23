"use client";

import { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { updateAccount } from "@/redux/features/account/accountSlice";
import { Account } from "@/lib/types/accountType";
import TextInput from "@/components/ui/Input/TextInput";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";

interface Props {
  account: Account;
  onSuccess: () => void;
}

function EditAccountForm({ account, onSuccess }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.account);
  const [name, setName] = useState(account.name);
  const [nip, setNip] = useState(account.nip ?? "");

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("nip", nip);

    const result = await dispatch(updateAccount({ id: account.id, formData }));
    if (updateAccount.fulfilled.match(result)) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput id="edit-account-name" name="name" label="Nama Lengkap" value={name} onChange={(e) => setName(e.target.value)} />
      <TextInput
        id="edit-account-nip"
        name="nip"
        label="NIP/ID"
        value={nip}
        onChange={(e) => setNip(e.target.value)}
        hint="NIP/ID ini sekaligus jadi password login kepala sekolah."
      />
      <PrimaryButton type="submit" loading={loading} label="Simpan Perubahan" />
    </form>
  );
}

export default EditAccountForm;
