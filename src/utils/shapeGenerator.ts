import type { ShapeType } from '../types';

/**
 * Подсчитывает количество активных ячеек в фигуре.
 */
export const getShapeCellCount = (gridSize: number, shapeType: ShapeType): number => {
  const mask = generateShapeMask(gridSize, shapeType);
  return mask.filter(Boolean).length;
};

/**
 * Генерирует маску активных клеток для заданной формы.
 * @param gridSize - размер сетки (NxN)
 * @param shapeType - тип фигуры
 * @returns массив булевых значений, где true означает активную клетку
 */
export const generateShapeMask = (gridSize: number, shapeType: ShapeType): boolean[] => {
  const totalCells = gridSize * gridSize;
  const mask = new Array(totalCells).fill(false);
  const center = Math.floor(gridSize / 2);

  switch (shapeType) {
    case 'square':
      // Квадрат - все клетки активны
      return mask.map(() => true);

    case 'triangle':
      // Треугольник (верхняя половина)
      for (let row = 0; row < Math.ceil(gridSize / 2); row++) {
        const startCol = center - row;
        const endCol = center + row + 1;
        for (let col = Math.max(0, startCol); col < Math.min(gridSize, endCol); col++) {
          mask[row * gridSize + col] = true;
        }
      }
      return mask;

    case 'diamond':
      // Ромб
      for (let row = 0; row < gridSize; row++) {
        const distanceFromCenter = Math.abs(row - center);
        const width = gridSize - distanceFromCenter * 2;
        const startCol = distanceFromCenter;
        for (let col = startCol; col < startCol + width; col++) {
          mask[row * gridSize + col] = true;
        }
      }
      return mask;

    case 'cross':
      // Крест (X)
      for (let i = 0; i < gridSize; i++) {
        // Главная диагональ
        mask[i * gridSize + i] = true;
        // Побочная диагональ
        mask[i * gridSize + (gridSize - 1 - i)] = true;
      }
      return mask;

    case 'plus':
      // Плюс (+)
      for (let i = 0; i < gridSize; i++) {
        // Горизонтальная линия
        mask[center * gridSize + i] = true;
        // Вертикальная линия
        mask[i * gridSize + center] = true;
      }
      return mask;

    case 'hexagon':
      // Шестиугольник (аппроксимация)
      for (let row = 0; row < gridSize; row++) {
        const distanceFromCenter = Math.abs(row - center);
        let width: number;
        if (distanceFromCenter <= Math.floor(gridSize / 3)) {
          width = gridSize;
        } else {
          width = Math.max(1, gridSize - (distanceFromCenter - Math.floor(gridSize / 3)) * 2);
        }
        const startCol = Math.floor((gridSize - width) / 2);
        for (let col = startCol; col < startCol + width; col++) {
          mask[row * gridSize + col] = true;
        }
      }
      return mask;

    default:
      return mask.map(() => true);
  }
};
