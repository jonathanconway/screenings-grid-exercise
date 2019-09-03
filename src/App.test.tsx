import React from "react";
import { mount } from "enzyme";

import { App } from "./App";
import { withStore } from "./testUtils";
import { reducer } from "./screenings/Screenings.redux";

describe("<App />", () => {
  it("can render", () => {
    mount(withStore(reducer, <App />));
  });
});
