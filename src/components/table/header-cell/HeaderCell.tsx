import React from "react";

import { Column, Sort } from "../../../querying/querying.types";
import { StyledHeaderCell, Label, SortButton } from "./HeaderCell.styles";
import { IconButton } from "../../icon-button/IconButton";

interface HeaderCellProps<T> {
  readonly column: Column<T>;
  readonly sort?: Sort<T>;
}

export const HeaderCell = <T extends object = {}>(props: HeaderCellProps<T>) => {
  const icon = props.sort ? props.sort.direction === "asc" ? "down" : "up" : "down",
        text = props.sort ? props.sort.direction === "asc" ? "Sorted ascending" : "Sorted descending" : "Not sorted",
        className = !props.sort ? "hint" : "";

  return (
    <StyledHeaderCell>
      <Label title={props.column.description}>{props.column.label}</Label>

      <SortButton>
        <IconButton size="small" className={className} icon={icon}>{text}</IconButton>
      </SortButton>
    </StyledHeaderCell>
  );
};
