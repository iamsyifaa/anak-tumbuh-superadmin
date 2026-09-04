"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import {
  HiOutlineSquares2X2,
  HiOutlineBuildingLibrary,
  HiOutlineUsers,
  HiOutlineArrowRightOnRectangle,
  HiOutlineShieldCheck,
  HiXMark,
} from "react-icons/hi2";
import { RootState } from "@/redux/store";

// Navigasi utama Super Admin: dashboard, master sekolah, dan akun kepala sekolah.
const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: HiOutlineSquares2X2 },
  { label: "Akun Sekolah", href: "/schools", icon: HiOutlineBuildingLibrary },
  { label: "Akun Kepala Sekolah", href: "/accounts", icon: HiOutlineUsers },
];

interface Props {
  open: boolean;
  onClose: () => void;
  onClickLogout: () => void;
}

function MainSidebar({ open, onClose, onClickLogout }: Props) {
  const pathname = usePathname();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-[#203A5B]/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col bg-[#203A5B] transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
          <span className="flex items-center gap-2 text-base font-black tracking-tight text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
              <HiOutlineShieldCheck className="h-4.5 w-4.5 text-[#D7EFFF]" />
            </span>
            anaktumbuh<span className="text-[#fbbf24]">.id</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup menu"
            className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <HiXMark className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 pt-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#D7EFFF]">
              Workspace
            </p>
            <p className="mt-1 text-sm font-black text-white">Super Admin</p>
            <p className="mt-0.5 truncate text-xs font-semibold text-white/50">
              {user?.name ?? "Super Admin System"}
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-5">
          <p className="px-2 pb-2 text-[10px] font-black uppercase tracking-wider text-white/35">
            Menu Utama
          </p>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition ${
                  active
                    ? "bg-[#355477] text-white shadow-md shadow-black/20 ring-1 ring-white/10"
                    : "text-white/65 hover:bg-[#29496f] hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="leading-tight">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={onClickLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-rose-300 transition hover:bg-rose-500/10 hover:text-rose-200"
          >
            <HiOutlineArrowRightOnRectangle className="h-5 w-5" />
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
}

export default MainSidebar;
