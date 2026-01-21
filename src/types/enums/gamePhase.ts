export const GamePhase = {
  Idle: 'idle',
  RoundStart: 'roundStart',
  Countdown: 'countdown',
  Playing: 'playing',
  RoundResult: 'roundResult',
  GameEnd: 'gameEnd',
} as const;

export type GamePhase = (typeof GamePhase)[keyof typeof GamePhase];
