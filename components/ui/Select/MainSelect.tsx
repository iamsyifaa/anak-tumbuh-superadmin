interface Option {
  label: string;
  value: string;
}

interface Props {
  id: string;
  name: string;
  label: string;
  value: string;
  options: Option[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function MainSelect({ id, name, label, value, options, onChange }: Props) {
  return (
    <div>
      <label htmlFor={id} className="block text-[10px] font-black uppercase tracking-wider text-[#203A5B] sm:text-xs">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1.5 w-full rounded-xl border-2 border-slate-200 bg-white py-3 px-3.5 text-sm font-semibold text-[#203A5B] outline-none transition-all focus:border-[#203A5B] focus:ring-4 focus:ring-[#203A5B]/20 sm:mt-2 sm:rounded-2xl sm:py-4 sm:px-4"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MainSelect;
