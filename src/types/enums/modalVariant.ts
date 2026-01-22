export const ModalVariant = {
  Default: 'default',
  Success: 'success',
  Error: 'error',
  Round: 'round',
} as const;

export type ModalVariant = (typeof ModalVariant)[keyof typeof ModalVariant];
