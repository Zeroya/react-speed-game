import type { CellColors } from '@/types';

export const GRID_SIZE = 10;
export const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;
export const WIN_SCORE = 10;
export const DEFAULT_TIME_LIMIT = 1000;
export const ROUND_MODAL_DELAY = 1500;
export const RESULT_MODAL_DELAY = 1500;

export const DEFAULT_CELL_COLORS: CellColors = {
  default: '#4a90d9',
  highlighted: '#ffd700',
  correct: '#4caf50',
  wrong: '#f44336',
};
