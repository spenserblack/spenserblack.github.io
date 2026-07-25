/**
 * @module chance Helpers for randomness.
 */
/**
 * Random number generator for a number in the range `[0, 1)`
 */
export type Rng = () => number;
/**
 * Roughly a 50/50 chance of true or false. `chance` is optional, but should be a number between 0 and 1 if set.
 */
export const coinFlip = (chance?: number): boolean =>
  Math.random() <= (chance ?? 0.5);

/**
 * Picks a random item from an array.
 */
export const pick = <T>(array: T[], rng: Rng): T =>
  array[Math.floor(rng() * array.length)];

/**
 * Creates function that randomly picks from the same array each time.
 */
export const createPick =
  <T>(array: T[]): ((rng: Rng) => T) =>
  (rng: Rng) =>
    pick(array, rng);
