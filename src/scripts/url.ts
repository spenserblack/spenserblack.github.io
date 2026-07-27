/**
 * Gets the location, but only in the client.
 * @returns The window's URL.
 */
export const getLocationUrl: () => URL | null = () => (import.meta.env.SSR ? null : new URL(window.location.href));
