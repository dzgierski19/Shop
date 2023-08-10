export const DISCOUNTS = {
  TEN_PERCENT: 10,
  TWENTY_PERCENT: 20,
  THIRTY_PERCENT: 30,
  FORTY_PERCENT: 40,
  FIFTY_PERCENT: 50,
} as const;

export type Discounts = (typeof DISCOUNTS)[keyof typeof DISCOUNTS];
