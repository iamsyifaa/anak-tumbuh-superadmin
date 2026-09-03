"use client";

interface Props {
  title?: string;
  description: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

// Dipakai buat konfirmasi tindakan yang gak bisa dibatalkan (bukan cuma
// hapus data) — dipisah dari CreateModal/EditModal karena tujuannya beda:
// minta konfirmasi, bukan nampilin form.
function DeleteModal({ title = "Yakin?", description, loading, onClose, onConfirm }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
        <h3 className="text-lg font-bold text-[#203A5B]">{title}</h3>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Ya, lanjutkan"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
