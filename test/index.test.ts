import { TextStyle, TextMetrics } from 'pixi.js';
import '../src';

describe('PIXI.TextMetrics', () => {
  const fontSize = 14;

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
  const canvas = document.createElement('canvas');

  describe('Kinsoku-Shorui in text metrics', () => {
    const style = new TextStyle({
      fontWeight: 'bold',
      fontSize: fontSize,
      wordWrap: true,
      breakWords: true,
      wordWrapWidth: 340,
    });

    describe('Chinese', () => {
      const beforePlugin = [
        '你好，這是一篇測試文章，想確認這文章段落是否正常',
        '?',
      ];
      const afterPlugin = [
        '你好，這是一篇測試文章，想確認這文章段落是否正',
        '常?',
      ];
      const source = beforePlugin.join('');

      it('should break chars as rules', () => {
        const { lines } = TextMetrics.measureText(source, style, true, canvas);
        expect(lines).toStrictEqual(afterPlugin);
      });
    });

    describe('Japanese', () => {
      const beforePlugin = [
        'こんにちは、これはテストの文章、正しく表示してる',
        '?',
      ];
      const afterPlugin = [
        'こんにちは、これはテストの文章、正しく表示して',
        'る?',
      ];
      const source = beforePlugin.join('');

      it('should break chars as rules', () => {
        const { lines } = TextMetrics.measureText(source, style, true, canvas);
        expect(lines).toStrictEqual(afterPlugin);
      });
    });

    describe('Korean', () => {
      const beforePlugin = [
        '안녕하세요,이 테스트의 문장입니다 제대로 표시하고 있습니까',
        '?',
      ];
      const afterPlugin = [
        '안녕하세요,이 테스트의 문장입니다 제대로 표',
        '시하고 있습니까?',
      ];
      const source = beforePlugin.join('');

      it('should break chars as rules', () => {
        const { lines } = TextMetrics.measureText(source, style, true, canvas);
        expect(lines).toStrictEqual(afterPlugin);
      });
    });
  });

  describe('Breakable chars in text metrics', () => {
    const style = new TextStyle({
      fontWeight: 'bold',
      fontSize: fontSize,
      wordWrap: true,
      breakWords: true,
      wordWrapWidth: 340,
    });

    describe('List Style', () => {
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

      it('should break chars as rules', () => {
        const { lines } = TextMetrics.measureText(source, style, true, canvas);
        expect(lines).toStrictEqual(afterPlugin);
      });
    });

    describe('List Styles', () => {
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

      it('should break chars as rules', () => {
        const { lines } = TextMetrics.measureText(source, style, true, canvas);
        expect(lines).toStrictEqual(afterPlugin);
      });
    });

    describe('Number List Style', () => {
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

      it('should break chars as rules', () => {
        const { lines } = TextMetrics.measureText(source, style, true, canvas);
        expect(lines).toStrictEqual(afterPlugin);
      });
    });

    describe('Mixed Style', () => {
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

      it('should break chars as rules', () => {
        const { lines } = TextMetrics.measureText(source, style, true, canvas);
        expect(lines).toStrictEqual(afterPlugin);
      });
    });

    describe('Mixed Style with a long word', () => {
      const beforePlugin = [
        'こんにちは、これはテストHelloooooooooooooooooooooooooooooooooooooooooooo',
      ];
      const afterPlugin = [
        'こんにちは、これはテスト',
        'Helloooooooooooooooooooo',
        'oooooooooooooooooooooooo',
      ];
      const source = `${beforePlugin[0]}`;

      it('should break chars as rules', () => {
        const { lines } = TextMetrics.measureText(source, style, true, canvas);
        expect(lines).toStrictEqual(afterPlugin);
      });
    });

    describe('Default behavior with general text', () => {
      const beforePlugin = ['The is a test text for', 'checking space breaks'];
      const afterPlugin = ['The is a test text for', 'checking space breaks'];
      const source = `${beforePlugin[0]} ${beforePlugin[1]}`;

      it('should break chars as rules', () => {
        const { lines } = TextMetrics.measureText(source, style, true, canvas);
        expect(lines).toStrictEqual(afterPlugin);
      });
    });

    describe('Default behavior when the space is over the max width', () => {
      const beforePlugin = [
        'The is a tests texts for',
        'checking space breaks',
      ];
      const afterPlugin = ['The is a tests texts for', 'checking space breaks'];
      const source = `${beforePlugin[0]} ${beforePlugin[1]}`;

      it('should break chars as rules without space in the begining', () => {
        const { lines } = TextMetrics.measureText(source, style, true, canvas);
        expect(lines).toStrictEqual(afterPlugin);
      });
    });

    describe('Default behavior with break-line text', () => {
      const beforePlugin = ['The is a test text for', 'checking space breaks'];
      const afterPlugin = ['The is a test text for', 'checking space breaks'];
      const source = `${beforePlugin[0]}
${beforePlugin[1]}`;

      it('should break chars as rules', () => {
        const { lines } = TextMetrics.measureText(source, style, true, canvas);
        expect(lines).toStrictEqual(afterPlugin);
      });
    });
  });
});
