"use client";

import { HiOutlineCheckCircle } from "react-icons/hi2";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";

interface Props {
  title?: string;
  description: string;
  onClose: () => void;
}

function SuccessModal({ title = "Berhasil", description, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
        <HiOutlineCheckCircle className="mx-auto h-12 w-12 text-emerald-500" />
        <h3 className="mt-3 text-lg font-bold text-[#203A5B]">{title}</h3>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
        <div className="mt-6">
          <PrimaryButton label="OK" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
