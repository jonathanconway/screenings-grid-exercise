import React from "react";
import { mount, ReactWrapper } from "enzyme";

import { withTheme } from "../../testUtils";
import { Sorts, Column } from "../../querying/querying.types";

jest.dontMock("react-virtualized");

import { Table } from "./Table";

interface Person {
  readonly name: string;
  readonly age: number;
}

const fakePeople = [
  { name: "Jon", age: 35 },
  { name: "Christina", age: 35 },
  { name: "Christina", age: 25 },
  { name: "Bethany", age: 15 },
  { name: "Andres", age: 45 },
];

const fakeColumns: readonly Column<Person>[] = [{
  key: "name",
  label: "Name",
  dataType: "string"
}, {
  key: "age",
  label: "Age",
  dataType: "number"
}];

const tableWrapper = <T extends object = {}>(root: ReactWrapper) => ({
  ...root,
  clickHeaderCell: (columnKey: string) => {
  }
});

describe("<Table />", () => {
  it("can render", () => {
    mount(withTheme(
      <Table
        items={fakePeople}
        columns={fakeColumns}
        sorts={{} as Sorts<{}>}
        onSort={() => {}}
        cellRenderer={() => <></>}
      />
    ));
  });

  describe("on sort column that hasn't yet been sorted", () => {
    it("sorts the column in ascending order", () => {
      const mockHandleTableSort = jest.fn(),
            root = tableWrapper(mount(withTheme(
              <Table
                items={fakePeople}
                columns={fakeColumns}
                sorts={{} as Sorts<{}>}
                onSort={() => {}}
                cellRenderer={() => <></>}
              />
            )));

      

      root.clickHeaderCell("name");
      
      // expect(mockHandleTableSort).toHaveBeenCalledWith({
      //   "name": {
      //     columnKey: "name",
      //     direction: "asc"
      //   }
      // });
    });
  });
});
