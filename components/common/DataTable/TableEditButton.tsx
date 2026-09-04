interface Props {
  onClick: () => void;
}

function TableEditButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-sm font-semibold text-[#203A5B] hover:underline"
    >
      Edit
    </button>
  );
}

export default TableEditButton;
