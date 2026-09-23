interface Props {
  onClick: () => void;
}

function TableDeleteButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-sm font-semibold text-rose-600 hover:underline"
    >
      Hapus
    </button>
  );
}

export default TableDeleteButton;
