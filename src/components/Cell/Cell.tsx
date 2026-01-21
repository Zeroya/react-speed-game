import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { cellClicked } from '../../store/reducers';
import { CellStatus, GamePhase } from '../../types';
import './Cell.scss';

interface CellProps {
  id: number;
}

const Cell = ({ id }: CellProps) => {
  const dispatch = useAppDispatch();
  const cell = useAppSelector((state) => state.game.cells[id]);
  const gamePhase = useAppSelector((state) => state.game.gamePhase);
  const cellColors = useAppSelector((state) => state.game.cellColors);

  const handleClick = () => {
    if (gamePhase === GamePhase.Playing && cell.status === CellStatus.Highlighted) {
      dispatch(cellClicked(id));
    }
  };

  const style = useMemo(() => {
    switch (cell.status) {
      case CellStatus.Highlighted:
        return {
          backgroundColor: cellColors.highlighted,
          boxShadow: `0 0 12px ${cellColors.highlighted}99`,
        };
      case CellStatus.Correct:
        return { backgroundColor: cellColors.correct };
      case CellStatus.Wrong:
        return { backgroundColor: cellColors.wrong };
      default:
        return { backgroundColor: cellColors.default };
    }
  }, [cell.status, cellColors]);

  const className = [
    'cell',
    cell.status === CellStatus.Correct && 'cell--no-hover',
    cell.status === CellStatus.Wrong && 'cell--no-hover',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={className}
      style={style}
      onClick={handleClick}
    />
  );
};

export { Cell };
export default Cell;
