"use client";

import { useEffect } from "react";
import { HiOutlineBuildingLibrary, HiOutlineUserGroup } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getPlatformSummary } from "@/redux/features/report/reportSlice";
import StatCard from "@/components/ui/Card/StatCard";

function PlatformSummaryCards() {
  const dispatch = useDispatch<AppDispatch>();
  const { summary, loading } = useSelector((state: RootState) => state.report);

  useEffect(() => {
    dispatch(getPlatformSummary());
  }, [dispatch]);

  const cards = [
    {
      label: "Total Sekolah",
      value: summary?.totalSchools ?? 0,
      icon: HiOutlineBuildingLibrary,
    },
    {
      label: "Total Kepala Sekolah",
      value: summary?.totalHeadmasters ?? 0,
      icon: HiOutlineUserGroup,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map((card) => (
        <StatCard
          key={card.label}
          label={card.label}
          value={card.value}
          icon={card.icon}
          loading={loading}
        />
      ))}
    </div>
  );
}

export default PlatformSummaryCards;
