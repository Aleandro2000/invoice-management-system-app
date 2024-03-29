import React from "react";
import { render } from "@testing-library/react";
import { describe, expect } from "@jest/globals";
import NotFoundPage from "./not-found.page";

describe("NotFoundPage", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<NotFoundPage />);
    const componentElement = getByTestId("not-found");
    expect(componentElement).toBeDefined();
  });
});
