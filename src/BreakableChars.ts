const LATIN_REGEX = /[A-Za-z]/;

export const trimToBreakable = (prev: string[]): string[] => {
  const next = [...prev];
  const prevLine = next[next.length - 2];

  const indexToTrim = findBreakableIndex(prevLine);
  if (indexToTrim === -1 || !prevLine) return next;

  next[next.length - 1] = prevLine.slice(indexToTrim, prevLine.length);
  next[next.length - 2] = prevLine.slice(0, indexToTrim);
  return next;
};

export const sumTextWidthByCache = (
  text: string,
  cache: { [key in string]: number },
) => {
  return text.split('').reduce((sum: number, c) => sum + cache[c], 0);
};

export const findBreakableIndex = (line: string): number => {
  for (let i = line.length - 1; i >= 0; i--) {
    if (!LATIN_REGEX.test(line[i])) return i + 1;
  }
  return -1;
};
