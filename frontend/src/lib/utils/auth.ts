/**
 * Generates return URL parameter for login redirect
 * @param currentPath - Current pathname to return to after login
 * @returns URL parameter string (empty string or ?returnUrl=...)
 */
export const getReturnUrlParam = (currentPath: string): string => {
    const normalizedPath = currentPath.startsWith('/axion')
        ? currentPath.slice('/axion'.length) || '/'
        : currentPath;

    // Don't save default route as return URL
    if (normalizedPath === '/flows/new' || normalizedPath === '/login') {
        return '';
    }

    return `?returnUrl=${encodeURIComponent(normalizedPath)}`;
};

/**
 * Returns a safe return URL for redirect: only allows relative paths (no protocol-relative or absolute URLs).
 * @param returnUrl - Raw return URL from query or state
 * @param fallback - Fallback path when returnUrl is invalid
 */
export const getSafeReturnUrl = (returnUrl: null | string, fallback: string): string => {
    if (!returnUrl || typeof returnUrl !== 'string') {
        return fallback;
    }

    const trimmed = returnUrl.trim();

    // Allow only relative paths: must start with single slash, not //
    if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
        return trimmed.startsWith('/axion/') ? trimmed.slice('/axion'.length) : trimmed;
    }

    return fallback;
};
