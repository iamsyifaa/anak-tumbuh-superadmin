// Username akun Kepala Sekolah nggak diketik manual sama Super Admin —
// digenerate otomatis dari nama, biar konsisten. Kalau nanti ada 2 kepsek
// dengan nama yang bikin username sama persis, backend yang perlu nambahin
// suffix angka (mis. budi.santoso2) supaya tetap unik.
export function generateUsername(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // buang diakritik (é -> e, dst)
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .join(".");
}
