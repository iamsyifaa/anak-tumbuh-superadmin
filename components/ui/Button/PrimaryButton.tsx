interface Props {
  label: string;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}

function PrimaryButton({ label, type = "button", disabled, loading, fullWidth = true, onClick }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group rounded-2xl border-b-4 border-[#12253b] bg-[#203A5B] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#203A5B]/40 transition-all hover:scale-[1.02] hover:bg-[#162d47] active:scale-95 active:translate-y-1 active:border-b-0 active:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:py-4 sm:text-base ${fullWidth ? "w-full" : ""}`}
    >
      {loading ? (
        <span className="inline-flex items-center justify-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Memverifikasi...
        </span>
      ) : (
        label
      )}
    </button>
  );
}

export default PrimaryButton;
