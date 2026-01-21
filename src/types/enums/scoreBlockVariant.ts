export const ScoreBlockVariant = {
  Default: 'default',
  Player: 'player',
  Computer: 'computer',
} as const;

export type ScoreBlockVariant = (typeof ScoreBlockVariant)[keyof typeof ScoreBlockVariant];
