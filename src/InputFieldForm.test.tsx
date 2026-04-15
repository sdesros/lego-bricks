import { describe, it, expect } from 'vitest';
import { isNumberValid } from './InputFieldForm.tsx';

describe('isNumberValid', () => {
  it('should return false for an empty string', () => {
    expect(isNumberValid('', 10, 1)).toBe(false);
  });

  it('should return true for a number within the range', () => {
    expect(isNumberValid(5, 10, 1)).toBe(true);
  });

  it('should return false for a number outside the range', () => {
    expect(isNumberValid(11, 10, 1)).toBe(false);
  });
});