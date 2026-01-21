import { useMemo } from 'react';
import { useAppSelector } from '../../hooks';
import { generateShapeMask } from '../../utils/shapeGenerator';
import { Cell } from '../Cell';
import './GameGrid.scss';

const GameGrid = () => {
  const { cells, gridSize, shapeType, isPlaying, zoomLevel } = useAppSelector((state) => state.game);

  const shapeMask = useMemo(() => generateShapeMask(gridSize, shapeType), [gridSize, shapeType]);

  const classNames = [
    'game-grid',
    !isPlaying && 'game-grid--no-effects',
    `game-grid--zoom-${zoomLevel}`,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classNames}
      style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gridTemplateRows: `repeat(${gridSize}, 1fr)` }}
    >
      {cells.map((cell) => {
        const isActive = shapeMask[cell.id];

        return (
          <div
            key={cell.id}
            className={isActive ? 'game-grid__cell' : 'game-grid__cell game-grid__cell--hidden'}
          >
            {isActive && <Cell id={cell.id} />}
          </div>
        );
      })}
    </div>
  );
};

export { GameGrid };
export default GameGrid;
