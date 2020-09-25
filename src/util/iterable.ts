export function range(length: number): number[];
export function range(start: number, end: number): number[];
export function range(startOrLength: number, end?: number): number[] {
  const offset = end === undefined ? 0 : startOrLength;
  const length = end === undefined ? startOrLength : end - startOrLength + 1;
  return Array.from({ length }, (_, i) => i + offset);
}
