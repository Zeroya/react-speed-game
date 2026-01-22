import { useAppDispatch, useAppSelector } from '@/hooks';
import { ScoreBlockVariant } from '@/types';
import { forfeitGame } from '@/store/reducers';
import { GameGrid, ScoreBlock } from '../index';
import './RightPanel.scss';
export const RightPanel = () => {
  const dispatch = useAppDispatch();
  const { playerScore, computerScore, timeLimit, isPlaying, isConfigOpen, currentRound, totalRounds, playerName } =
    useAppSelector((state) => state.game);
    
  return (
    <div className="right-panel">
      {isPlaying && (
        <div className="right-panel__header">
          <ScoreBlock label="Round" value={`${currentRound}/${totalRounds}`} />
          <ScoreBlock label="Time (ms)" value={timeLimit} />
          <ScoreBlock label={playerName} value={playerScore} variant={ScoreBlockVariant.Player} />
          <ScoreBlock label="Computer" value={computerScore} variant={ScoreBlockVariant.Computer} />
        </div>
      )}
      <div className="right-panel__game">
        <GameGrid />
      </div>
      {isPlaying && (
        <div className="right-panel__forfeit">
          <button className="right-panel__forfeit-btn" onClick={() => dispatch(forfeitGame())}>
            Give Up
          </button>
          <span className="right-panel__forfeit-hint">Press Q to quickly give up</span>
        </div>
      )}
      {!isPlaying && (
        <div
          className={`right-panel__fog ${
            isConfigOpen ? 'right-panel__fog--light' : ''
          }`}
        />
      )}
    </div>
  );
};
