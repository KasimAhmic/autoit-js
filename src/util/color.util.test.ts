import { decimalToHex, hexToDecimal } from './color.util';

describe('color.util', () => {
  it('converts decimal to hex', () => {
    expect(decimalToHex(16711680)).toBe('FF0000');
  });

  it('converts string hex to decimal', () => {
    expect(hexToDecimal('FF0000')).toBe(16711680);
  });

  it('converts numeric hex to decimal', () => {
    expect(hexToDecimal(0xff0000)).toBe(16711680);
  });
});
