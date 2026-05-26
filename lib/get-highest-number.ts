export function getHighestNumber(value: string): number | null {
  const numbers = value.match(/\d+/g);

  if (!numbers || numbers.length === 0) return null;

  return Math.max(...numbers.map(Number));
}



export function getLowestNumber(value: string): number | null {
  const numbers = value.match(/\d+/g)

  if (!numbers || numbers.length === 0) return null

  return Math.min(...numbers.map(Number))
}