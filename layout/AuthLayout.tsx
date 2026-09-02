import AuthBackdrop from "@/components/ui/Background/AuthBackdrop";

interface Props {
  children: React.ReactNode;
}

// Shared wrapper for auth-related pages (currently just Super Admin login;
// any future auth page — e.g. "lupa password" — reuses this instead of
// re-declaring the same gradient background + centering).
function AuthLayout({ children }: Props) {
  return (
    <div className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#A4C1FD] via-white to-[#EEF5FF] px-2.5 py-6 sm:px-6 sm:py-24">
      <AuthBackdrop />
      {children}
    </div>
  );
}

export default AuthLayout;
