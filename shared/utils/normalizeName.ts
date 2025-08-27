export function normalizeName(name: string): string {
  return name.trim().split(/\s+/).join(' ');
}
