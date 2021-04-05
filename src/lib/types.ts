export interface Snippet {
  prefix: string[];
  description?: string;
  scope?: string;
  body: string[];
}

export type SnippetsObj = Record<string, Snippet>;
