import { decimalToHex, hexToDecimal } from './color.util';

describe('color.util', () => {
  it.todo('converts decimal to hex', () => {
    expect(decimalToHex(16711680)).toBe('FF0000');
  });

  it.todo('converts string hex to decimal', () => {
    expect(hexToDecimal('FF0000')).toBe('16711680');
  });

  it.todo('converts numeric hex to decimal', () => {
    expect(hexToDecimal(0xff0000)).toBe('16711680');
  });
});
