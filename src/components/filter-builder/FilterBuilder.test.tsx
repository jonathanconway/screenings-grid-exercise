import React from "react";
import { mount } from "enzyme";

import { FilterBuilder } from "./FilterBuilder";
import { withTheme } from "../../testUtils";
import { Filter, Column } from "../../querying/querying.types";
import { FilterValueSelect, FilterFieldSelect, FilterOperatorSelect, DeleteFilterButton, FilterValueInput } from "./FilterBuilder.styles";

interface DummyFilter {
  readonly foo: string;
  readonly bar: string;
}

describe("<FilterBuilder />", () => {
  it("can render", () => {
    mount(withTheme(
      <FilterBuilder
        fields={[]}
        filters={[]}
        onFiltersChange={() => {}}
      />
    ));
  });

  const dummyFilters: readonly Filter<DummyFilter>[] = [
          { columnKey: "foo", operator: "=", value: "foovalue" },
          { columnKey: "bar", operator: "!=", value: "barvalue" }
        ];

  describe("on clicking the delete button on a filter", () => {
    const mockFiltersChangeHandler = jest.fn(),
          root = mount(withTheme(
            <FilterBuilder
              fields={[]}
              filters={dummyFilters}
              onFiltersChange={mockFiltersChangeHandler}
            />
          ));

    root.find(DeleteFilterButton).first().simulate("click");

    it("triggers onFiltersChange with that filter removed from the list", () => {
      expect(mockFiltersChangeHandler).toHaveBeenCalledWith(expect.not.arrayContaining([dummyFilters[0]]));
    });
  });

  describe("on selecting a field from the dropdown", () => {
    const mockFiltersChangeHandler = jest.fn(),
          root = mount(withTheme(
            <FilterBuilder
              fields={[]}
              filters={dummyFilters}
              onFiltersChange={mockFiltersChangeHandler}
            />
          ));

    root.find(FilterFieldSelect).first().simulate("change", { target: { value: "bar" } });

    it("triggers onFiltersChange with that filter's columnKey set to the selected field", () => {
      const newFilters: readonly Filter<DummyFilter>[] = mockFiltersChangeHandler.mock.calls.slice(-1)[0][0];
      expect(newFilters[0].columnKey).toEqual("bar");
    });
  });

  describe("on selecting an operator from the dropdown", () => {
    const mockFiltersChangeHandler = jest.fn(),
          root = mount(withTheme(
            <FilterBuilder
              fields={[]}
              filters={dummyFilters}
              onFiltersChange={mockFiltersChangeHandler}
            />
          ));

    root.find(FilterOperatorSelect).first().simulate("change", { target: { value: "=" } });

    it("triggers onFiltersChange with that filter's operator set to the selected operator", () => {
      const newFilters: readonly Filter<DummyFilter>[] = mockFiltersChangeHandler.mock.calls.slice(-1)[0][0];
      expect(newFilters[0].operator).toEqual("=");
    });
  });

  describe("on entering a value into the input", () => {
    const mockFiltersChangeHandler = jest.fn(),
          root = mount(withTheme(
            <FilterBuilder
              fields={[]}
              filters={dummyFilters}
              onFiltersChange={mockFiltersChangeHandler}
            />
          ));

    root.find(FilterValueInput).first().simulate("change", { target: { value: "abc" } });

    it("triggers onFiltersChange with that filter's value set to the entered value", () => {
      const newFilters: readonly Filter<DummyFilter>[] = mockFiltersChangeHandler.mock.calls.slice(-1)[0][0];
      expect(newFilters[0].value).toEqual("abc");
    });
  });

  describe("for a filter with options", () => {
    interface DummyFilterWithOption {
      readonly foo: number;
    }

    const filtersWithOption: readonly Filter<DummyFilterWithOption>[] = [{
            columnKey: "foo",
            operator: "=",
            value: undefined
          }],
          fields: readonly Column<DummyFilterWithOption>[] = [{
            key: "foo",
            dataType: "number",
            label: "Foo",
            options: [{
              label: "One",
              value: 1
            }, {
              label: "Two",
              value: 2
            }]
          }],
          mockFiltersChangeHandler = jest.fn(),
          root = mount(withTheme(
            <FilterBuilder
              fields={fields}
              filters={filtersWithOption}
              onFiltersChange={mockFiltersChangeHandler}
            />
          ));

    it("renders a dropdown of all the options", () => {
      expect(root.find(FilterValueSelect).exists()).toBeTruthy();
    });

    describe("on selecting a value from the select", () => {
      root.find(FilterValueSelect).first().simulate("change", { target: { value: 2 } });
  
      it("triggers onFiltersChange with that filter's value set to the selected value", () => {
        const newFilters: readonly Filter<DummyFilterWithOption>[] = mockFiltersChangeHandler.mock.calls.slice(-1)[0][0];
        expect(newFilters[0].value).toEqual(2);
      });
    });  
  });

});
