import type { IconType } from "react-icons";

interface Props {
  label: string;
  value: number | string;
  icon: IconType;
  loading?: boolean;
}

function StatCard({ label, value, icon: Icon, loading }: Props) {
  return (
    <div className="group rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#D7EFFF] transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#203A5B]/10">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D7EFFF] text-[#203A5B] transition group-hover:scale-105">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-1 font-heading text-2xl font-extrabold text-[#203A5B] sm:text-3xl">
        {loading ? "—" : value}
      </p>
    </div>
  );
}

export default StatCard;
