import { testMethod } from '../src';

test('test for the testMethod', () => {
  const subject = () => {
    return testMethod(a, b);
  };

  const a = 1;
  const b = 2;

  expect(subject()).toBe(3);
});
