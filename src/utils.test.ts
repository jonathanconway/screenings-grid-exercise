import { exclude, createBoundlessCacheDeepEqualsSelector } from "./utils";
import { memoize } from "lodash";

describe("utils", () => {
  describe("exclude", () => {
    it("excludes the specified field from the object", () => {
      const result = exclude({ name: "Jon", age: 35, location: "London" }, "location");
      expect(result).toEqual({ name: "Jon", age: 35 });
    });
  });
  
  describe("createDeepEqualSelector", () => {
    it("creates a selector which performs a deep-equals compare, rather than an object-reference compare", () => {
      const dummyState = {
        values: [1, 2, 3, 4, 5],
        index: 0
      };

      const selectValues = (state: typeof dummyState) => state.values;
      const selectIndex = (state: typeof dummyState) => state.index;

      const selectValueAtIndex = jest.fn((values: typeof dummyState.values, index: typeof dummyState.index) =>
        values[index]);

      const reSelectValueAtIndex = createBoundlessCacheDeepEqualsSelector([selectValues, selectIndex], selectValueAtIndex);

      [1, 2, 2, 2, 2, 2].forEach(index => reSelectValueAtIndex({ ... dummyState, index }));

      expect(selectValueAtIndex).toHaveBeenCalledTimes(2);
    });

    it("creates a selector with an unbounded cache", () => {
      const dummyState = {
        values: [1, 2, 3, 4, 5],
        index: 0
      };

      const selectValues = (state: typeof dummyState) => state.values;
      const selectIndex = (state: typeof dummyState) => state.index;

      const selectValueAtIndex = jest.fn((values: typeof dummyState.values, index: typeof dummyState.index) =>
        values[index]);

      const reSelectValueAtIndex = createBoundlessCacheDeepEqualsSelector([selectValues, selectIndex], selectValueAtIndex);

      for (let j = 0; j < 100; j++) {
        for (let i = 0; i < dummyState.values.length; i++) {
          reSelectValueAtIndex({ ... dummyState, index: i });
        }
      }

      expect(selectValueAtIndex).toHaveBeenCalledTimes(5);
    });
  });

  describe("lodash", () => {
    describe("memoize", () => {
      it("to memoize with a > 1 cache size", () => {
        const multiplier = (x: number) => x * x,
              mockedMultiplier = jest.fn(multiplier),
              memoizedMockedMultiplier = memoize(mockedMultiplier);

        ([1, 2, 3, 4, 1, 2, 3, 4]).forEach(memoizedMockedMultiplier);
        
        expect(mockedMultiplier).toHaveBeenCalledTimes(4);
      });
    });
  });
});
