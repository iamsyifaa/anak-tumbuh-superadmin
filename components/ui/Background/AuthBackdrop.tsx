function AuthBackdrop() {
  return (
    <>
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#203A5B]/20 blur-3xl animate-pulse sm:h-80 sm:w-80" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#fbbf24]/25 blur-3xl animate-pulse sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 blur-3xl animate-pulse sm:h-72 sm:w-72" />
    </>
  );
}

export default AuthBackdrop;
