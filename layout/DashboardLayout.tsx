"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { isSuperAdmin } from "@/lib/utils/roleGuard";
import MainNavbar from "@/components/common/Navbar/MainNavbar";
import MainSidebar from "@/components/common/Sidebar/MainSidebar";
import MainBreadcrumb from "@/components/common/Breadcrumb/MainBreadcrumb";
import LogoutModal from "@/components/ui/Modal/LogoutModal";
import SpinLoader from "@/components/ui/Loader/SpinLoader";

interface Props {
  children: React.ReactNode;
  pageName: string;
}

// Membungkus semua halaman setelah login (dashboard, schools, accounts,
// dst). Mengecek sesi + role di sini sekali, jadi tiap halaman gak perlu
// ngulang logic guard-nya sendiri-sendiri.
function DashboardLayout({ children, pageName }: Props) {
  const router = useRouter();
  const { user, accessToken } = useSelector((state: RootState) => state.auth);
  const [openLogout, setOpenLogout] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!accessToken || !user || !isSuperAdmin(user.role)) {
      router.replace("/");
    }
  }, [accessToken, user, router]);

  if (!accessToken || !user || !isSuperAdmin(user.role)) {
    return <SpinLoader label="Memeriksa sesi..." />;
  }

  return (
    <>
      <MainNavbar pageName={pageName} onOpenSidebar={() => setSidebarOpen(true)} />
      <MainSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onClickLogout={() => setOpenLogout(true)}
      />
      <MainBreadcrumb pageName={pageName} />
      <div className="lg:pl-64">
        <div className="px-4 pb-10 pt-4 md:px-8 lg:px-10">{children}</div>
      </div>
      {openLogout && <LogoutModal onClose={() => setOpenLogout(false)} />}
    </>
  );
}

export default DashboardLayout;
