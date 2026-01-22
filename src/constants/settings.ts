import { DEFAULT_TIME_LIMIT } from './game';
import { ShapeType, ZoomLevel } from '@/types';
import type { CellColors } from '@/types';

export const PRESET_LEVELS = [
  { id: 'easy', label: 'Easy', timeLimit: 1500 },
  { id: 'medium', label: 'Medium', timeLimit: 1000 },
  { id: 'hard', label: 'Hard', timeLimit: 600 },
  { id: 'custom', label: 'Custom', timeLimit: DEFAULT_TIME_LIMIT },
];

export const GRID_SIZES = [6, 7, 8, 9, 10];

export const SHAPE_OPTIONS = [
  { value: ShapeType.Square, label: 'Square' },
  { value: ShapeType.Triangle, label: 'Triangle' },
  { value: ShapeType.Diamond, label: 'Diamond' },
  { value: ShapeType.Cross, label: 'Cross' },
  { value: ShapeType.Plus, label: 'Plus' },
  { value: ShapeType.Hexagon, label: 'Hexagon' },
];

export const ZOOM_OPTIONS = [
  { value: ZoomLevel.Far, label: 'Far' },
  { value: ZoomLevel.Medium, label: 'Medium' },
  { value: ZoomLevel.Close, label: 'Close' },
];

export const COLOR_OPTIONS: { key: keyof CellColors; label: string }[] = [
  { key: 'default', label: 'Default' },
  { key: 'highlighted', label: 'Highlighted' },
  { key: 'correct', label: 'Correct' },
  { key: 'wrong', label: 'Wrong' },
];
