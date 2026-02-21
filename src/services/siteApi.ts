const SITE_API_BASE_URL = (import.meta.env.VITE_SITE_API_BASE_URL ?? "").trim();
const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL ?? "").trim();

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

function ensureLeadingSlash(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

export function buildSiteApiUrl(path: string): string {
  const normalizedPath = ensureLeadingSlash(path);
  const directPublicSiteBase = SUPABASE_URL
    ? `${stripTrailingSlash(SUPABASE_URL)}/functions/v1/public-site`
    : "";
  const resolvedBase = SITE_API_BASE_URL || directPublicSiteBase;

  if (!resolvedBase) {
    return normalizedPath;
  }

  return `${stripTrailingSlash(resolvedBase)}${normalizedPath}`;
}

export function isUsingDirectPublicSiteFunction(): boolean {
  if (!SITE_API_BASE_URL) {
    return true;
  }

  return SITE_API_BASE_URL.includes("/functions/v1/public-site");
}
