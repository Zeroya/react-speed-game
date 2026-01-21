export const GameDifficulty = {
  Easy: 'easy',
  Medium: 'medium',
  Hard: 'hard',
  Custom: 'custom',
} as const;

export type GameDifficulty = (typeof GameDifficulty)[keyof typeof GameDifficulty];

