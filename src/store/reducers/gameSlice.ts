import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_TIME_LIMIT, DEFAULT_CELL_COLORS } from '@/constants';
import { CellStatus, GamePhase, ZoomLevel, ShapeType } from '@/types';
import type { CellData, GameState } from '@/types';

const createInitialCells = (gridSize: number): CellData[] => {
  const totalCells = gridSize * gridSize;

  return Array.from({ length: totalCells }, (_, index) => ({
    id: index,
    status: CellStatus.Default,
  }));
};

const initialState: GameState = {
  gridSize: 10,
  shapeType: ShapeType.Square,
  cells: createInitialCells(10),
  playerScore: 0,
  computerScore: 0,
  isPlaying: false,
  isConfigOpen: false,
  timeLimit: DEFAULT_TIME_LIMIT,
  currentHighlightedCell: null,
  highlightStartTime: null,
  totalRounds: 10,
  currentRound: 0,
  zoomLevel: ZoomLevel.Medium,
  cellColors: DEFAULT_CELL_COLORS,
  gamePhase: GamePhase.Idle,
  lastRoundWinner: null,
  playerName: 'Player',
  didForfeit: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    openConfig: (state) => {
      state.isConfigOpen = true;
    },
    closeConfig: (state) => {
      state.isConfigOpen = false;
    },
    setGridSize: (state, action: PayloadAction<number>) => {
      state.gridSize = action.payload;
      state.cells = createInitialCells(state.gridSize);
    },
    setShapeType: (state, action: PayloadAction<ShapeType>) => {
      state.shapeType = action.payload;
    },
    setTimeLimit: (state, action: PayloadAction<number>) => {
      state.timeLimit = action.payload;
    },
    setTotalRounds: (state, action: PayloadAction<number>) => {
      state.totalRounds = Math.min(Math.max(action.payload, 1), 20);
    },
    setZoomLevel: (state, action: PayloadAction<ZoomLevel>) => {
      state.zoomLevel = action.payload;
    },
    setCellColor: (state, action: PayloadAction<{ key: keyof CellColors; value: string }>) => {
      state.cellColors[action.payload.key] = action.payload.value;
    },
    startGame: (state) => {
      state.isPlaying = true;
      state.isConfigOpen = false;
      state.playerScore = 0;
      state.computerScore = 0;
      state.currentRound = 1;
      state.cells = createInitialCells(state.gridSize);
      state.currentHighlightedCell = null;
      state.gamePhase = GamePhase.RoundStart;
      state.lastRoundWinner = null;
      state.didForfeit = false;
    },
    setGamePhase: (state, action: PayloadAction<GamePhase>) => {
      state.gamePhase = action.payload;
    },
    nextRound: (state) => {
      state.currentRound += 1;
      state.gamePhase = GamePhase.RoundStart;
      state.lastRoundWinner = null;
      state.currentHighlightedCell = null;
      state.cells = state.cells.map((cell) => {
        if (cell.status === CellStatus.Highlighted) {
          return {
            ...cell,
            status: CellStatus.Default,
          };
        }
        return cell;
      });
    },
    highlightCell: (state, action: PayloadAction<number>) => {
      if (state.currentHighlightedCell !== null) {
        const prevCell = state.cells[state.currentHighlightedCell];
        if (prevCell.status === CellStatus.Highlighted) {
          prevCell.status = CellStatus.Default;
        }
      }
      state.currentHighlightedCell = action.payload;
      state.highlightStartTime = Date.now();
      state.cells[action.payload].status = CellStatus.Highlighted;
    },
    cellClicked: (state, action: PayloadAction<number>) => {
      if (state.currentHighlightedCell === action.payload) {
        state.cells[action.payload].status = CellStatus.Correct;
        state.playerScore += 1;
        state.currentHighlightedCell = null;
        state.lastRoundWinner = 'player';
        state.gamePhase = GamePhase.RoundResult;
      }
    },
    cellTimeout: (state, action: PayloadAction<number>) => {
      if (state.currentHighlightedCell === action.payload) {
        state.cells[action.payload].status = CellStatus.Wrong;
        state.computerScore += 1;
        state.currentHighlightedCell = null;
        state.lastRoundWinner = 'computer';
        state.gamePhase = GamePhase.RoundResult;
      }
    },
    endGame: (state) => {
      state.isPlaying = false;
      state.currentHighlightedCell = null;
      state.gamePhase = GamePhase.GameEnd;
    },
    resetGame: (state) => {
      state.cells = createInitialCells(state.gridSize);
      state.playerScore = 0;
      state.computerScore = 0;
      state.isPlaying = false;
      state.isConfigOpen = false;
      state.currentHighlightedCell = null;
      state.highlightStartTime = null;
      state.gamePhase = GamePhase.Idle;
      state.lastRoundWinner = null;
      state.currentRound = 0;
      state.didForfeit = false;
    },
    setPlayerName: (state, action: PayloadAction<string>) => {
      state.playerName = action.payload;
    },
    forfeitGame: (state) => {
      state.isPlaying = false;
      state.gamePhase = GamePhase.GameEnd;
      state.didForfeit = true;
    },
  },
});

export const {
  openConfig,
  closeConfig,
  setGridSize,
  setShapeType,
  setTimeLimit,
  setTotalRounds,
  setZoomLevel,
  setCellColor,
  startGame,
  setGamePhase,
  nextRound,
  highlightCell,
  cellClicked,
  cellTimeout,
  endGame,
  resetGame,
  setPlayerName,
  forfeitGame,
} = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
