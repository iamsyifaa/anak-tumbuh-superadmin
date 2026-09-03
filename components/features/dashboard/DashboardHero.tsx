"use client";

import { useState } from "react";
import { HiOutlineArrowPath, HiOutlineShieldCheck } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  getPlatformSummary,
  getSchoolRecap,
} from "@/redux/features/report/reportSlice";
import { format, startOfMonth } from "date-fns";

function DashboardHero() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.report);
  const [syncing, setSyncing] = useState(false);

  const handleSync = async () => {
    setSyncing(true);
    const endDate = format(new Date(), "yyyy-MM-dd");
    const startDate = format(startOfMonth(new Date()), "yyyy-MM-dd");
    await Promise.all([
      dispatch(getPlatformSummary()),
      dispatch(getSchoolRecap({ startDate, endDate })),
    ]);
    setSyncing(false);
  };

  return (
    <section className="relative isolate overflow-hidden rounded-4xl bg-[#203A5B] p-6 text-white shadow-xl shadow-[#203A5B]/20 sm:p-8">
      <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#203A5B]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-[#fbbf24]/15 blur-3xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#D7EFFF]">
            <HiOutlineShieldCheck className="h-3.5 w-3.5" />
            Administrasi Global
          </span>
          <h1 className="mt-4 text-2xl font-black sm:text-3xl">
            Selamat datang, {user?.name ?? "Super Admin"}!
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#D7EFFF]">
            Pusat kendali lintas sekolah untuk data sekolah dan akun kepala
            sekolah.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSync}
          disabled={syncing || loading}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-xs font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <HiOutlineArrowPath
            className={`h-4 w-4 ${syncing || loading ? "animate-spin" : ""}`}
          />
          Sinkronkan Data
        </button>
      </div>
    </section>
  );
}

export default DashboardHero;
