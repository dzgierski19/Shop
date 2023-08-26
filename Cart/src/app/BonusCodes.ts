export const BONUSCODES = {
  FIRST_SHOPPING: "FIRST_SHOPPING",
  SUBSCRIBING_TO_NEWSLETTER: "SUBSCRIBING_TO_NEWSLETTER",
  ROLLING_LOUD_TICKET: "ROLLING_LOUD_TICKET",
} as const;

export type BonusCodes = (typeof BONUSCODES)[keyof typeof BONUSCODES];

export const availableBonusCodes = new Map<
  BonusCodes,
  { value: number; wasUsed: boolean }
>([
  ["FIRST_SHOPPING", { value: 10, wasUsed: false }],
  ["SUBSCRIBING_TO_NEWSLETTER", { value: 20, wasUsed: false }],
  ["ROLLING_LOUD_TICKET", { value: 30, wasUsed: false }],
]);

console.log(availableBonusCodes.get("FIRST_SHOPPING"));

const a = Array.from(availableBonusCodes);

console.log(Object.values(a));
