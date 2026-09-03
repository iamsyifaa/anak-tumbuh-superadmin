import DashboardLayout from "@/layout/DashboardLayout";
import SchoolDataTable from "@/components/features/schools/SchoolDataTable";

const SchoolsPage = () => {
  return (
    <DashboardLayout pageName="Akun Sekolah">
      <SchoolDataTable />
    </DashboardLayout>
  );
};

export default SchoolsPage;
