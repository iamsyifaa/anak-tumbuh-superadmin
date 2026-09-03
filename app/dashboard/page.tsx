import DashboardLayout from "@/layout/DashboardLayout";
import DashboardHero from "@/components/features/dashboard/DashboardHero";
import PlatformSummaryCards from "@/components/features/dashboard/PlatformSummaryCards";
import QuickActionsPanel from "@/components/features/dashboard/QuickActionsPanel";
import SchoolBarChart from "@/components/features/dashboard/SchoolBarChart";
import SchoolFillRateList from "@/components/features/dashboard/SchoolFillRateList";

const DashboardPage = () => {
  return (
    <DashboardLayout pageName="Dashboard">
      <div className="space-y-6">
        <DashboardHero />

        <PlatformSummaryCards />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,1fr)]">
          <div className="space-y-6">
            <SchoolBarChart />
            <SchoolFillRateList />
          </div>
          <QuickActionsPanel />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
