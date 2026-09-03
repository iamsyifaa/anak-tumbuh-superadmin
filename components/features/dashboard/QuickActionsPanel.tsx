import Link from "next/link";
import {
  HiOutlineBuildingLibrary,
  HiOutlineUsers,
  HiArrowRight,
} from "react-icons/hi2";

const QUICK_ACTIONS = [
  {
    label: "Kelola Sekolah",
    desc: "Tambah & kelola data sekolah",
    icon: HiOutlineBuildingLibrary,
    href: "/schools",
  },
  {
    label: "Kelola Akun",
    desc: "Akun Kepala Sekolah",
    icon: HiOutlineUsers,
    href: "/accounts",
  },
];

function QuickActionsPanel() {
  return (
    <section className="rounded-3xl bg-[#203A5B] p-5 text-white shadow-lg shadow-[#203A5B]/15 sm:p-6">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#D7EFFF]">
        Administrasi Cepat
      </p>
      <h2 className="mt-1 text-lg font-black">Pilih yang ingin dikelola</h2>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {QUICK_ACTIONS.map(({ label, desc, icon: Icon, href }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-2xl border border-white/10 bg-white/10 p-3 transition duration-200 hover:-translate-y-0.5 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#D7EFFF]/50"
          >
            <span className="flex items-center gap-2">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#D7EFFF]/25 text-[#D7EFFF]">
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-black">{label}</span>
                <span className="mt-0.5 block truncate text-[10px] text-[#D7EFFF]">
                  {desc}
                </span>
              </span>
              <HiArrowRight className="ml-auto h-4 w-4 shrink-0 transition group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default QuickActionsPanel;
