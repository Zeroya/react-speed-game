import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { GamePhase, CellStatus, ModalVariant } from '@/types';
import { generateShapeMask } from '@/utils/shapeGenerator';
import {
  setGamePhase,
  highlightCell,
  cellTimeout,
  nextRound,
  endGame,
  resetGame,
  forfeitGame,
} from '@/store/reducers';
import { Modal, Countdown, ScreenFlash } from '../index';
import { ROUND_MODAL_DELAY, RESULT_MODAL_DELAY } from '@/constants/game';
import './GameController.scss';

export const GameController = () => {
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
  }, [dispatch]);

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

  useEffect(() => {
    if (gamePhase === GamePhase.Playing && currentHighlightedCell === null) {
      const cellId = getRandomAvailableCell();
      if (cellId !== null) {
        dispatch(highlightCell(cellId));
      }
    }
  }, [gamePhase, currentHighlightedCell, getRandomAvailableCell, dispatch]);

  useEffect(() => {
    if (gamePhase !== GamePhase.Playing || currentHighlightedCell === null) return;

    const timer = setTimeout(() => {
      dispatch(cellTimeout(currentHighlightedCell));
    }, timeLimit);

    return () => clearTimeout(timer);
  }, [gamePhase, currentHighlightedCell, timeLimit, dispatch]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'q' && isPlaying) {
        dispatch(forfeitGame());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, dispatch]);

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
      <Modal
        isOpen={gamePhase === GamePhase.RoundStart}
        autoCloseDelay={ROUND_MODAL_DELAY}
        onClose={handleRoundModalClose}
        variant="round"
      >
        <h2 className="modal__title">Round {currentRound}</h2>
        <p className="modal__subtitle">Get ready!</p>
      </Modal>

      <Countdown
        key={currentRound}
        isActive={gamePhase === GamePhase.Countdown}
        onComplete={handleCountdownComplete}
      />

      <ScreenFlash trigger={showFlash} onComplete={handleFlashComplete} />

      <Modal
        isOpen={gamePhase === GamePhase.RoundResult}
        autoCloseDelay={RESULT_MODAL_DELAY}
        onClose={handleResultModalClose}
        variant={lastRoundWinner === 'player' ? ModalVariant.Success : ModalVariant.Error}
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

      <Modal
        isOpen={gamePhase === GamePhase.GameEnd && !didForfeit}
        onClose={handleGameEndModalClose}
        variant={gameWinner === 'player' ? ModalVariant.Success : gameWinner === 'computer' ? ModalVariant.Error : ModalVariant.Default}
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

      <Modal
        isOpen={gamePhase === GamePhase.GameEnd && didForfeit}
        onClose={handleGameEndModalClose}
        variant={ModalVariant.Error}
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

