export const ZoomLevel = {
  Far: 'far',
  Medium: 'medium',
  Close: 'close',
} as const;

export type ZoomLevel = (typeof ZoomLevel)[keyof typeof ZoomLevel];
