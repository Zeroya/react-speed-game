export const ShapeType = {
  Square: 'square',
  Triangle: 'triangle',
  Diamond: 'diamond',
  Cross: 'cross',
  Plus: 'plus',
  Hexagon: 'hexagon',
} as const;

export type ShapeType = (typeof ShapeType)[keyof typeof ShapeType];
