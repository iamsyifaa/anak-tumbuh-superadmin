interface Props {
  message: string;
  onClose?: () => void;
}

function ErrorAlert({ message, onClose }: Props) {
  return (
    <div
      role="alert"
      className="mt-3 flex items-start justify-between gap-2 rounded-xl border border-red-100 bg-red-50 p-2.5 text-[11px] font-semibold text-red-700 sm:mt-5 sm:gap-3 sm:rounded-2xl sm:p-3 sm:text-sm"
    >
      <span>{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup pesan error"
          className="rounded-lg px-2 font-black text-red-500 transition hover:bg-red-100 hover:text-red-700"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default ErrorAlert;
