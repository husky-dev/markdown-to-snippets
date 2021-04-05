import { parsePrefix, parseDescription, parseScope } from './parser';

describe('parsePrefix()', () => {
  it('should parse', () => {
    expect(parsePrefix('**Prefix**: `tsrfcb`')).toMatchObject(['tsrfcb']);
    expect(parsePrefix('Prefix: tsrfcb')).toMatchObject(['tsrfcb']);
    expect(parsePrefix('Prefix: tsr-fc_1b')).toMatchObject(['tsr-fc_1b']);
  });
});

describe('parseDescription()', () => {
  it('should parse', () => {
    expect(parseDescription('Description: some cool and logng description')).toBe('some cool and logng description');
    expect(parseDescription('**Descr**: some cool and logng description')).toBe('some cool and logng description');
  });
});

describe('parseScope()', () => {
  it('should parse', () => {
    expect(parseScope('**Scope**: `typescript,react`')).toBe('typescript,react');
    expect(parseScope('Scope: typescript,react')).toBe('typescript,react');
  });
});
