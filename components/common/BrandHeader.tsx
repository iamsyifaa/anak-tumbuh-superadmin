interface Props {
  subtitle?: string;
}

// Reused wherever the "anaktumbuh.id" brand mark appears — currently the
// login card, later also the dashboard navbar/splash once those exist.
function BrandHeader({ subtitle = "Masuk sebagai Super Admin" }: Props) {
  return (
    <div className="text-center">
      <h1 className="text-xl font-black tracking-tight text-[#232852] sm:text-3xl">
        anaktumbuh.id
      </h1>
      <p className="mt-1 text-sm font-bold text-[#232852] sm:text-base">{subtitle}</p>
    </div>
  );
}

export default BrandHeader;
