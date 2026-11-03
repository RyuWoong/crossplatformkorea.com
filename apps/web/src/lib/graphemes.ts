const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

export function graphemes(value: string): string[] {
  return Array.from(segmenter.segment(value.normalize('NFC')), ({ segment }) => segment);
}
