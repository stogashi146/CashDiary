export const SORT_TYPE = {
  newest: "newest",
  oldest: "oldest",
  highest: "highest",
  lowest: "lowest",
} as const;
export type SortType = (typeof SORT_TYPE)[keyof typeof SORT_TYPE];
