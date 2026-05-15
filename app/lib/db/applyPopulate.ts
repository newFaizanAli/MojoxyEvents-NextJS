import type { Query } from "mongoose";

export type PopulateOption = {
  path: string;
  select?: string;
  populate?: PopulateOption | PopulateOption[];
};

export function applyPopulate<T>(
  query: Query<T, any>,
  options: PopulateOption[] = [],
) {
  options.forEach((opt) => query.populate(opt));
  return query.lean().exec();
}
