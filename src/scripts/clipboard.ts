/**
 * @module clipboard Clipboard utilities.
 */

/**
 * Writes *text* to the clipboard.
 * @param text The text to write.
 */
export const write = (text: string): Promise<void> =>
  navigator.clipboard.writeText(text);
