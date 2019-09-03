import React from "react";
import { Action } from "redux";
import { mount } from "enzyme";

import fakeScreenings from "../data/screenings.json";
import { withStore, withTheme } from "../testUtils";
import { Screenings } from "./Screenings";
import { reducer, setFilters, LoadScreeningsSuccessAction, setSorts, selectSortedScreenings, State } from "./Screenings.redux";
import { Screening } from "./Screenings.types";
import { Filter, Sorts } from "../querying/querying.types";

jest.mock("../components/table/Table", () => ({ Table: () => <></> }));

describe("<Screenings />", () => {
  const createMockReducer = (initialState: State) => jest.fn((state: State = initialState, action: Action) => state);

  it("can render", () => {
    const fakeState: State = {
      isLoading: false,
      screenings: [],
      filters: [],
      sorts: {}
    };
    mount(withStore(createMockReducer(fakeState), withTheme(<Screenings />)));
  });
});

describe("reducer", () => {
  describe("LOAD_SCREENINGS", () => {
    it("sets isLoading true", () => {
      const preState = {
            },
            action: Action = { type: "LOAD_SCREENINGS" };

      const state = reducer(undefined, action);

      expect(state.isLoading).toBeTruthy();
    });
  });

  describe("LOAD_SCREENINGS_SUCCESS", () => {
    it("sets isLoading false", () => {
      const screenings = fakeScreenings.results as readonly Screening[],
            action: LoadScreeningsSuccessAction = { type: "LOAD_SCREENINGS_SUCCESS", screenings };

      const state = reducer(undefined, action);

      expect(state.screenings).toEqual(screenings);
    });
  });

  describe("LOAD_SCREENINGS_FAILURE", () => {
    it("sets isLoading false", () => {
      const screenings = [fakeScreenings],
            action: Action = { type: "LOAD_SCREENINGS_FAILURE" };

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
  describe("selectSortedScreenings", () => {
    describe("sorting by a single field", () => {
      it("sorts the screenings by a single field", () => {
        const screenings = selectSortedScreenings({
              screenings: fakeScreenings.results as readonly Screening[],
              filters: [],
              sorts: { "name": { columnKey: "name", direction: "asc" } },
              isLoading: false
            }).screenings,
            
            singleFieldSortExpectedResults = [
              "Arundhati Bhattacharya  Screening Profile",
              "Arundhati Bhattacharya  Screening Profile",
              "Arundhati Bhattacharya  Screening Profile",
              "Collins obasuyi Screening Profile",
              "Collins obasuyi Screening Profile",
              "Collins obasuyi Screening Profile",
              "Collins obasuyi Screening Profile",
              "Collins obasuyi Screening Profile",
              "Collins obasuyi Screening Profile",
              "Collins obasuyi Screening Profile",
              "Collins obasuyi Screening Profile",
              "Default Screening Profile",
              "Rajendhar Gurram Screening Profile",
              "Shruthi Mukunda Screening Profile",
              "Shruthi Mukunda Screening Profile",
              "Shruthi Mukunda Screening Profile",
              "Shruthi Mukunda Screening Profile",
              "Shruthi Mukunda Screening Profile",
              "Shruthi Mukunda Screening Profile",
              "Shruthi Mukunda Screening Profile"
            ];

      expect(screenings.map(s => s.name)).toEqual(singleFieldSortExpectedResults);
    });

    it("sorts the screenings by a single field in reverse", () => {
      const screenings = selectSortedScreenings({
        screenings: fakeScreenings.results as readonly Screening[],
        filters: [],
        sorts: { "name": { columnKey: "name", direction: "desc" } },
        isLoading: false
      }).screenings;

      expect(screenings.map(s => s.name))
        .toEqual([
          "Arundhati Bhattacharya  Screening Profile",
          "Arundhati Bhattacharya  Screening Profile",
          "Arundhati Bhattacharya  Screening Profile",
          "Collins obasuyi Screening Profile",
          "Collins obasuyi Screening Profile",
          "Collins obasuyi Screening Profile",
          "Collins obasuyi Screening Profile",
          "Collins obasuyi Screening Profile",
          "Collins obasuyi Screening Profile",
          "Collins obasuyi Screening Profile",
          "Collins obasuyi Screening Profile",
          "Default Screening Profile",
          "Rajendhar Gurram Screening Profile",
          "Shruthi Mukunda Screening Profile",
          "Shruthi Mukunda Screening Profile",
          "Shruthi Mukunda Screening Profile",
          "Shruthi Mukunda Screening Profile",
          "Shruthi Mukunda Screening Profile",
          "Shruthi Mukunda Screening Profile",
          "Shruthi Mukunda Screening Profile",
        ].reverse());
    });

    it("sorts the screenings by multiple fields", () => {
      const screenings = selectSortedScreenings({
        screenings: fakeScreenings.results as readonly Screening[],
        filters: [],
        sorts: {
          "name": { columnKey: "name", direction: "asc" },
          "company_check_prior_months_severity": { columnKey: "company_check_prior_months_severity", direction: "asc" }
        },
        isLoading: false
      }).screenings;

      expect(screenings.map(s => ([ s.name, s.company_check_prior_months_severity ])))
        .toEqual([
          ["Arundhati Bhattacharya  Screening Profile","30-UNKNOWN"],
          ["Arundhati Bhattacharya  Screening Profile","30-UNKNOWN"],
          ["Arundhati Bhattacharya  Screening Profile","60-OK"],
          ["Collins obasuyi Screening Profile","30-UNKNOWN"],
          ["Collins obasuyi Screening Profile","30-UNKNOWN"],
          ["Collins obasuyi Screening Profile","30-UNKNOWN"],
          ["Collins obasuyi Screening Profile","60-OK"],
          ["Collins obasuyi Screening Profile","60-OK"],
          ["Collins obasuyi Screening Profile","70-WARNING"],
          ["Collins obasuyi Screening Profile","80-CRITICAL_ACKNOWLEDGED"],
          ["Collins obasuyi Screening Profile","80-CRITICAL_ACKNOWLEDGED"],
          ["Default Screening Profile","70-WARNING"],
          ["Rajendhar Gurram Screening Profile","70-WARNING"],
          ["Shruthi Mukunda Screening Profile","30-UNKNOWN"],
          ["Shruthi Mukunda Screening Profile","30-UNKNOWN"],
          ["Shruthi Mukunda Screening Profile","60-OK"],
          ["Shruthi Mukunda Screening Profile","80-CRITICAL_ACKNOWLEDGED"],
          ["Shruthi Mukunda Screening Profile","90-CRITICAL"],
          ["Shruthi Mukunda Screening Profile","90-CRITICAL"],
          ["Shruthi Mukunda Screening Profile","90-CRITICAL"],
        ]);
      });
    });
  });
});
