import {
  trimByKinsokuShorui,
  shouldBreakByKinsokuShorui,
} from '../src/KinsokuShori';

describe('KinsokuShori', () => {
  describe('trimByKinsokuShorui', () => {
    let prev: string[] = [];
    let next: string[] = [];

    beforeEach(() => {
      prev = ['こんにちは、これはテストの文章、正しく表示してる', '?'];
    });

    describe('when triming with multi-lines', () => {
      it('should return an array of updating lines', () => {
        next = ['こんにちは、これはテストの文章、正しく表示して', 'る?'];
        expect(trimByKinsokuShorui(prev)).toStrictEqual(next);

        prev = ['안녕하세요,이 테스트의 문장입니다 제대로 표시하고', '?'];
        next = ['안녕하세요,이 테스트의 문장입니다 제대로 표시하', '고?'];
        expect(trimByKinsokuShorui(prev)).toStrictEqual(next);
      });
    });

    describe('when triming with one line', () => {
      it('should return an array of original lines', () => {
        prev = ['こんにちは、これはテストの文章、正しく表示してる？'];
        next = ['こんにちは、これはテストの文章、正しく表示してる？'];
        expect(trimByKinsokuShorui(prev)).toStrictEqual(next);
      });
    });
  });

  describe('shouldBreakByKinsokuShorui', () => {
    describe('when have legal chars which are not the space', () => {
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

    describe('when the next char is a breakable space', () => {
      it('should not break general chars', () => {
        expect(shouldBreakByKinsokuShorui('A', ' ')).toBeFalsy();

        expect(shouldBreakByKinsokuShorui('A', '　')).toBeFalsy();
      });
    });
  });
});
