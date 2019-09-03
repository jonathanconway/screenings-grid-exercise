import { Dispatch } from "redux";

import { Screening } from "./Screenings.types";
import { getScreenings } from "./Screenings.http";
import { Sorts, Filter, Sort } from "../querying/querying.types";
import { sortDataObjects, filterDataObjects } from "../querying/querying.helpers";
import { exclude } from "../utils";

// Action types

const LOAD_SCREENINGS =         "LOAD_SCREENINGS";
const LOAD_SCREENINGS_SUCCESS = "LOAD_SCREENINGS_SUCCESS";
const LOAD_SCREENINGS_FAILURE = "LOAD_SCREENINGS_FAILURE";
const SET_FILTERS =             "SET_FILTERS";
const SET_SORTS =               "SET_SORTS";

// Actions

export interface LoadScreeningsAction {
  readonly type: typeof LOAD_SCREENINGS;
}

export interface LoadScreeningsSuccessAction {
  readonly type: typeof LOAD_SCREENINGS_SUCCESS;
  readonly screenings: readonly Screening[];
}

export interface LoadScreeningsFailureAction {
  readonly type: typeof LOAD_SCREENINGS_FAILURE;
}

export interface SetFiltersAction {
  readonly type: typeof SET_FILTERS;
  readonly filters: readonly Filter<Screening>[];
}

export interface SetSortsAction {
  readonly type: typeof SET_SORTS;
  readonly sorts: Sorts<Screening>;
}

// Action creators

export const loadScreenings = () =>
  (dispatch: Dispatch<Action>) => {
    dispatch({ type: LOAD_SCREENINGS });
    return getScreenings()
      .then((screenings) => dispatch(loadScreeningsSuccess(screenings) as Action))
      .catch(() => dispatch(loadScreeningsFailure() as Action));
  };

export const loadScreeningsSuccess = (screenings: readonly Screening[]) =>
  ({ type: "LOAD_SCREENINGS_SUCCESS", screenings });


export const loadScreeningsFailure = () =>
  ({ type: "LOAD_SCREENINGS_FAILURE" });


export const setFilters =
  (filters: readonly Filter<Screening>[]) =>
    ({ type: "SET_FILTERS", filters });


export const setSorts =
  (sorts: Sorts<Screening>) =>
    ({ type: "SET_SORTS", sorts });

export const toggleSort = (columnKey: keyof Screening, sorts: Sorts<Screening>) => {
  if (sorts[columnKey]) {
    if (sorts[columnKey]!.direction === "asc") {
      return setSorts({
        ...sorts,
        [columnKey]: {
          ...sorts[columnKey],
          direction: "desc"
        }
      });
    } else {
      return setSorts(exclude(sorts, columnKey));
    }
  } else {
    setSorts({
      ...sorts,
      [columnKey]: {
        columnKey,
        direction: "asc"
      }
    });
  }
};

// Action type

type Action
  = LoadScreeningsAction
  | LoadScreeningsSuccessAction
  | LoadScreeningsFailureAction
  | SetFiltersAction
  | SetSortsAction;

// State

export interface State {
  readonly isLoading: boolean;
  readonly screenings: readonly Screening[];
  readonly filters: readonly Filter<Screening>[];
  readonly sorts: Sorts<Screening>;
}

// Default initial state

const initialState = {
  isLoading: true,
  screenings: [],
  filters: [{
    columnKey: "name",
    operator: "⊂",
    value: ""
  }, {
    columnKey: "country_check_severity",
    operator: "=",
    value: ""
  }] as readonly Filter<Screening>[],
  sorts: {}
};

// Reducer

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_SCREENINGS:
      return {
        ...state,
        isLoading: true
      };

    case LOAD_SCREENINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        screenings: action.screenings
      };
  
    case LOAD_SCREENINGS_FAILURE:
      return {
        ...state,
        isLoading: false
      };

    case SET_SORTS:
      return {
        ...state,
        sorts: action.sorts
      };

    case SET_FILTERS:
      return {
        ...state,
        filters: action.filters
      };
  }
  return state;
};

// Selectors

export const selectSortedScreenings = (state: State): State => {
  const sorts = Object.values(state.sorts).filter((x): x is Sort<Screening> => !!x),
        sortedScreenings = sortDataObjects(state.screenings, sorts);

  return {
    ...state,
    screenings: sortedScreenings
  };
};

export const selectFilteredScreenings = (state: State) => ({
  ...state,
  screenings: filterDataObjects(state.screenings, state.filters)
});

export const selectSortedFilteredScreenings = (state: State): readonly Screening[] => {
  return selectSortedScreenings(
    selectFilteredScreenings(state))
      .screenings;
}
