import type { CellData } from './cell';

import type { GamePhase, ShapeType, ZoomLevel } from './enums';

export interface CellColors {
  default: string;
  highlighted: string;
  correct: string;
  wrong: string;
}

export type RoundWinner = 'player' | 'computer' | null;

export interface GameState {
  cells: CellData[];
  playerScore: number;
  computerScore: number;
  isPlaying: boolean;
  gridSize: number;
  shapeType: ShapeType;
  isConfigOpen: boolean;
  timeLimit: number;
  currentHighlightedCell: number | null;
  highlightStartTime: number | null;
  totalRounds: number;
  currentRound: number;
  zoomLevel: ZoomLevel;
  cellColors: CellColors;
  gamePhase: GamePhase;
  lastRoundWinner: RoundWinner;
  playerName: string;
  didForfeit: boolean;
}
