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
      className="w-full rounded-2xl border-2 border-[#A4C1FD] bg-white py-3 text-sm font-black text-[#232852] transition hover:bg-[#EEF5FF] disabled:opacity-50 sm:py-3.5"
    >
      {label}
    </button>
  );
}

export default OutlineButton;
