export function decimalToHex(decimal: number): string {
  return decimal.toString(16).toUpperCase().padStart(6, '0');
}

export function hexToDecimal(hex: string | number): number {
  return typeof hex === 'number' ? hex : parseInt(hex, 16);
}
