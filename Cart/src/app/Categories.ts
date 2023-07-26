export const CATEGORIES = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  CHILDREN: "CHILDREN",
  ACCESSORIES: "ACCESSORIES",
  PREMIUM: "PREMIUM",
} as const;

export type Categories = (typeof CATEGORIES)[keyof typeof CATEGORIES];
