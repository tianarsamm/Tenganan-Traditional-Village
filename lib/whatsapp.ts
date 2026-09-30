export function normalizeWaNumber(input: string | number | null | undefined): string {
  if (!input) return "";

  // Buang semua karakter selain angka
  let digits = String(input).replace(/\D/g, "");

  // Kasus "0062..." (format 00 internasional)
  if (digits.startsWith("00")) digits = digits.slice(2);

  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return "62" + digits.slice(1);
  if (digits.startsWith("8")) return "62" + digits;

  return digits;
}

export function buildWaLink(
  number: string | number | null | undefined,
  message?: string
): string {
  const normalized = normalizeWaNumber(number);
  const base = `https://wa.me/${normalized}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}