import React, { ReactChild } from "react";
import * as RV from "react-virtualized";

import { Container, rowHeight, Cell, NoItemsMessage } from "./Table.styles";
import { Column, Sorts } from "../../querying/querying.types";
import { HeaderCell } from "./header-cell/HeaderCell";
import { exclude } from "../../utils";

export interface TableProps<T> {
  readonly items: readonly T[];
  readonly columns: readonly Column<T>[];
  readonly sorts: Sorts<T>;
  readonly onSort: (newSorts: Sorts<T>) => void;
  readonly cellRenderer: (data: T[keyof T], item: T, column: Column<T>) => ReactChild;
}

const toggleSort = <T extends object = {}>(columnKey: keyof T, props: TableProps<T>) => {
  if (props.sorts[columnKey]) {
    if (props.sorts[columnKey]!.direction === "asc") {
      return props.onSort({
        ...props.sorts,
        [columnKey]: {
          ...props.sorts[columnKey],
          direction: "desc"
        }
      });
    } else {
      return props.onSort(exclude<Sorts<T>>(props.sorts, columnKey));
    }
  } else {
    return props.onSort({
      ...props.sorts,
      [columnKey]: {
        columnKey,
        direction: "asc"
      }
    });
  }
};

const fixedColumnCount = 2,
      fixedRowCount = 1;

export const Table = <T extends object = {}>(props: TableProps<T>) => (
  <Container>
    <RV.AutoSizer>
      {size => // AutoSizer is used to make the MultiGrid take up all available space
        <RV.MultiGrid
          width={size.width}
          height={size.height}

          headerHeight={rowHeight}
          rowHeight={rowHeight}
          rowCount={props.items.length + 1}

          columnWidth={(info) => props.columns[info.index].width || 50}
          columnCount={props.columns.length}

          fixedColumnCount={fixedColumnCount}
          fixedRowCount={fixedRowCount}

          cellRenderer={(cellRenderProps) => {
            const column = props.columns[cellRenderProps.columnIndex],
                  row = props.items[cellRenderProps.rowIndex - 1];

            return (
              <Cell
                key={cellRenderProps.key}
                style={cellRenderProps.style}
                isLastRow={cellRenderProps.rowIndex === props.items.length}
                isFrozenColumn={cellRenderProps.columnIndex < fixedColumnCount && cellRenderProps.rowIndex > 0}
                isFrozenRow={cellRenderProps.rowIndex < fixedRowCount}
                title={cellRenderProps.rowIndex === 0 ? column.description : undefined}
                onClick={() => cellRenderProps.rowIndex === 0 && toggleSort(column.key, props)}>
                {cellRenderProps.rowIndex === 0
                  ? // Header cell
                    <HeaderCell
                      column={column}
                      sort={props.sorts[column.key]}
                    />
                  : // Body cell
                    props.cellRenderer(
                      row[column.key],
                      row,
                      column
                    )}
              </Cell>
            );
          }}>
        </RV.MultiGrid>
      }
    </RV.AutoSizer>
    {props.items.length === 0 && <NoItemsMessage>No Results</NoItemsMessage>}
  </Container>
);