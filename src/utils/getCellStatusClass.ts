import { CellStatus } from '../types';

export const getCellStatusClass = (status: CellStatus): string => {
  switch (status) {
    case CellStatus.Highlighted:
      return 'cell--highlighted';
    case CellStatus.Correct:
      return 'cell--correct';
    case CellStatus.Wrong:
      return 'cell--wrong';
    default:
      return '';
  }
};
