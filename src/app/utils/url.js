export function getPathFromPathname(pathname) {
  const path = pathname.replace(/\/catalog(\/?)/, '');
  return path;
}
