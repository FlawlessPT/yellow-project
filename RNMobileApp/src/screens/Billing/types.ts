export type Plan = {
  name: string;
  months: Month[];
};

export type Month = { quantity: number; price: number; list: string[] };
