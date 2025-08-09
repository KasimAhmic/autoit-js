import { typedPromisify } from './';

describe('typedPromisify @quick', () => {
  it('promisifies a synchronous function', async () => {
    const syncFunction = (a: number, b: number, cb: (err: Error | null, val: unknown) => void): void =>
      cb(null, a + b);
    const asyncFunction = typedPromisify(syncFunction);

    const result = await asyncFunction(2, 3);
    expect(result).toBe(5);
  });
});
