import BrandHeader from "@/components/common/BrandHeader";
import SuperAdminLoginForm from "./SuperAdminLoginForm";

// Tidak seperti app Siswa (yang punya 2 tab: QR & Password), app ini cuma
// punya 1 metode login, jadi tidak perlu tab switcher — langsung form.
function SuperAdminLoginCard() {
  return (
    <div className="relative z-10 w-full max-w-[19rem] rounded-2xl border border-white/80 bg-white p-3.5 shadow-[0_24px_70px_rgba(164,193,253,0.45)] sm:max-w-lg sm:rounded-[2.5rem] sm:p-8 md:p-9">
      <BrandHeader />
      <p className="mx-auto mt-1.5 max-w-[15rem] text-center text-[10px] font-semibold leading-4 text-[#232852]/55 sm:mt-2 sm:max-w-sm sm:text-sm sm:leading-5">
        Gunakan username dan password akun Super Admin untuk melanjutkan.
      </p>

      <SuperAdminLoginForm />
    </div>
  );
}

export default SuperAdminLoginCard;
