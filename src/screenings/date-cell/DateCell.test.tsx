import React from "react";
import { mount } from "enzyme";

jest.dontMock("luxon");

import { DateCell } from "./DateCell";

describe("<DateCell />", () => {
  it("can render", () => {
    mount(<DateCell date={new Date()} />);
  });

  it("formats display value and tooltip as a short date and time", () => {
    const root = mount(<DateCell date={new Date(2000, 0, 1, 11, 30, 0)} />);
    expect(root.text()).toEqual("1/01/2000 11:30");
    expect(root.exists(`span[title="${"1/01/2000 11:30"}"]`));
  });
});
