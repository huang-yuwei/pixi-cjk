/*!
 * pixi-cjk - v0.2.0
 * Compiled Tue, 23 Feb 2021 13:17:52 UTC
 *
 * pixi-cjk is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('pixi.js')) :
  typeof define === 'function' && define.amd ? define(['pixi.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.PIXI));
}(this, (function (PIXI) { 'use strict';

  if (typeof PIXI === 'undefined') { throw 'PixiJS is required'; }

  // Line breaking rules in CJK (Kinsoku Shori)
  // Refer from https://en.wikipedia.org/wiki/Line_breaking_rules_in_East_Asian_languages
  const regexCannotStartZhCn = /[!%),.:;?\]}¢°·'""†‡›℃∶、。〃〆〕〗〞﹚﹜！＂％＇），．：；？！］｝～]/;
  const regexCannotEndZhCn = /[$(£¥·'"〈《「『【〔〖〝﹙﹛＄（．［｛￡￥]/;
  const regexCannotStartZhTw = /[!),.:;?\]}¢·–—'"•"、。〆〞〕〉》」︰︱︲︳﹐﹑﹒﹓﹔﹕﹖﹘﹚﹜！），．：；？︶︸︺︼︾﹀﹂﹗］｜｝､]/;
  const regexCannotEndZhTw = /[([{£¥'"‵〈《「『〔〝︴﹙﹛（｛︵︷︹︻︽︿﹁﹃﹏]/;
  const regexCannotStartJaJp = /[)\]｝〕〉》」』】〙〗〟'"｠»ヽヾーァィゥェォッャュョヮヵヶぁぃぅぇぉっゃゅょゎゕゖㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇺㇻㇼㇽㇾㇿ々〻‐゠–〜?!‼⁇⁈⁉・、:;,。.]/;
  const regexCannotEndJaJp = /[([｛〔〈《「『【〘〖〝'"｟«—...‥〳〴〵]/;
  const regexCannotStartKoKr = /[!%),.:;?\]}¢°'"†‡℃〆〈《「『〕！％），．：；？］｝]/;
  const regexCannotEndKoKr = /[$([{£¥'"々〇〉》」〔＄（［｛｠￥￦#]/;
  const regexCannotStart = new RegExp(`${regexCannotStartZhCn.source}|${regexCannotStartZhTw.source}|${regexCannotStartJaJp.source}|${regexCannotStartKoKr.source}`);
  const regexCannotEnd = new RegExp(`${regexCannotEndZhCn.source}|${regexCannotEndZhTw.source}|${regexCannotEndJaJp.source}|${regexCannotEndKoKr.source}`);
  const shouldBreakByKinsokuShorui = (char, nextChar) => {
      if (PIXI.TextMetrics.isBreakingSpace(nextChar))
          return false;
      if (char) {
          // Line breaking rules in CJK (Kinsoku Shori)
          if (regexCannotEnd.exec(nextChar) || regexCannotStart.exec(char)) {
              return true;
          }
      }
      return false;
  };
  const trimByKinsokuShorui = (prev) => {
      const next = [...prev];
      const prevLine = next[next.length - 2];
      const lastChar = prevLine[prevLine.length - 1];
      next[next.length - 2] = prevLine.slice(0, -1);
      next[next.length - 1] = (lastChar || '') + next[next.length - 1];
      return next;
  };

  const LATIN_REGEX = /[a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff!"#$%&'()*+,-./:;]/;
  const canBreakInLastChar = (char) => {
      if (char && LATIN_REGEX.test(char))
          return false;
      return true;
  };
  const trimToBreakable = (prev) => {
      const next = [...prev];
      const prevLine = next[next.length - 2];
      const index = findBreakableIndex(prevLine);
      if (index === -1 || !prevLine)
          return next;
      const trimmedChar = prevLine.slice(index, index + 1);
      const isTrimmedWithSpace = PIXI.TextMetrics.isBreakingSpace(trimmedChar);
      const trimFrom = index + 1;
      const trimTo = index + (isTrimmedWithSpace ? 0 : 1);
      next[next.length - 1] += prevLine.slice(trimFrom, prevLine.length);
      next[next.length - 2] = prevLine.slice(0, trimTo);
      return next;
  };
  const sumTextWidthByCache = (text, cache) => {
      return text.split('').reduce((sum, c) => {
          if (!cache[c])
              throw Error('cannot count the word without cache');
          return sum + cache[c];
      }, 0);
  };
  const findBreakableIndex = (line) => {
      for (let i = line.length - 1; i >= 0; i--) {
          if (!LATIN_REGEX.test(line[i]))
              return i;
      }
      return -1;
  };

  // @ts-ignore
  PIXI.TextMetrics.wordWrap = function (text, { wordWrapWidth, letterSpacing }, canvasTarget) {
      const canvas = canvasTarget || PIXI.TextMetrics._canvas;
      const context = canvas.getContext('2d');
      const maxWidth = wordWrapWidth + letterSpacing;
      let lines = [];
      let currentIndex = 0;
      let currentWidth = 0;
      const cache = {};
      const calcWidth = (char) => {
          return this.getFromCache(char, letterSpacing, cache, context);
      };
      for (let i = 0; i < text.length; i++) {
          const char = text[i];
          const prevChar = text[i - 1];
          const nextChar = text[i + 1];
          const width = calcWidth(char);
          if (this.isNewline(char)) {
              currentIndex++;
              currentWidth = 0;
              lines[currentIndex] = '';
              continue;
          }
          if (currentWidth + width > maxWidth) {
              currentIndex++;
              currentWidth = 0;
              lines[currentIndex] = '';
              if (this.isBreakingSpace(char)) {
                  continue;
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
      }
      return lines.join('\n');
  };

})));
//# sourceMappingURL=pixi-cjk.js.map
