import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { GamePhase, CellStatus } from '../../types';
import { generateShapeMask } from '../../utils/shapeGenerator';
import {
  setGamePhase,
  highlightCell,
  cellTimeout,
  nextRound,
  endGame,
  resetGame,
  forfeitGame,
} from '../../store/reducers';
import { Modal } from '../Modal';
import { Countdown } from '../Countdown';
import { ScreenFlash } from '../ScreenFlash';
import './GameController.scss';

const ROUND_MODAL_DELAY = 1500;
const RESULT_MODAL_DELAY = 1500;

const GameController = () => {
  const dispatch = useAppDispatch();
  const {
    isPlaying,
    gamePhase,
    currentRound,
    totalRounds,
    timeLimit,
    playerScore,
    computerScore,
    lastRoundWinner,
    gridSize,
    shapeType,
    cells,
    currentHighlightedCell,
    playerName,
    didForfeit,
  } = useAppSelector((state) => state.game);

  const [showFlash, setShowFlash] = useState(false);

  const shapeMask = useMemo(
    () => generateShapeMask(gridSize, shapeType),
    [gridSize, shapeType]
  );

  const getRandomAvailableCell = useCallback(() => {
    const availableCells = cells
      .filter((cell, index) => shapeMask[index] && cell.status === CellStatus.Default)
      .map((cell) => cell.id);

    if (availableCells.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * availableCells.length);
    return availableCells[randomIndex];
  }, [cells, shapeMask]);

  const handleRoundModalClose = useCallback(() => {
    dispatch(setGamePhase(GamePhase.Countdown));
  }, [dispatch]);

  const handleCountdownComplete = useCallback(() => {
    setShowFlash(true);
  }, []);

  const handleFlashComplete = useCallback(() => {
    setShowFlash(false);
    dispatch(setGamePhase(GamePhase.Playing));

    const cellId = getRandomAvailableCell();
    if (cellId !== null) {
      dispatch(highlightCell(cellId));
    }
  }, [dispatch, getRandomAvailableCell]);

  const handleResultModalClose = useCallback(() => {
    if (currentRound >= totalRounds) {
      dispatch(endGame());
    } else {
      dispatch(nextRound());
    }
  }, [dispatch, currentRound, totalRounds]);

  const handleGameEndModalClose = useCallback(() => {
    dispatch(resetGame());
  }, [dispatch]);

  // Timer for highlighted cell
  useEffect(() => {
    if (gamePhase !== GamePhase.Playing || currentHighlightedCell === null) return;

    const timer = setTimeout(() => {
      dispatch(cellTimeout(currentHighlightedCell));
    }, timeLimit);

    return () => clearTimeout(timer);
  }, [gamePhase, currentHighlightedCell, timeLimit, dispatch]);

  // Keyboard shortcut for forfeit (Q key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'q' && isPlaying) {
        dispatch(forfeitGame());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, dispatch]);

  // Auto-win detection
  useEffect(() => {
    if (gamePhase !== GamePhase.RoundResult) return;

    const roundsToWin = Math.floor(totalRounds / 2) + 1;

    if (playerScore >= roundsToWin || computerScore >= roundsToWin) {
      dispatch(endGame());
    }
  }, [gamePhase, playerScore, computerScore, totalRounds, dispatch]);

  if (!isPlaying && gamePhase !== GamePhase.GameEnd) return null;

  const gameWinner = playerScore > computerScore ? 'player' : playerScore < computerScore ? 'computer' : 'tie';

  return (
    <div className="game-controller">
      {/* Round Start Modal */}
      <Modal
        isOpen={gamePhase === GamePhase.RoundStart}
        autoCloseDelay={ROUND_MODAL_DELAY}
        onClose={handleRoundModalClose}
        variant="round"
      >
        <h2 className="modal__title">Round {currentRound}</h2>
        <p className="modal__subtitle">Get ready!</p>
      </Modal>

      {/* Countdown */}
      <Countdown
        isActive={gamePhase === GamePhase.Countdown}
        onComplete={handleCountdownComplete}
      />

      {/* Screen Flash */}
      <ScreenFlash trigger={showFlash} onComplete={handleFlashComplete} />

      {/* Round Result Modal */}
      <Modal
        isOpen={gamePhase === GamePhase.RoundResult}
        autoCloseDelay={RESULT_MODAL_DELAY}
        onClose={handleResultModalClose}
        variant={lastRoundWinner === 'player' ? 'success' : 'error'}
      >
        <h2 className="modal__title">
          {lastRoundWinner === 'player' ? `${playerName} Wins!` : 'Computer Wins!'}
        </h2>
        <p className="modal__score">
          <span className="player">{playerScore}</span>
          {' : '}
          <span className="computer">{computerScore}</span>
        </p>
      </Modal>

      {/* Game End Modal */}
      <Modal
        isOpen={gamePhase === GamePhase.GameEnd && !didForfeit}
        onClose={handleGameEndModalClose}
        variant={gameWinner === 'player' ? 'success' : gameWinner === 'computer' ? 'error' : 'default'}
      >
        <h2 className="modal__title">Game Over!</h2>
        <p className="modal__subtitle">
          {gameWinner === 'player' && `${playerName} Won!`}
          {gameWinner === 'computer' && 'Computer Won!'}
          {gameWinner === 'tie' && "It's a Tie!"}
        </p>
        <p className="modal__score">
          Final Score: <span className="player">{playerScore}</span>
          {' : '}
          <span className="computer">{computerScore}</span>
        </p>
        <button className="modal__button" onClick={handleGameEndModalClose}>
          Play Again
        </button>
      </Modal>

      {/* Forfeit Modal */}
      <Modal
        isOpen={gamePhase === GamePhase.GameEnd && didForfeit}
        onClose={handleGameEndModalClose}
        variant="error"
      >
        <h2 className="modal__title">You Gave Up!</h2>
        <p className="modal__subtitle">Computer Won!</p>
        <button className="modal__button" onClick={handleGameEndModalClose}>
          Play Again
        </button>
      </Modal>
    </div>
  );
};

export { GameController };
export default GameController;
