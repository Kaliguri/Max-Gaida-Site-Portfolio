/**
 * Repeating asymmetric column span for a bento mosaic of equal-weight items
 * (soft skills, education skills). On a 3-column grid every run of four tiles as
 * wide / narrow / narrow / wide, which fills two rows with no gaps while still
 * looking irregular. Narrower than `lg` the grid is uniform, so this only kicks
 * in at `lg` where there's room for the wide cells.
 */
export function bentoSpan(index: number): string {
  const slot = index % 4;
  return slot === 0 || slot === 3 ? "lg:col-span-2" : "";
}
