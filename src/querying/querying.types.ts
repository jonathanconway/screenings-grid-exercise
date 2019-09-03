
export type Sorts<T> = Partial<{
  readonly [K in keyof T]: Sort<T>;
}>;

export interface Sort<T> {
  readonly columnKey: keyof T;
  readonly direction: "asc" | "desc";
}

export interface Option<T> {
  readonly label: string;
  readonly value: T;
}

export interface Filter<T> {
  readonly columnKey: keyof T;
  readonly operator: Operator;
  readonly value?: T[keyof T];
}

export type Operator
  = "="
  | "!="
  | "⊂";

export interface Column<T> {
  readonly key: keyof T;
  readonly label: string;
  readonly description?: string;
  readonly dataType: string;
  readonly width?: number;
  readonly grow?: boolean;
  readonly options?: readonly Option<T[keyof T]>[];
}