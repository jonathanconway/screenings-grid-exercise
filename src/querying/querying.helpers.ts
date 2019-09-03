import { Sort, Filter } from "./querying.types";

export const sortDataObjects = <T>(dataObjects: readonly T[], sorts: readonly Sort<T>[]) =>
  [...dataObjects].sort(createComparer(sorts));

const createComparer = <T>(sorts: readonly Sort<T>[]) => (a: T, b: T): -1 | 0 | 1 => {
  if (sorts.length === 0) {
    return 0;
  }

  const firstSort = sorts[0],
        aValue = a[firstSort.columnKey],
        bValue = b[firstSort.columnKey];

  if (aValue === null && bValue === null) {
    return 0;
  }
  else if (aValue !== null && (bValue === null || aValue > bValue)) {
    return firstSort.direction === "asc" ? 1 : -1;
  }
  else if (bValue !== null && (aValue === null || aValue < bValue)) {
    return firstSort.direction === "asc" ? -1 : 1;
  }
  else if (aValue === bValue && sorts.length > 1) {
    return createComparer(sorts.slice(1))(a, b);
  }

  return 0;
};

export const filterDataObjects = <T>(dataObjects: readonly T[], filters: readonly Filter<T>[]) => {
  for (const filter of filters) {
    dataObjects = dataObjects.filter(item => {
      const itemFieldValue = ((item[filter.columnKey] as unknown as string) || "").toString().toLowerCase(),
            filterValue = ((filter.value as unknown as string) || "").toString().toLowerCase();

      // We consider empty (blank string) to be equivalent to 'all'.
      if (filterValue === "") {
        return true;
      }

      switch (filter.operator) {
        case "=":
          return itemFieldValue === filterValue;
        case "!=":
          return itemFieldValue !== filterValue;
        case "⊂":
          return itemFieldValue.includes(filterValue);
      }

      return true;
    });
  }
  return dataObjects;
};