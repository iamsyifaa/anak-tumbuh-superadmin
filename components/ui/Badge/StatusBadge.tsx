const STYLES: Record<string, string> = {
  headmaster: "bg-[#D7EFFF] text-[#203A5B]",
  teacher: "bg-emerald-50 text-emerald-700",
  active: "bg-emerald-50 text-emerald-700",
  inactive: "bg-slate-100 text-slate-500",
};

interface Props {
  label: string;
  tone?: keyof typeof STYLES;
}

function StatusBadge({ label, tone = "active" }: Props) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-extrabold ${STYLES[tone] ?? STYLES.active}`}>
      {label}
    </span>
  );
}

export default StatusBadge;
