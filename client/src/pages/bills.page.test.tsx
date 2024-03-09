import React from "react";
import { render } from "@testing-library/react";
import { describe, expect } from "@jest/globals";
import BillsPage from "./bills.page";

describe("BillsPage", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<BillsPage />);
    const componentElement = getByTestId("bills");
    expect(componentElement).toBeDefined();
  });
});
