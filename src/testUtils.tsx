import React, { ReactChild } from "react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, Action, Reducer } from "redux";
import thunkMiddleware from "redux-thunk";

import { theme } from "./theme";

export const withTheme = (node: ReactChild) => (
  <ThemeProvider theme={theme}>
    {node}
  </ThemeProvider>
);

export const withStore = <TState extends object = {}>(
  reducer: (state: TState | undefined, action: Action) => TState,
  node: ReactChild,
) => {
  const store = createStore(reducer, applyMiddleware(thunkMiddleware));
  return (
    <Provider store={store}>
      {node}
    </Provider>
  );
}