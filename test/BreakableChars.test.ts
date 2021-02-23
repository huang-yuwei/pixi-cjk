import { findBreakableIndex } from '../src/BreakableChars';

describe('BreakableChars', () => {
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
