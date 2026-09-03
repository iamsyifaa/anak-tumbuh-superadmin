"use client";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import MainCard from "@/components/ui/Card/MainCard";

function SchoolFillRateList() {
  const { schoolRecap, loading } = useSelector((state: RootState) => state.report);

  const sorted = useMemo(
    () => [...schoolRecap].sort((a, b) => b.fillRatePercent - a.fillRatePercent),
    [schoolRecap]
  );

  return (
    <MainCard title="Tingkat Pengisian Harian per Sekolah — Bulan Ini">
      {loading && sorted.length === 0 && (
        <p className="text-sm text-gray-400">Memuat data...</p>
      )}

      {!loading && sorted.length === 0 && (
        <p className="text-sm text-gray-400">Belum ada data pengisian.</p>
      )}

      <div className="space-y-3">
        {sorted.map((school) => (
          <div key={school.schoolId}>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#203A5B]">{school.schoolName}</span>
              <span className="font-black text-[#203A5B]">{school.fillRatePercent}%</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#D7EFFF]">
              <div
                className="h-full rounded-full bg-[#203A5B]"
                style={{ width: `${Math.min(100, school.fillRatePercent)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </MainCard>
  );
}

export default SchoolFillRateList;
