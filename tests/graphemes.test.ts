import { describe, expect, test } from 'bun:test';
import { graphemes } from '../apps/web/src/lib/graphemes';

describe('graphemes for typing text', () => {
  test('keeps flags, skin tones, and joined family emoji together', () => {
    expect(graphemes('🇰🇷👍🏻👨‍👩‍👧')).toEqual(['🇰🇷', '👍🏻', '👨‍👩‍👧']);
  });

  test('keeps variation selectors and keycap emoji together in user text', () => {
    expect(graphemes('앱 ❤️ 1️⃣')).toEqual(['앱', ' ', '❤️', ' ', '1️⃣']);
  });

  test('normalizes decomposed Korean and accented letters', () => {
    expect(graphemes('\u1112\u1161\u11ab' + 'e\u0301')).toEqual(['한', 'é']);
    expect(graphemes('')).toEqual([]);
  });
});
