import DashboardLayout from "@/layout/DashboardLayout";
import AccountDataTable from "@/components/features/accounts/AccountDataTable";

const AccountsPage = () => {
  return (
    <DashboardLayout pageName="Akun Kepala Sekolah">
      <AccountDataTable />
    </DashboardLayout>
  );
};

export default AccountsPage;
