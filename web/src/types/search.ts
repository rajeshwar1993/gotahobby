// types/search.ts
export type SearchFilters = {
  location: string;
  interests: string[];
  date?: "today" | "this-week" | "this-month" | "any";
  price?: "free" | "paid" | "any";
};
