interface Props {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  required?: boolean;
  type?: "text" | "email" | "date";
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Input generik buat form-form dashboard (sekolah, akun, dst) — beda dari
// TextField yang khusus dipakai di halaman login (ikonnya fixed "User").
function TextInput({ id, name, label, placeholder, value, required = true, type = "text", onChange }: Props) {
  return (
    <div>
      <label htmlFor={id} className="block text-[10px] font-black uppercase tracking-wider text-[#203A5B] sm:text-xs">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className="mt-1.5 w-full rounded-xl border-2 border-slate-200 bg-white py-3 px-3.5 text-sm font-semibold text-[#203A5B] outline-none transition-all placeholder:text-slate-400 focus:border-[#203A5B] focus:ring-4 focus:ring-[#203A5B]/20 sm:mt-2 sm:rounded-2xl sm:py-4 sm:px-4"
      />
    </div>
  );
}

export default TextInput;
