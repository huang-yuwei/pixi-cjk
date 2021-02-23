const LATIN_REGEX = /[A-Za-z]/;

export const findBreakableIndex = (line: string): number => {
  for (let i = line.length - 1; i >= 0; i--) {
    if (!LATIN_REGEX.test(line[i])) return i + 1;
  }
  return -1;
};
