import React from "react";

import { Filter, Operator, Column } from "../../querying/querying.types";
import { Container, Filter as StyledFilter, FilterName, FilterOperator, FilterValue,
  FilterValueInput, FilterFieldSelect, FilterOperatorSelect, FilterValueSelect, AddFilterButton, DeleteFilterButton } from "./FilterBuilder.styles";
import { IconButton } from "../icon-button/IconButton";

interface FilterBuilderProps<T> {
  readonly filters: readonly Filter<T>[];
  readonly fields: readonly Column<T>[];
  readonly onFiltersChange: (newFilters: readonly Filter<T>[]) => void;
}

const operators: readonly Operator[] = ["=", "!=", "⊂"];

export const FilterBuilder = <T extends object = {}>(props: FilterBuilderProps<T>) => {

  const fieldsMap: { [K in keyof T]?: Column<T> } =
    props.fields.reduce((map, field) => ({ ...map, [field.key]: field }), {});

  const handleDeleteFilter = (filterToDelete: Filter<T>) => {
          const newFilters = props.filters.filter(filter => filter !== filterToDelete);
          props.onFiltersChange(newFilters);
        },

        handleAddFilter = () => {
          const newFilter = { columnKey: props.fields[0].key, operator: "=", value: "" },
                newFilters = [
                  ...props.filters,
                  newFilter
                ] as readonly Filter<T>[];
          props.onFiltersChange(newFilters);
        },
        
        handleChangeFilterField = (filterToChange: Filter<T>, newColumnKey: keyof T) => {
          const newFilters = props.filters.map(filter =>
              filter === filterToChange
                ? {
                  ...filter,
                  columnKey: newColumnKey
                }
                : filter);
          props.onFiltersChange(newFilters);
        },
        
        handleChangeFilterOperator = (filterToChange: Filter<T>, newOperator: Operator) => {
          const newFilters = props.filters.map(filter =>
              filter === filterToChange
                ? {
                  ...filter,
                  operator: newOperator
                }
                : filter);
          props.onFiltersChange(newFilters);
        },
        
        handleChangeFilterValue = (filterToChange: Filter<T>, newValue: string) => {
          const newFilters = props.filters.map(filter =>
              filter === filterToChange
                ? {
                  ...filter,
                  value: newValue as unknown as typeof filter.value
                }
                : filter);
          props.onFiltersChange(newFilters);
        };

  return (
    <Container>
      {props.filters.map((filter, filterIndex) => {
        const field = fieldsMap[filter.columnKey] as Column<T>;
        return <StyledFilter key={filterIndex}>
          {true
            ? <>
                <FilterFieldSelect
                  value={filter.columnKey.toString()}
                  options={props.fields.map(f => ({ value: f.key.toString(), label: f.label }))}
                  onChange={(value) => handleChangeFilterField(filter, value as keyof T)}
                />

                <FilterOperatorSelect
                  value={filter.operator}
                  options={operators.map(o => ({ value: o, label: o }))}
                  onChange={(value) => handleChangeFilterOperator(filter, value as Operator)}
                />

                {!(field && field.options)
                  ? <FilterValueInput
                      value={filter.value as unknown as string}
                      onInput={(value) => handleChangeFilterValue(filter, value)} />
                  : <FilterValueSelect
                      value={filter.value as unknown as string}
                      options={[
                        { value: "", label: "(any)" },
                        ...(field.options.map(o => ({ value: o.value as unknown as string, label: o.label })))
                      ]}
                      onChange={(value) => handleChangeFilterValue(filter, value)} />}
              </>
            : <>
                <FilterName>{filter.columnKey}</FilterName>
                <FilterOperator>{filter.operator}</FilterOperator>
                <FilterValue>{filter.value}</FilterValue>
              </>
          }
          <DeleteFilterButton onClick={() => handleDeleteFilter(filter)}>
            <IconButton icon="delete">Delete filter</IconButton>
          </DeleteFilterButton>
        </StyledFilter>;
      })}
      <AddFilterButton onClick={handleAddFilter}>
        <IconButton icon="add">Add new filter</IconButton>
      </AddFilterButton>
    </Container>
  );
};