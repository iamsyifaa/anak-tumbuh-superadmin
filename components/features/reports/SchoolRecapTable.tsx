"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { format, startOfMonth } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getSchoolRecap } from "@/redux/features/report/reportSlice";
import { SchoolRecapRow } from "@/lib/types/reportType";
import TextInput from "@/components/ui/Input/TextInput";

// Report Center: rekap lintas sekolah, cuma bisa diakses Super Admin
// (Headmaster/Teacher rekapnya cuma sebatas sekolah/rombel masing-masing).
function SchoolRecapTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { schoolRecap, loading } = useSelector((state: RootState) => state.report);
  const [startDate, setStartDate] = useState(format(startOfMonth(new Date()), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));

  useEffect(() => {
    dispatch(getSchoolRecap({ startDate, endDate }));
  }, [dispatch, startDate, endDate]);

  const columns = [
    { name: "Sekolah", selector: (row: SchoolRecapRow) => row.schoolName, sortable: true },
    { name: "Total Siswa", selector: (row: SchoolRecapRow) => row.totalStudents },
    { name: "Rata-rata Poin", selector: (row: SchoolRecapRow) => row.averagePoints, sortable: true },
    { name: "Tingkat Pengisian", selector: (row: SchoolRecapRow) => `${row.fillRatePercent}%` },
  ];

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#D7EFFF]">
      <div className="mb-4 flex flex-wrap gap-3">
        <TextInput id="recap-start" name="start_date" label="Dari Tanggal" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <TextInput id="recap-end" name="end_date" label="Sampai Tanggal" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <DataTable columns={columns} data={schoolRecap} progressPending={loading} pagination />
    </div>
  );
}

export default SchoolRecapTable;
