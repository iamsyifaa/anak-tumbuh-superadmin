import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/redux/provider";

export const metadata: Metadata = {
  title: "anaktumbuh.id | Super Admin",
  description: "Login administrasi Super Admin — anaktumbuh.id",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
