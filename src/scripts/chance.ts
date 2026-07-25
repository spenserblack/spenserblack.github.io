/**
 * @module chance Helpers for randomness.
 */
import { Random, MersenneTwister19937 } from "random-js";

/**
 * Roughly a 50/50 chance of true or false. `chance` is optional, but should be a number between 0 and 1 if set.
 */
export const coinFlip = (chance?: number): boolean =>
  Math.random() <= (chance ?? 0.5);

const seededRandom = (seed: number | number[]): Random => {
  const engine =
    typeof seed === "number"
      ? MersenneTwister19937.seed(seed)
      : MersenneTwister19937.seedWithArray(seed);
  return new Random(engine);
};

/**
 * Picks a random item from an array.
 */
export const pick = <T>(array: T[], seed?: number | number[]): T =>
  seed == null
    ? array[Math.floor(Math.random() * array.length)]
    : seededRandom(seed).pick(array);

/**
 * Creates function that randomly picks from the same array each time.
 */
export const createPick =
  <T>(array: T[]): ((seed?: number | number[]) => T) =>
  (seed) =>
    pick(array, seed);
