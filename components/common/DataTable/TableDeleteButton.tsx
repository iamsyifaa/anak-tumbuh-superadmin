import { HiOutlineTrash } from "react-icons/hi2";

interface Props {
  onClick: () => void;
}

function TableDeleteButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Hapus"
      title="Hapus"
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-rose-600 transition hover:bg-rose-50"
    >
      <HiOutlineTrash className="h-4 w-4" />
    </button>
  );
}

export default TableDeleteButton;
