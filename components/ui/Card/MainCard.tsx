interface Props {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

function MainCard({ title, action, children }: Props) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#D7EFFF] sm:p-6">
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between">
          {title && <h3 className="font-heading text-base font-extrabold text-[#203A5B]">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export default MainCard;
