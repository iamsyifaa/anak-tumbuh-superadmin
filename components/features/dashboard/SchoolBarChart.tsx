"use client";

import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { format, startOfMonth } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getSchoolRecap } from "@/redux/features/report/reportSlice";
import MainCard from "@/components/ui/Card/MainCard";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function SchoolBarChart() {
  const dispatch = useDispatch<AppDispatch>();
  const { schoolRecap } = useSelector((state: RootState) => state.report);

  useEffect(() => {
    const endDate = format(new Date(), "yyyy-MM-dd");
    const startDate = format(startOfMonth(new Date()), "yyyy-MM-dd");
    dispatch(getSchoolRecap({ startDate, endDate }));
  }, [dispatch]);

  const data = {
    labels: schoolRecap.map((row) => row.schoolName),
    datasets: [
      {
        label: "Rata-rata Poin",
        data: schoolRecap.map((row) => row.averagePoints),
        backgroundColor: "#203A5B",
      },
    ],
  };

  return (
    <MainCard title="Rata-rata Poin per Sekolah — Bulan Ini">
      <Bar data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />
    </MainCard>
  );
}

export default SchoolBarChart;
