import { TextStyle, TextMetrics } from 'pixi.js';
import '../src';

describe('PIXI.TextMetrics', () => {
  const fontSize = 14;
  // Generate Text style
  const style = new TextStyle({
    fontWeight: 'bold',
    fontSize: fontSize,
    wordWrap: true,
    breakWords: true,
    wordWrapWidth: 340,
  });

  // Mock canvas element
  const createElement = document.createElement.bind(document);
  const mockMeasureText = (text: string) => ({ width: text.length * fontSize });
  const mockGetContext = () => ({ measureText: mockMeasureText });

  document.createElement = jest.fn((tagName: string) => {
    switch (tagName) {
      case 'canvas':
        return { getContext: mockGetContext };
      default:
        return createElement(tagName);
    }
  });
  const mockCanvas = document.createElement('canvas');

  // Test the word wrapping result
  const subject = (source: string, canvas?: HTMLCanvasElement): string[] => {
    // @ts-ignore
    TextMetrics._canvas = mockCanvas;
    const { lines } = TextMetrics.measureText(source, style, true, canvas);
    return lines;
  };

  describe('Kinsoku-Shorui in text metrics', () => {
    describe('Chinese', () => {
      it('should break chars as rules', () => {
        const beforePlugin = [
          '你好，這是一篇測試文章，想確認這文章段落是否正常',
          '?',
        ];
        const afterPlugin = [
          '你好，這是一篇測試文章，想確認這文章段落是否正',
          '常?',
        ];

        const source = beforePlugin.join('');
        expect(subject(source)).toStrictEqual(afterPlugin);
      });
    });

    describe('Japanese', () => {
      it('should break chars as rules', () => {
        const beforePlugin = [
          'こんにちは、これはテストの文章、正しく表示してる',
          '?',
        ];
        const afterPlugin = [
          'こんにちは、これはテストの文章、正しく表示して',
          'る?',
        ];

        const source = beforePlugin.join('');
        expect(subject(source)).toStrictEqual(afterPlugin);
      });
    });

    describe('Korean', () => {
      it('should break chars as rules', () => {
        const beforePlugin = [
          '안녕하세요,이 테스트의 문장입니다 제대로 표시하고 있습니까',
          '?',
        ];
        const afterPlugin = [
          '안녕하세요,이 테스트의 문장입니다 제대로 표',
          '시하고 있습니까?',
        ];

        const source = beforePlugin.join('');
        expect(subject(source)).toStrictEqual(afterPlugin);
      });
    });
  });

  describe('Breakable chars in text metrics', () => {
    describe('List Style', () => {
      it('should break chars as rules', () => {
        const beforePlugin = [
          '-',
          'こんにちは、これはテストの文章、正しく表示して',
          'る？',
        ];
        const afterPlugin = [
          '- こんにちは、これはテストの文章、正しく表示し',
          'てる？',
        ];

        const source = `${beforePlugin[0]} ${beforePlugin[1]}${beforePlugin[2]}`;
        expect(subject(source)).toStrictEqual(afterPlugin);
      });
    });

    describe('List Style with multi-languages', () => {
      it('should break chars as rules', () => {
        const beforePlugin = [
          '-',
          'こんにちは、これはテストの文章、正しく表示Pre',
          'ttierる？',
        ];
        const afterPlugin = [
          '- こんにちは、これはテストの文章、正しく表示',
          'Prettierる？',
        ];

        const source = `${beforePlugin[0]} ${beforePlugin[1]}${beforePlugin[2]}`;
        expect(subject(source)).toStrictEqual(afterPlugin);
      });
    });

    describe('Number List Style', () => {
      it('should break chars as rules', () => {
        const beforePlugin = [
          '1.',
          'こんにちは、これはテストの文章、正しく表示し',
          'てる？',
        ];
        const afterPlugin = [
          '1. こんにちは、これはテストの文章、正しく表示',
          'してる？',
        ];

        const source = `${beforePlugin[0]} ${beforePlugin[1]}${beforePlugin[2]}`;
        expect(subject(source)).toStrictEqual(afterPlugin);
      });
    });

    describe('Mixed Style', () => {
      it('should break chars as rules', () => {
        const beforePlugin = [
          'こんにちは、これはテストHello',
          'World',
          'Worldという文章、正しく表示してる？',
        ];
        const afterPlugin = [
          'こんにちは、これはテストHello World',
          'Worldという文章、正しく表示してる？',
        ];

        const source = `${beforePlugin[0]} ${beforePlugin[1]} ${beforePlugin[2]}`;
        expect(subject(source)).toStrictEqual(afterPlugin);
      });
    });

    describe('Mixed Style with a long word', () => {
      it('should break chars as rules', () => {
        const beforePlugin = [
          'こんにちは、これはテストHelloooooooooooooooooooooooooooooooooooooooooooo',
        ];
        const afterPlugin = [
          'こんにちは、これはテスト',
          'Helloooooooooooooooooooo',
          'oooooooooooooooooooooooo',
        ];

        const source = `${beforePlugin[0]}`;
        expect(subject(source)).toStrictEqual(afterPlugin);
      });
    });

    describe('Default behavior with general text', () => {
      it('should break chars as rules', () => {
        const beforePlugin = [
          'The is a test text for',
          'checking space breaks',
        ];
        const afterPlugin = ['The is a test text for', 'checking space breaks'];

        const source = `${beforePlugin[0]} ${beforePlugin[1]}`;
        expect(subject(source)).toStrictEqual(afterPlugin);
      });
    });

    describe('Default behavior when the space is over the max width', () => {
      it('should break chars as rules without space in the begining', () => {
        const beforePlugin = [
          'The is a tests texts for',
          'checking space breaks',
        ];
        const afterPlugin = [
          'The is a tests texts for',
          'checking space breaks',
        ];

        const source = `${beforePlugin[0]} ${beforePlugin[1]}`;
        expect(subject(source)).toStrictEqual(afterPlugin);
      });
    });

    describe('Default behavior with break-line text', () => {
      it('should break chars as rules', () => {
        const beforePlugin = [
          'The is a test text for',
          'checking space breaks',
        ];
        const afterPlugin = ['The is a test text for', 'checking space breaks'];

        const source = `${beforePlugin[0]}
${beforePlugin[1]}`;
        expect(subject(source)).toStrictEqual(afterPlugin);
      });
    });
  });

  describe('canvas is passed from out side', () => {
    it('should return a valid strings', () => {
      const beforePlugin = ['你好，這是一篇測試文章，想確認這文章段落是否正常'];
      const afterPlugin = ['你好，這是一篇測試文章，想確認這文章段落是否正常'];

      const source = beforePlugin.join('');
      expect(subject(source, mockCanvas)).toStrictEqual(afterPlugin);
    });
  });
});
