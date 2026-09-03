"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AvatarProfile from "@/components/ui/Avatar/AvatarProfile";
import { HiChevronLeft, HiOutlineSquares2X2 } from "react-icons/hi2";

interface Props {
  pageName: string;
}

function MainNavbar({ pageName }: Props) {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between border-b border-gray-100 bg-white px-4 transition-none lg:pl-60 lg:pr-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Menu utama"
          className="rounded-xl border border-gray-100 p-2 text-gray-400 hover:bg-gray-50 hover:text-[#203A5B]"
        >
          <HiChevronLeft className="h-5 w-5" />
        </button>

        <div>
          <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">
            anaktumbuh.id
          </p>
          <p className="text-base font-black text-[#203A5B]">{pageName}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-bold text-[#203A5B]">
            {user?.name ?? "Super Admin"}
          </p>
          <p className="text-xs text-gray-400">{user?.username ?? "admin"}</p>
        </div>
        <AvatarProfile name={user?.name ?? "A"} avatarUrl={user?.avatarUrl} />
        <Link
          href="/dashboard"
          aria-label="Ke Dashboard"
          className="hidden h-9 w-9 items-center justify-center rounded-xl border border-gray-100 text-gray-400 transition hover:bg-gray-50 hover:text-[#203A5B] sm:flex"
        >
          <HiOutlineSquares2X2 className="h-5 w-5" />
        </Link>
      </div>
    </header>
  );
}

export default MainNavbar;
