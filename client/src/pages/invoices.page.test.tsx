import React from "react";
import { render } from "@testing-library/react";
import { describe, expect } from "@jest/globals";
import InvoicesPage from "./invoices.page";

describe("InvoicesPage", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<InvoicesPage />);
    const componentElement = getByTestId("bills");
    expect(componentElement).toBeDefined();
  });
});
