interface Props {
  label: string;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

function PrimaryButton({ label, type = "button", disabled, loading, onClick }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="group w-full rounded-2xl border-b-4 border-[#232852] bg-[#3A72E3] py-3.5 text-sm font-black text-white shadow-lg shadow-[#3A72E3]/40 transition-all hover:scale-[1.02] hover:bg-[#3268D5] active:scale-95 active:translate-y-1 active:border-b-0 active:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:py-4 sm:text-base"
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
