import { shouldBreakByKinsokuShorui } from '../src/KinsokuShori';

describe('KinsokuShori', () => {
  describe('Chinese', () => {
    it('should not break general chars', () => {
      expect(shouldBreakByKinsokuShorui('中')).toBeFalsy();

      expect(shouldBreakByKinsokuShorui('中', '文')).toBeFalsy();

      expect(shouldBreakByKinsokuShorui('中', '。')).toBeFalsy();

      expect(shouldBreakByKinsokuShorui('中', '，')).toBeFalsy();

      expect(shouldBreakByKinsokuShorui('中', '；')).toBeFalsy();
    });

    it('should break when straring from the illegal chars', () => {
      expect(shouldBreakByKinsokuShorui('？', '文')).toBeTruthy();

      expect(shouldBreakByKinsokuShorui('」', '文')).toBeTruthy();

      expect(shouldBreakByKinsokuShorui('』', '文')).toBeTruthy();

      expect(shouldBreakByKinsokuShorui('"', '文')).toBeTruthy();

      expect(shouldBreakByKinsokuShorui('，', '文')).toBeTruthy();

      expect(shouldBreakByKinsokuShorui('。', '文')).toBeTruthy();
    });

    it('should break when ending to the illegal chars', () => {
      expect(shouldBreakByKinsokuShorui('中', '$')).toBeTruthy();

      expect(shouldBreakByKinsokuShorui('中', '「')).toBeTruthy();

      expect(shouldBreakByKinsokuShorui('中', '『')).toBeTruthy();

      expect(shouldBreakByKinsokuShorui('中', '"')).toBeTruthy();
    });
  });

  describe('Japanese', () => {
    it('should not break general chars', () => {
      expect(shouldBreakByKinsokuShorui('あ')).toBeFalsy();

      expect(shouldBreakByKinsokuShorui('あ', 'い')).toBeFalsy();

      expect(shouldBreakByKinsokuShorui('あ', '。')).toBeFalsy();

      expect(shouldBreakByKinsokuShorui('あ', '、')).toBeFalsy();

      expect(shouldBreakByKinsokuShorui('あ', '・')).toBeFalsy();
    });

    it('should break when straring from the illegal chars', () => {
      expect(shouldBreakByKinsokuShorui('？', 'い')).toBeTruthy();

      expect(shouldBreakByKinsokuShorui('々', 'い')).toBeTruthy();

      expect(shouldBreakByKinsokuShorui('ー', 'い')).toBeTruthy();

      expect(shouldBreakByKinsokuShorui('ァ', 'い')).toBeTruthy();

      expect(shouldBreakByKinsokuShorui('ッ', 'い')).toBeTruthy();

      expect(shouldBreakByKinsokuShorui('»', 'い')).toBeTruthy();
    });

    it('should break when ending to the illegal chars', () => {
      expect(shouldBreakByKinsokuShorui('あ', '$')).toBeTruthy();

      expect(shouldBreakByKinsokuShorui('あ', '—')).toBeTruthy();

      expect(shouldBreakByKinsokuShorui('あ', '«')).toBeTruthy();
    });
  });

  describe('Korean', () => {
    it('should not break general chars', () => {
      expect(shouldBreakByKinsokuShorui('한')).toBeFalsy();

      expect(shouldBreakByKinsokuShorui('한', '국')).toBeFalsy();

      expect(shouldBreakByKinsokuShorui('한', ',')).toBeFalsy();
    });

    it('should break when straring from the illegal chars', () => {
      expect(shouldBreakByKinsokuShorui('?', '국')).toBeTruthy();

      expect(shouldBreakByKinsokuShorui('」', '국')).toBeTruthy();

      expect(shouldBreakByKinsokuShorui('%', '국')).toBeTruthy();
    });

    it('should break when ending to the illegal chars', () => {
      expect(shouldBreakByKinsokuShorui('한', '「')).toBeTruthy();

      expect(shouldBreakByKinsokuShorui('한', '『')).toBeTruthy();

      expect(shouldBreakByKinsokuShorui('한', '¥')).toBeTruthy();
    });
  });

  describe('Other languages', () => {
    it('should not break general chars', () => {
      expect(shouldBreakByKinsokuShorui('A')).toBeFalsy();

      expect(shouldBreakByKinsokuShorui('A', 'B')).toBeFalsy();

      expect(shouldBreakByKinsokuShorui('A', ',')).toBeFalsy();
    });
  });
});
