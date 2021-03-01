import * as PIXI from 'pixi.js';
import {
  trimByKinsokuShorui,
  shouldBreakByKinsokuShorui,
} from './KinsokuShori';
import {
  trimToBreakable,
  canBreakInLastChar,
  sumTextWidthByCache,
} from './BreakableChars';

// @ts-ignore
PIXI.TextMetrics.wordWrap = function (
  text: string,
  { wordWrapWidth, letterSpacing }: PIXI.TextStyle,
  canvasTarget?: HTMLCanvasElement,
): string {
  const canvas = canvasTarget || this._canvas;
  const context = canvas.getContext('2d');
  const maxWidth = wordWrapWidth + letterSpacing;

  let lines: string[] = [];
  let currentIndex = 0;
  let currentWidth = 0;

  const cache: { [key in string]: number } = {};
  const calcWidth = (char: string): number => {
    return this.getFromCache(char, letterSpacing, cache, context);
  };

  Array.from(text).forEach((char, i) => {
    const prevChar = text[i - 1];
    const nextChar = text[i + 1];
    const width = calcWidth(char);

    if (this.isNewline(char)) {
      currentIndex++;
      currentWidth = 0;
      lines[currentIndex] = '';
      return;
    }

    if (currentWidth > 0 && currentWidth + width > maxWidth) {
      currentIndex++;
      currentWidth = 0;
      lines[currentIndex] = '';

      if (this.isBreakingSpace(char)) {
        return;
      }

      if (!canBreakInLastChar(char)) {
        lines = trimToBreakable(lines);
        currentWidth = sumTextWidthByCache(lines[currentIndex] || '', cache);
      }

      if (shouldBreakByKinsokuShorui(char, nextChar)) {
        lines = trimByKinsokuShorui(lines);
        currentWidth += calcWidth(prevChar || '');
      }
    }

    currentWidth += width;
    lines[currentIndex] = (lines[currentIndex] || '') + char;
  });
  return lines.join('\n');
};
