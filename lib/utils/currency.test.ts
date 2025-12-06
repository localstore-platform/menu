/**
 * Unit tests for VND currency formatter
 * Story 1.2: VND Currency Formatter
 */

import { formatVND, formatVNDRange, calculateVariantPrice } from './currency';

describe('formatVND', () => {
  it('formats regular amounts correctly', () => {
    expect(formatVND(75000)).toBe('75.000₫');
    expect(formatVND(1500000)).toBe('1.500.000₫');
    expect(formatVND(25000)).toBe('25.000₫');
  });

  it('handles zero correctly', () => {
    expect(formatVND(0)).toBe('0₫');
  });

  it('handles undefined and null', () => {
    expect(formatVND(undefined)).toBe('—');
    expect(formatVND(null)).toBe('—');
  });

  it('handles NaN', () => {
    expect(formatVND(NaN)).toBe('—');
  });

  it('handles negative numbers', () => {
    expect(formatVND(-10000)).toBe('-10.000₫');
  });

  it('handles small amounts', () => {
    expect(formatVND(1000)).toBe('1.000₫');
    expect(formatVND(500)).toBe('500₫');
  });

  it('handles large amounts', () => {
    expect(formatVND(10000000)).toBe('10.000.000₫');
    expect(formatVND(999999999)).toBe('999.999.999₫');
  });
});

describe('formatVNDRange', () => {
  it('formats single price when min equals max', () => {
    expect(formatVNDRange(75000, 75000)).toBe('75.000₫');
  });

  it('formats single price when max is undefined', () => {
    expect(formatVNDRange(75000)).toBe('75.000₫');
  });

  it('formats price range correctly', () => {
    expect(formatVNDRange(65000, 90000)).toBe('65.000₫ - 90.000₫');
  });
});

describe('calculateVariantPrice', () => {
  it('adds positive adjustment', () => {
    expect(calculateVariantPrice(75000, 15000)).toBe(90000);
  });

  it('subtracts negative adjustment', () => {
    expect(calculateVariantPrice(75000, -10000)).toBe(65000);
  });

  it('handles zero adjustment', () => {
    expect(calculateVariantPrice(75000, 0)).toBe(75000);
  });
});
