import { sortDataObjects, filterDataObjects } from "./querying.helpers";
import { Sort, Filter } from "./querying.types";

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

describe("helpers", () => {
  describe("sortDataObjects", () => {
    describe("with empty sorts", () => {
      it("doesn't sort", () => {
        const sorts: readonly Sort<Person>[] = [];

        const results = sortDataObjects(fakePeople, sorts);

        expect(results.map(r => r.name)).toEqual([
          "Jon",
          "Christina",
          "Christina",
          "Bethany",
          "Andres",
        ]);
      });
    });

    describe("sorting by a single field", () => {
      describe("ascending", () => {
        it("sorts correctly", () => {
          const sorts: readonly Sort<Person>[] = [{ columnKey: "name", direction: "asc" }];

          const results = sortDataObjects(fakePeople, sorts);

          expect(results.map(r => r.name)).toEqual([
            "Andres",
            "Bethany",
            "Christina",
            "Christina",
            "Jon",
          ]);
        });
      });

      describe("descending", () => {
        it("sorts correctly", () => {
          const sorts: readonly Sort<Person>[] = [{ columnKey: "name", direction: "desc" }];

          const results = sortDataObjects(fakePeople, sorts);

          expect(results.map(r => r.name)).toEqual([
            "Jon",
            "Christina",
            "Christina",
            "Bethany",
            "Andres",
          ]);
        });
      });
    });

    describe("sorting by multiple fields", () => {
      describe("ascending", () => {
        it("sorts correctly", () => {
          const sorts: readonly Sort<Person>[] = [
            { columnKey: "name", direction: "asc" },
            { columnKey: "age", direction: "asc" }
          ];

          const results = sortDataObjects(fakePeople, sorts);

          expect(results.map(r => [ r.name, r.age ])).toEqual([
            ["Andres", 45 ],
            ["Bethany", 15 ],
            ["Christina", 25],
            ["Christina", 35],
            ["Jon", 35],
          ]);
        });
      });

      describe("one descending", () => {
        it("sorts correctly", () => {
          const sorts: readonly Sort<Person>[] = [
            { columnKey: "name", direction: "asc" },
            { columnKey: "age", direction: "desc" }
          ];

          const results = sortDataObjects(fakePeople, sorts);

          expect(results.map(r => [ r.name, r.age ])).toEqual([
            ["Andres", 45 ],
            ["Bethany", 15 ],
            ["Christina", 35],
            ["Christina", 25],
            ["Jon", 35],
          ]);
        });
      });

      describe("both descending", () => {
        it("sorts correctly", () => {
          const sorts: readonly Sort<Person>[] = [
            { columnKey: "name", direction: "desc" },
            { columnKey: "age", direction: "desc" }
          ];

          const results = sortDataObjects(fakePeople, sorts);

          expect(results.map(r => [ r.name, r.age ])).toEqual([
            ["Jon", 35],
            ["Christina", 35],
            ["Christina", 25],
            ["Bethany", 15 ],
            ["Andres", 45 ]
          ]);
        });
      });
    });
  });

  describe("filterDataObjects", () => {
    describe("filtering by a single field", () => {
      describe("with an = operator", () => {
        it("filters correctly", () => {
          const filters: readonly Filter<Person>[] = [
            { columnKey: "name", operator: "=", value: "Christina" }
          ];

          const results = filterDataObjects(fakePeople, filters);

          expect(results.map(r => r.name)).toEqual([
            "Christina",
            "Christina",
          ]);
        });
      });

      describe("with a != operator", () => {
        it("filters correctly", () => {
          const filters: readonly Filter<Person>[] = [
            { columnKey: "name", operator: "!=", value: "Christina" }
          ];

          const results = filterDataObjects(fakePeople, filters);

          expect(results.map(r => r.name)).toEqual([
            "Jon",
            "Bethany",
            "Andres",
          ]);
        });
      });

      describe("with a ⊂ operator", () => {
        it("filters correctly", () => {
          const filters: readonly Filter<Person>[] = [
            { columnKey: "name", operator: "⊂", value: "Chr" }
          ];

          const results = filterDataObjects(fakePeople, filters);

          expect(results.map(r => r.name)).toEqual([
            "Christina",
            "Christina",
          ]);
        });
      });

      describe("with differently cased items", () => {
        it("filters correctly", () => {
          const filters: readonly Filter<Person>[] = [
            { columnKey: "name", operator: "=", value: "christina" }
          ];

          const results = filterDataObjects(fakePeople, filters);

          expect(results.map(r => r.name)).toEqual([
            "Christina",
            "Christina",
          ]);
        });
      });

      describe("with an empty value", () => {
        it("doesn't filter", () => {
          const filters: readonly Filter<Person>[] = [
            { columnKey: "name", operator: "=", value: "" }
          ];

          const results = filterDataObjects(fakePeople, filters);

          expect(results.map(r => r.name)).toEqual([
            "Jon",
            "Christina",
            "Christina",
            "Bethany",
            "Andres",
          ]);
        });
      });
    });

    describe("filtering by multiple fields", () => {
      it("filters correctly", () => {
        const filters: readonly Filter<Person>[] = [
          { columnKey: "name", operator: "=", value: "Christina" },
          { columnKey: "age", operator: "=", value: 35 },
        ];

        const results = filterDataObjects(fakePeople, filters);

        expect(results.map(r => [ r.name, r.age ])).toEqual([
          [ "Christina", 35 ]
        ])
      });
    });
  });
});
