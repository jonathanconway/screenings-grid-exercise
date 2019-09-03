import React, { ChangeEvent, forwardRef, Ref } from "react";

import { StyledSelect } from "./Select.styles";

export interface Option {
  readonly value: string;
  readonly label: string;
}

export interface SelectProps {
  readonly options: readonly Option[];
  readonly onChange: (value: string) => void;
  readonly value: string;
}

export const Select = forwardRef((props: SelectProps, ref: Ref<HTMLSelectElement>) => (
  <StyledSelect
    ref={ref}
    value={props.value}
    onChange={(e: ChangeEvent<HTMLSelectElement>) => props.onChange(e.target.value)}>
    {props.options.map(option =>
      <option key={option.value} value={option.value}>{option.label}</option>
    )}
  </StyledSelect>
));