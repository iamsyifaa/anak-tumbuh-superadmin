import type { Metadata } from "next";
import AuthLayout from "@/layout/AuthLayout";
import SuperAdminLoginCard from "@/components/features/auth/SuperAdminLoginCard";

export const metadata: Metadata = {
  title: "Masuk Super Admin | anaktumbuh.id",
  description: "Login Super Admin menggunakan username & password.",
};

const SuperAdminLoginPage = () => {
  return (
    <AuthLayout>
      <SuperAdminLoginCard />
    </AuthLayout>
  );
};

export default SuperAdminLoginPage;
