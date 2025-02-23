import { createUnicodeBuffer, unicodeBufferToString } from './buffer.util';

describe('bnuffer.util @full @quick', () => {
  it('should create a unicode buffer', () => {
    const [buffer, totalCharacters] = createUnicodeBuffer(5);

    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBe(12);
    expect(totalCharacters).toBe(6);
  });

  it('should convert a unicode buffer to a string', () => {
    const [buffer] = createUnicodeBuffer(5);

    buffer.write('Hello', 0, 'utf-16le');

    const str = unicodeBufferToString(buffer);

    expect(str).toBe('Hello');
  });

  it('should not trim the trailing null terminator characters', () => {
    const [buffer] = createUnicodeBuffer(5);

    buffer.write('Hello', 0, 'utf-16le');

    const str = unicodeBufferToString(buffer, false);

    expect(str).toBe('Hello\0');
  });
});
