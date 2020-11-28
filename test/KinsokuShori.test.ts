import { canBreakChars } from '../src/KinsokuShori';

describe('KinsokuShori', () => {
  describe('Chinese', () => {
    it('can break general chars', () => {
      expect(canBreakChars('中')).toBeTruthy();

      expect(canBreakChars('中', '文')).toBeTruthy();

      expect(canBreakChars('。', '中')).toBeTruthy();

      expect(canBreakChars('，', '中')).toBeTruthy();

      expect(canBreakChars('；', '中')).toBeTruthy();
    });

    it('can not break when straring from the chars', () => {
      expect(canBreakChars('文', '？')).toBeFalsy();

      expect(canBreakChars('文', '」')).toBeFalsy();

      expect(canBreakChars('文', '』')).toBeFalsy();

      expect(canBreakChars('文', '"')).toBeFalsy();

      expect(canBreakChars('文', '，')).toBeFalsy();

      expect(canBreakChars('文', '。')).toBeFalsy();
    });

    it('can not break when ending to the chars', () => {
      expect(canBreakChars('$', '中')).toBeFalsy();

      expect(canBreakChars('「', '中')).toBeFalsy();

      expect(canBreakChars('『', '中')).toBeFalsy();

      expect(canBreakChars('"', '中')).toBeFalsy();
    });
  });

  describe('Japanese', () => {
    it('can break general chars', () => {
      expect(canBreakChars('あ')).toBeTruthy();

      expect(canBreakChars('あ', 'い')).toBeTruthy();

      expect(canBreakChars('。', 'あ')).toBeTruthy();

      expect(canBreakChars('、', 'あ')).toBeTruthy();

      expect(canBreakChars('・', 'あ')).toBeTruthy();
    });

    it('can not break when straring from the chars', () => {
      expect(canBreakChars('い', '？')).toBeFalsy();

      expect(canBreakChars('い', '々')).toBeFalsy();

      expect(canBreakChars('い', 'ー')).toBeFalsy();

      expect(canBreakChars('い', 'ァ')).toBeFalsy();

      expect(canBreakChars('い', 'ッ')).toBeFalsy();

      expect(canBreakChars('い', '»')).toBeFalsy();
    });

    it('can not break when ending to the chars', () => {
      expect(canBreakChars('$', 'あ')).toBeFalsy();

      expect(canBreakChars('—', 'あ')).toBeFalsy();

      expect(canBreakChars('«', 'あ')).toBeFalsy();
    });
  });

  describe('Korean', () => {
    it('can break general chars', () => {
      expect(canBreakChars('한')).toBeTruthy();

      expect(canBreakChars('한', '국')).toBeTruthy();

      expect(canBreakChars(',', '한')).toBeTruthy();
    });

    it('can not break when straring from the chars', () => {
      expect(canBreakChars('국', '?')).toBeFalsy();

      expect(canBreakChars('국', '」')).toBeFalsy();

      expect(canBreakChars('국', '%')).toBeFalsy();
    });

    it('can not break when ending to the chars', () => {
      expect(canBreakChars('「', '한')).toBeFalsy();

      expect(canBreakChars('『', '한')).toBeFalsy();

      expect(canBreakChars('¥', '한')).toBeFalsy();
    });
  });

  describe('Other languages', () => {
    it('can break general chars', () => {
      expect(canBreakChars('A')).toBeTruthy();

      expect(canBreakChars('A', 'B')).toBeTruthy();

      expect(canBreakChars(',', 'A')).toBeTruthy();
    });
  });
});
