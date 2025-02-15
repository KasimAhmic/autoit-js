/**
 * Allocates a new buffer of the given size plus one for the null terminator.
 *
 * @param characters The size in bytes of the buffer to allocate.
 *
 * @returns A tuple containing the buffer and the total number of characters including the null terminator.
 */
export function createUnicodeBuffer(characters: number): [Buffer, number] {
  const totalCharacters = characters + 1;

  return [Buffer.alloc(totalCharacters * 2), totalCharacters];
}

/**
 * Converts a buffer containing a `UTF-16LE` string to a JavaScript string.
 *
 * @param buffer The buffer containing the `UTF-16LE` string.
 */
export function unicodeBufferToString(buffer: Buffer, trimNullTerminator: boolean = true): string {
  const str = buffer.toString('utf-16le');

  return trimNullTerminator ? str.replaceAll('\0', '') : str;
}
