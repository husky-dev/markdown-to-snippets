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
  let isBody: boolean = false;

  for (const line of lines) {
    // Lookin for body start/end
    if (/^[`]{3}/.test(line)) {
      isBody = !isBody;
      continue;
    }
    if (isBody) {
      // If we are parsing body - just add this line to the body
      if (cur) {
        cur.body.push(line);
      }
      continue;
    }
    // Parse prefix
    const prefix = parsePrefix(line);
    if (prefix) {
      // Create new item when we got new prefix
      if (cur) {
        items.push(cur);
      }
      cur = { prefix, body: [] };
      continue;
    }
    // Parse description
    const description = parseDescription(line);
    if (cur && description) {
      cur = { ...cur, description };
      continue;
    }
    // Parse scope
    const scope = parseScope(line);
    if (cur && scope) {
      cur = { ...cur, scope };
      continue;
    }
  }

  if (cur) {
    items.push(cur);
  }

  return items;
};

export const parsePrefix = (val: string): string[] | undefined => {
  const reg = /[* ]*?(Prefix)[* ]*?:[` ]*([\w\d-_ ]+)[` ]*/g;
  const match = reg.exec(val);
  return match ? [match[2]] : undefined;
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
