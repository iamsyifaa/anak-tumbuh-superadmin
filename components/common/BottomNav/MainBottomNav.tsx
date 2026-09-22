"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineSquares2X2,
  HiOutlineBuildingLibrary,
  HiOutlineUsers,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";

// Nav bawah khusus mobile — isinya sama kayak MainSidebar (lihat file itu
// buat nav desktop). Kalau nambah/ubah menu, samain juga di sana.
const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: HiOutlineSquares2X2 },
  { label: "Sekolah", href: "/schools", icon: HiOutlineBuildingLibrary },
  { label: "Kepsek", href: "/accounts", icon: HiOutlineUsers },
];

interface Props {
  onClickLogout: () => void;
}

function MainBottomNav({ onClickLogout }: Props) {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around border-t border-gray-100 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_12px_rgba(0,0,0,0.04)] lg:hidden">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-bold transition ${
              active ? "text-[#203A5B]" : "text-gray-400"
            }`}
          >
            <Icon className="h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
      <button
        type="button"
        onClick={onClickLogout}
        className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-bold text-rose-500"
      >
        <HiOutlineArrowRightOnRectangle className="h-5 w-5" />
        Keluar
      </button>
    </nav>
  );
}

export default MainBottomNav;
