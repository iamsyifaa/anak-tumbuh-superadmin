import { HiOutlinePencilSquare } from "react-icons/hi2";

interface Props {
  onClick: () => void;
}

function TableEditButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Edit"
      title="Edit"
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#203A5B] transition hover:bg-[#203A5B]/10"
    >
      <HiOutlinePencilSquare className="h-4 w-4" />
    </button>
  );
}

export default TableEditButton;
