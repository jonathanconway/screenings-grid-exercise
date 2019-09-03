import { exclude } from "./utils";

describe("utils", () => {
  describe("exclude", () => {
    it("excludes the specified field from the object", () => {
      const result = exclude({ name: "Jon", age: 35, location: "London" }, "location");
      expect(result).toEqual({ name: "Jon", age: 35 });
    });
  });
});