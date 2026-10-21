import type { UserRole } from "@/lib/types/authType";

// Mapper istilah & field antara frontend lama dan backend Laravel.
//   nis -> nisn | class_group -> rombel | education_level -> grade_level
//   uuid dibuang (backend memakai id angka) | status tahun ajaran -> is_active

export type Rec = Record<string, unknown>;

export const asRec = (value: unknown): Rec =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as Rec)
    : {};

// Ambil nilai pertama yang ada dari beberapa kemungkinan nama field.
export const pick = (source: unknown, ...keys: string[]): unknown => {
  const rec = asRec(source);
  for (const key of keys) {
    const value = rec[key];
    if (value !== undefined && value !== null) return value;
  }
  return undefined;
};

export const toStr = (value: unknown, fallback = ""): string =>
  value === undefined || value === null ? fallback : String(value);

export const toNum = (value: unknown, fallback = 0): number => {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
};

// Backend kadang membungkus list: [..] atau { items | data | ... : [..] }.
export const toList = (value: unknown, ...wrapperKeys: string[]): Rec[] => {
  if (Array.isArray(value)) return value.map(asRec);
  const rec = asRec(value);
  for (const key of [...wrapperKeys, "items", "data", "results"]) {
    if (Array.isArray(rec[key])) return (rec[key] as unknown[]).map(asRec);
  }
  return [];
};

const LEGACY_FIELDS: Record<string, string> = {
  nis: "nisn",
  class_group: "rombel",
  classGroup: "rombel",
  class_group_id: "rombel_id",
  classGroupId: "rombel_id",
  education_level: "grade_level",
  educationLevel: "grade_level",
};

// Ganti nama field lama ke istilah backend dan buang `uuid`.
export const renameLegacyFields = (value: unknown): Rec => {
  const result: Rec = {};
  Object.entries(asRec(value)).forEach(([key, val]) => {
    if (key === "uuid") return;
    result[LEGACY_FIELDS[key] ?? key] = val;
  });
  return result;
};

// "5" -> 5, "V" -> 5, "Kelas 5B" -> 5. Mengembalikan undefined bila tak terbaca.
export const parseGradeLevel = (value: unknown): number | undefined => {
  if (typeof value === "number") return value;
  const text = toStr(value).trim().toUpperCase();
  const digits = text.match(/\d+/);
  if (digits) return Number(digits[0]);
  const roman: Record<string, number> = {
    I: 1,
    II: 2,
    III: 3,
    IV: 4,
    V: 5,
    VI: 6,
  };
  const token = text.match(/\b(VI|IV|V|III|II|I)\b/);
  return token ? roman[token[1]] : undefined;
};

export const normalizeRole = (value: unknown): UserRole => {
  const role = toStr(value).toLowerCase().replace(/[\s-]/g, "_");
  if (["super_admin", "superadmin", "admin"].includes(role))
    return "super_admin";
  if (["headmaster", "kepala_sekolah", "kepsek"].includes(role))
    return "headmaster";
  if (["teacher", "guru", "wali_kelas"].includes(role)) return "teacher";
  return "student";
};

// "2026-08-26", "2026-08-26 10:00:00", atau timestamp ISO -> kunci tanggal lokal.
export const toDateKey = (...values: unknown[]): string => {
  for (const value of values) {
    if (typeof value !== "string" || !value) continue;
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    }
  }
  return "";
};

// Untuk kolom bertipe DATE ("entry_date"): ambil 10 karakter pertama apa adanya,
// tanpa konversi zona waktu (kolom DATE tidak punya jam).
export const toDateOnly = (...values: unknown[]): string => {
  for (const value of values) {
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value))
      return value.slice(0, 10);
  }
  return "";
};
