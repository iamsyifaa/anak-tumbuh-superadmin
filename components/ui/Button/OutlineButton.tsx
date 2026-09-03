interface Props {
  label: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

function OutlineButton({ label, type = "button", disabled, onClick }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-2xl border-2 border-[#D7EFFF] bg-white py-3 text-sm font-black text-[#203A5B] transition hover:-translate-y-0.5 hover:bg-[#D7EFFF]/40 disabled:opacity-50 disabled:hover:translate-y-0 sm:py-3.5"
    >
      {label}
    </button>
  );
}

export default OutlineButton;
