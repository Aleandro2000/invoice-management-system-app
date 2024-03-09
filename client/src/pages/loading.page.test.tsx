import React from "react";
import { render } from "@testing-library/react";
import { describe, expect } from "@jest/globals";
import LoadingPage from "./loading.page";

describe("LoadingPage", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<LoadingPage />);
    const componentElement = getByTestId("loading");
    expect(componentElement).toBeDefined();
  });
});
