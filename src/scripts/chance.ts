/**
 * @module chance Helpers for randomness.
 */
import Random from "rand-seed";

/**
 * Roughly a 50/50 chance of true or false. `chance` is optional, but should be a number between 0 and 1 if set.
 */
export const coinFlip = (chance?: number): boolean =>
  Math.random() <= (chance ?? 0.5);

/**
 * Picks a random item from an array.
 */
export const pick = <T>(array: T[], seed?: string): T => {
  const random = new Random(seed);
  return array[Math.floor(random.next() * array.length)];
};

/**
 * Creates function that randomly picks from the same array each time.
 */
export const createPick =
  <T>(array: T[]): ((seed?: string) => T) =>
  (seed) =>
    pick(array, seed);
