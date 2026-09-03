"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AvatarProfile from "@/components/ui/Avatar/AvatarProfile";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import EditModal from "@/components/ui/Modal/EditModal";
import EditProfileForm from "./EditProfileForm";

function ProfileFeed() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [editing, setEditing] = useState(false);

  if (!user) return null;

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#D7EFFF]">
      <div className="flex items-center gap-4">
        <AvatarProfile name={user.name} avatarUrl={user.avatarUrl} size={64} />
        <div>
          <h3 className="text-lg font-bold text-[#203A5B]">{user.name}</h3>
          <p className="text-sm text-gray-400">{user.username}</p>
          <p className="text-sm text-gray-400">Super Admin</p>
        </div>
      </div>
      <div className="mt-6">
        <PrimaryButton label="Edit Profil" fullWidth={false} onClick={() => setEditing(true)} />
      </div>

      {editing && (
        <EditModal title="Edit Profil" onClose={() => setEditing(false)}>
          <EditProfileForm onSuccess={() => setEditing(false)} />
        </EditModal>
      )}
    </div>
  );
}

export default ProfileFeed;
