import { describe, it, expect } from 'vitest';
import Guard from '../index.js';

describe('Guard.Against', () => {
  it('NullOrUndefined throws on invalid values', () => {
    expect(() => Guard.Against.NullOrUndefined(null, 'val')).toThrow();
    expect(() => Guard.Against.NullOrUndefined(undefined, 'val')).toThrow();
  });

  it('NullOrUndefined returns value when valid', () => {
    expect(Guard.Against.NullOrUndefined(5, 'num')).toBe(5);
  });

  it('Null throws on null', () => {
    expect(() => Guard.Against.Null(null)).toThrow();
    expect(Guard.Against.Null('ok')).toBe('ok');
  });

  it('NullOrWhiteSpace throws on whitespace', () => {
    expect(() => Guard.Against.NullOrWhiteSpace('   ')).toThrow();
  });

  it('OutOfRange validates correctly', () => {
    expect(() => Guard.Against.OutOfRange(1, [2, 5], 'num')).toThrow();
    expect(Guard.Against.OutOfRange(3, [2, 5], 'num')).toBe(3);
  });

  it('NegativeOrZero validates numbers', () => {
    expect(() => Guard.Against.NegativeOrZero(0)).toThrow();
    expect(() => Guard.Against.NegativeOrZero(-1)).toThrow();
    expect(Guard.Against.NegativeOrZero(1)).toBe(1);
  });

  it('Expression and ExpressionAsync return value', async () => {
    const val = Guard.Against.Expression(4, v => v > 2, 'fail');
    expect(val).toBe(4);
    await expect(Guard.Against.ExpressionAsync(4, async v => v > 2, 'fail')).resolves.toBe(4);
  });

  it('NullOrEmpty handles empty values', () => {
    expect(() => Guard.Against.NullOrEmpty(null)).toThrow();
    expect(() => Guard.Against.NullOrEmpty('')).toThrow();
    expect(Guard.Against.NullOrEmpty('ok')).toBe('ok');
  });

  it('Zero throws when value is zero', () => {
    expect(() => Guard.Against.Zero(0)).toThrow();
    expect(Guard.Against.Zero(5)).toBe(5);
  });

  it('EmptyObject rejects empty objects', () => {
    expect(() => Guard.Against.EmptyObject({})).toThrow();
    const obj = { a: 1 };
    expect(Guard.Against.EmptyObject(obj)).toBe(obj);
  });

  it('UndefinedOrNullOrNaN handles invalid values', () => {
    expect(() => Guard.Against.UndefinedOrNullOrNaN(undefined)).toThrow();
    expect(() => Guard.Against.UndefinedOrNullOrNaN(null)).toThrow();
    expect(() => Guard.Against.UndefinedOrNullOrNaN(NaN)).toThrow();
    expect(Guard.Against.UndefinedOrNullOrNaN(1)).toBe(1);
  });

  it('Falsy throws on falsy inputs', () => {
    expect(() => Guard.Against.Falsy(0)).toThrow();
    expect(() => Guard.Against.Falsy('')).toThrow();
    expect(() => Guard.Against.Falsy(false)).toThrow();
    expect(Guard.Against.Falsy(1)).toBe(1);
  });

  it('EmptyArray rejects an empty array', () => {
    expect(() => Guard.Against.EmptyArray([])).toThrow();
    const arr = [1];
    expect(Guard.Against.EmptyArray(arr)).toBe(arr);
  });

  it('NotObject validates objects only', () => {
    expect(() => Guard.Against.NotObject(null)).toThrow();
    expect(() => Guard.Against.NotObject(5)).toThrow();
    const obj = { b: 2 };
    expect(Guard.Against.NotObject(obj)).toBe(obj);
  });
});
