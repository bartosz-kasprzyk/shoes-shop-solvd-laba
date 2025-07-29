export const makeHeaderTitle = (pathname: string): string => {
  return pathname
    .replace('/', '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
};
