import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";

interface Props {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  actionLabel: string;
  onAction: () => void;
}

function TableToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  actionLabel,
  onAction,
}: Props) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full rounded-xl border-2 border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#203A5B]"
        />
        <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
      <PrimaryButton label={actionLabel} fullWidth={false} onClick={onAction} />
    </div>
  );
}

export default TableToolbar;
