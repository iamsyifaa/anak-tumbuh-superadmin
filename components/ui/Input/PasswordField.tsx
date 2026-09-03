import { HiOutlineLockClosed } from "react-icons/hi2";

interface Props {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  autoComplete?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function PasswordField({ id, name, label, placeholder, value, autoComplete, onChange }: Props) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] font-black uppercase tracking-wider text-[#203A5B] sm:text-xs"
      >
        {label}
      </label>
      <div className="relative mt-1.5 sm:mt-2">
        <input
          id={id}
          name={name}
          type="password"
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={onChange}
          required
          className="w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-3.5 pr-11 text-sm font-semibold text-[#203A5B] outline-none transition-all placeholder:text-slate-400 focus:border-[#203A5B] focus:ring-4 focus:ring-[#203A5B]/20 sm:rounded-2xl sm:py-4 sm:pl-4 sm:pr-12"
        />
        <HiOutlineLockClosed
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300 sm:right-4 sm:h-5 sm:w-5"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default PasswordField;
