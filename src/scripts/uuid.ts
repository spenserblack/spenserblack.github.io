/**
 * @module uuid UUID helpers.
 */
import { v5 as uuidV5Impl } from "uuid";

const namespace = uuidV5Impl("https://www.spenser.black/", uuidV5Impl.URL);

/**
 *
 * @param value The value to use for generating a UUID v5.
 * @param raw Set to `true` to return a `Uint8Array` rather than a `string`.
 */
export function uuidV5(value: string, raw?: false): string;
export function uuidV5(value: string, raw: true): Uint8Array;
export function uuidV5(value: string, raw?: boolean): string | Uint8Array {
  if (raw) {
    const buffer = new Uint8Array(16);
    return uuidV5Impl(value, namespace, buffer);
  }
  return uuidV5Impl(value, namespace);
}
