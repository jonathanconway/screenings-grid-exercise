import React, { ChangeEvent } from "react";

import { StyledInput } from "./Input.styles";

export interface InputProps {
  readonly onInput: (value: string) => void;
  readonly value: string;
}

export const Input = (props: InputProps) => (
  <StyledInput
    type="text"
    value={props.value}
    onChange={(e: ChangeEvent<HTMLInputElement>) => props.onInput(e.target.value)}
  />
);