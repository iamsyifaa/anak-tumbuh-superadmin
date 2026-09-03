import DashboardLayout from "@/layout/DashboardLayout";
import SchoolRecapTable from "@/components/features/reports/SchoolRecapTable";

const ReportsPage = () => {
  return (
    <DashboardLayout pageName="Report Center">
      <SchoolRecapTable />
    </DashboardLayout>
  );
};

export default ReportsPage;
