import DashboardLayout from "@/layout/DashboardLayout";
import ImportForm from "@/components/features/import/ImportForm";

const ImportPage = () => {
  return (
    <DashboardLayout pageName="Import Excel">
      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#D7EFFF] sm:max-w-lg">
        <ImportForm />
      </div>
    </DashboardLayout>
  );
};

export default ImportPage;
