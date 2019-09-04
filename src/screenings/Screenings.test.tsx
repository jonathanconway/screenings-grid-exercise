import React from "react";
import { Action } from "redux";
import { mount } from "enzyme";

import fakeScreeningsResponse from "../data/screenings.json";
import { withStore, withTheme } from "../testUtils";
import { Screenings } from "./Screenings";
import { Screening } from "./Screenings.types";
import { Filter, Sorts, Sort } from "../querying/querying.types";
import { reducer, setFilters, LoadScreeningsSuccessAction, setSorts, State, makeSelectSortedFilteredScreenings } from "./Screenings.redux";

const blankState: State = {
  isLoading: false,
  screenings: [],
  filters: [],
  sorts: {}
};

describe("<Screenings />", () => {
  jest.mock("../components/table/Table", () => ({ Table: () => <></> }));
  
  const createMockReducer = (initialState: State) => jest.fn((state: State = initialState, action: Action) => state);

  it("can render", () => {
    mount(withStore(createMockReducer(blankState), withTheme(<Screenings />)));
  });
});

describe("reducer", () => {
  describe("LOAD_SCREENINGS", () => {
    it("sets isLoading to true", () => {
      const action: Action = { type: "LOAD_SCREENINGS" };

      const state = reducer(undefined, action);

      expect(state.isLoading).toBeTruthy();
    });
  });

  describe("LOAD_SCREENINGS_SUCCESS", () => {
    it("sets isLoading to false", () => {
      const screenings = [] as readonly Screening[],
            action: LoadScreeningsSuccessAction = { type: "LOAD_SCREENINGS_SUCCESS", screenings };

      const state = reducer(undefined, action);

      expect(state.screenings).toEqual(screenings);
    });
  });

  describe("LOAD_SCREENINGS_FAILURE", () => {
    it("sets isLoading to false", () => {
      const action: Action = { type: "LOAD_SCREENINGS_FAILURE" };

      const state = reducer(undefined, action);

      expect(state.screenings).toEqual([]);
    });
  });

  describe("SET_FILTERS", () => {
    it("sets filters", () => {
      const filters: readonly Filter<Screening>[] = [{ columnKey: "name", operator: "=", value: "" }],
            action: Action = setFilters(filters);

      const state = reducer(undefined, action);

      expect(state.filters).toEqual(filters);
    });
  });

  describe("SET_SORTS", () => {
    it("sets sorts", () => {
      const sorts: Sorts<Screening> = { "name": { columnKey: "name", direction: "asc" } },
            action: Action = setSorts(sorts);

      const state = reducer(undefined, action);

      expect(state.sorts).toEqual(sorts);
    });
  });
});

describe("selectors", () => {
  const fakeScreenings = fakeScreeningsResponse.results as readonly Screening[],
        fakeSorts: readonly Sort<Screening>[] = [{ columnKey: "name", direction: "desc" }],
        fakeSortsMap: Sorts<Screening> = { "name": fakeSorts[0] },
        fakeFilters: readonly Filter<Screening>[] = [{ columnKey: "name", operator: "⊂", value: "ru" }];

  describe("makeSelectSortedFilteredScreenings", () => {
    it("filters and sorts", () => {
      const selectSortedFilteredScreenings = makeSelectSortedFilteredScreenings(),
            fakeState = {
              ...blankState,
              sorts: fakeSortsMap,
              filters: fakeFilters,
              screenings: fakeScreenings
            },
            screenings = selectSortedFilteredScreenings(fakeState);
      
      expect(screenings.map(s => s.name)).toEqual([
        "Shruthi Mukunda Screening Profile",
        "Shruthi Mukunda Screening Profile",
        "Shruthi Mukunda Screening Profile",
        "Shruthi Mukunda Screening Profile",
        "Shruthi Mukunda Screening Profile",
        "Shruthi Mukunda Screening Profile",
        "Shruthi Mukunda Screening Profile",
        "Arundhati Bhattacharya  Screening Profile",
        "Arundhati Bhattacharya  Screening Profile",
        "Arundhati Bhattacharya  Screening Profile",
      ]);
    });
  });
});
