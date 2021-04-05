export interface UnknownDict {
  [index: string]: unknown;
}

export const isUnknownDict = (candidate: unknown): candidate is UnknownDict =>
  typeof candidate === 'object' && candidate !== null;

export const isErr = (val: unknown): val is Error => val instanceof Error;

export const isStr = (val: unknown): val is string => typeof val === 'string';

export const isNum = (val: unknown): val is number => typeof val === 'number';

export const isBool = (val: unknown): val is boolean => typeof val === 'boolean';

export const isNull = (val: unknown): val is null => val === null;

export const isUndef = (val: unknown): val is undefined => typeof val === 'undefined';

export const last = <T = unknown>(val: T[]): T => val[val.length - 1];
