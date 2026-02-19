const SITE_API_BASE_URL = (import.meta.env.VITE_SITE_API_BASE_URL ?? "").trim();

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

function ensureLeadingSlash(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

export function buildSiteApiUrl(path: string): string {
  const normalizedPath = ensureLeadingSlash(path);

  if (!SITE_API_BASE_URL) {
    return normalizedPath;
  }

  return `${stripTrailingSlash(SITE_API_BASE_URL)}${normalizedPath}`;
}
