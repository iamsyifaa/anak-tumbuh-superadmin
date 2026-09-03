"use client";

import { HiOutlineXMark } from "react-icons/hi2";

interface Props {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

function CreateModal({ title, onClose, children }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#203A5B]">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <HiOutlineXMark className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default CreateModal;
