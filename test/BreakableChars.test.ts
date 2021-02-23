import {
  trimToBreakable,
  canBreakInLastChar,
  findBreakableIndex,
  sumTextWidthByCache,
} from '../src/BreakableChars';

describe('BreakableChars', () => {
  describe('trimToBreakable', () => {
    let prev: string[] = [];
    let next: string[] = [];

    beforeEach(() => {
      prev = ['The is a test text for', ''];
    });

    describe('when lines are English', () => {
      it('should return an array of updating lines', () => {
        next = ['The is a test text', 'for'];
        expect(trimToBreakable(prev)).toStrictEqual(next);

        prev = ['The is a test text ', 'for'];
        next = ['The is a test text', 'for'];
        expect(trimToBreakable(prev)).toStrictEqual(next);
      });
    });

    describe('when lines are CJK', () => {
      it('should return an array of updating lines', () => {
        prev = ['こんにちは、これはテストの文章、正しく表示', ''];
        next = ['こんにちは、これはテストの文章、正しく表示', ''];
        expect(trimToBreakable(prev)).toStrictEqual(next);
      });
    });

    describe('when lines are CJK line with English', () => {
      it('should return an array of updating lines', () => {
        prev = ['こんにちは、これはテストの文章、正しく表示DISPLAY', ''];
        next = ['こんにちは、これはテストの文章、正しく表示', 'DISPLAY'];
        expect(trimToBreakable(prev)).toStrictEqual(next);
      });
    });
  });

  describe('canBreakInLastChar', () => {
    describe('when the char is a latin char', () => {
      it('should return a false', () => {
        expect(canBreakInLastChar('a')).toBeFalsy();

        expect(canBreakInLastChar('A')).toBeFalsy();

        expect(canBreakInLastChar('1')).toBeFalsy();
      });
    });

    describe('when the char is a CJK char', () => {
      it('should return a true', () => {
        expect(canBreakInLastChar('中')).toBeTruthy();

        expect(canBreakInLastChar('あ')).toBeTruthy();

        expect(canBreakInLastChar('문')).toBeTruthy();
      });
    });
  });

  describe('sumTextWidthByCache', () => {
    const subject = () => {
      return sumTextWidthByCache(text, cache);
    };

    let text: string;
    let cache: { [key in string]: number } = {};

    beforeEach(() => {
      text = 'abc';
      cache = { a: 10, b: 20, c: 30 };
    });

    describe('when text has all cached', () => {
      it('should return a number', () => {
        expect(subject()).toBe(60);

        text = 'bc';
        expect(subject()).toBe(50);
      });
    });

    describe('when text is empty', () => {
      it('should return an error', () => {
        text = '';
        expect(subject()).toBe(0);
      });
    });

    describe('when text has partially cached', () => {
      it('should return an error', () => {
        text = 'cd';
        expect(() => subject()).toThrow();
      });
    });
  });

  describe('findBreakableIndex', () => {
    let target: string;

    beforeEach(() => {
      target = 'The is a test text for checking space breaks';
    });

    describe('when target is a English line', () => {
      it('should return a number of founded index', () => {
        expect(findBreakableIndex(target)).toBeGreaterThan(-1);

        const indexOfSpace = target.lastIndexOf(' ');
        expect(findBreakableIndex(target)).toBe(indexOfSpace);
      });
    });

    describe('when target is a CJK line with English', () => {
      it('should return a number of founded index', () => {
        target = 'こんにちは、これはテストの文章、正しくDISPLAY';
        expect(findBreakableIndex(target)).toBeGreaterThan(-1);
      });
    });

    describe('when target is a pure CJK line', () => {
      it('should return a number of founded index', () => {
        target = 'こんにちは、これはテストの文章、正しく表示';
        expect(findBreakableIndex(target)).toBe(target.length - 1);
      });
    });

    describe('when target is a mixed chars line', () => {
      it('should return a number of founded index', () => {
        target = 'Phone-number +080011112222';
        const indexOfSpace = target.lastIndexOf(' ');
        expect(findBreakableIndex(target)).toBe(indexOfSpace);
      });
    });

    describe('when target is a line with a long word', () => {
      it('should return a number of un-found index', () => {
        target = 'Theeeeeeeeeeeeeeeeeeeeeeeee';
        expect(findBreakableIndex(target)).toBe(-1);
      });
    });
  });
});
