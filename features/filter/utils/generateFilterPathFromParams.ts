export function generateFilterPathFromParams(
  params: Record<string, string[]>,
): string {
  const segments: string[] = [];

  for (const [key, values] of Object.entries(params)) {
    if (values.length === 0) continue;

    const segment = `${key.toLowerCase()}:${values
      .map((v) => v.replace(/\s+/g, '_'))
      .join('-')}`;

    segments.push(segment);
  }

  return '/' + segments.join('/');
}
