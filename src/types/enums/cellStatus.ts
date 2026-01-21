export const CellStatus = {
  Default: 'default',
  Highlighted: 'highlighted',
  Correct: 'correct',
  Wrong: 'wrong',
} as const;

export type CellStatus = (typeof CellStatus)[keyof typeof CellStatus];
