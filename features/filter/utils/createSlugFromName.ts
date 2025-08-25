export function createSlugFromName(name: string): string {
  return ('' + name).toLowerCase().replace(/\s+/g, '_');
}
