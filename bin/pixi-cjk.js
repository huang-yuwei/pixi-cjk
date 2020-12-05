/*!
 * pixi-cjk - v0.1.0
 * Compiled Sat, 05 Dec 2020 08:46:15 UTC
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
  const regexCannotStartZhTw = /[!),.:;?\]}¢·–— '"•" 、。〆〞〕〉》」︰︱︲︳﹐﹑﹒﹓﹔﹕﹖﹘﹚﹜！），．：；？︶︸︺︼︾﹀﹂﹗］｜｝､]/;
  const regexCannotEndZhTw = /[([{£¥'"‵〈《「『〔〝︴﹙﹛（｛︵︷︹︻︽︿﹁﹃﹏]/;
  const regexCannotStartJaJp = /[)\]｝〕〉》」』】〙〗〟'"｠»ヽヾーァィゥェォッャュョヮヵヶぁぃぅぇぉっゃゅょゎゕゖㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇺㇻㇼㇽㇾㇿ々〻‐゠–〜? ! ‼ ⁇ ⁈ ⁉・、:;,。.]/;
  const regexCannotEndJaJp = /[([｛〔〈《「『【〘〖〝'"｟«—...‥〳〴〵]/;
  const regexCannotStartKoKr = /[!%),.:;?\]}¢°'"†‡℃〆〈《「『〕！％），．：；？］｝]/;
  const regexCannotEndKoKr = /[$([{£¥'"々〇〉》」〔＄（［｛｠￥￦ #]/;
  const regexCannotStart = new RegExp(`${regexCannotStartZhCn.source}|${regexCannotStartZhTw.source}|${regexCannotStartJaJp.source}|${regexCannotStartKoKr.source}`);
  const regexCannotEnd = new RegExp(`${regexCannotEndZhCn.source}|${regexCannotEndZhTw.source}|${regexCannotEndJaJp.source}|${regexCannotEndKoKr.source}`);
  const canBreakChars = function canBreakChars(char, nextChar) {
      if (nextChar) {
          // Line breaking rules in CJK (Kinsoku Shori)
          if (regexCannotEnd.exec(char) || regexCannotStart.exec(nextChar)) {
              return false;
          }
      }
      return true;
  };

  PIXI.TextMetrics.canBreakChars = canBreakChars;

})));
//# sourceMappingURL=pixi-cjk.js.map
