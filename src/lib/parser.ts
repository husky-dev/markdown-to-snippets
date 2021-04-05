import { Snippet } from './types';

export const mdStrToSnippetsData = (str: string): Snippet[] => {
  if (!str) {
    return [];
  }
  const lines = str.split('\n');
  if (lines.length === 1) {
    return [];
  }
  const items: Snippet[] = [];
  let cur: Snippet | undefined = undefined;
  for (const line of lines) {
    const prefix = parsePrefix(line);
    // Create new item when we got new prefix
    if (prefix) {
      if (cur) {
        items.push(cur);
      }
      cur = { prefix, body: [] };
    }
    // Parse description
    const description = parseDescription(line);
    if (cur && description) {
      cur = { ...cur, description };
    }
    // Parse scope
    const scope = parseScope(line);
    if (cur && scope) {
      cur = { ...cur, scope };
    }
  }
  return items;
};

export const parsePrefix = (val: string): string | undefined => {
  const reg = /[* ]*?(Prefix)[* ]*?:[` ]*([\w\d-_ ]+)[` ]*/g;
  const match = reg.exec(val);
  return match ? match[2] : undefined;
};

export const parseDescription = (val: string): string | undefined => {
  const reg = /[* ]*?(Description|description|Descr|descr)[* ]*?:[` ]*([\w\d-_ ,.]+)[` ]*/g;
  const match = reg.exec(val);
  return match ? match[2] : undefined;
};

export const parseScope = (val: string): string | undefined => {
  const reg = /[* ]*?(Scope|scope)[* ]*?:[` ]*([\w\d-_ ,]+)[` ]*/g;
  const match = reg.exec(val);
  return match ? match[2] : undefined;
};
