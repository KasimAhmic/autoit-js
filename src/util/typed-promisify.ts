import { promisify } from 'node:util';

/**
 * Node's promisify function, but with better type safety for functions with more than 5 arguments.
 *
 * @param fn The function to promisify.
 *
 * @returns A function that returns a promise.
 */
export function typedPromisify<TArguments extends unknown[], TResult>(
  fn: (...args: [...TArguments, (err: Error | null, result?: TResult) => void]) => void,
): (...args: TArguments) => Promise<TResult> {
  return promisify(fn) as (...args: TArguments) => Promise<TResult>;
}
