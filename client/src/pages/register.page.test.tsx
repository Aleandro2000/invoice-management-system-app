import React from "react";
import { render } from "@testing-library/react";
import { describe, expect } from "@jest/globals";
import RegisterPage from "./register.page";

describe("RegisterPage", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<RegisterPage />);
    const componentElement = getByTestId("register");
    expect(componentElement).toBeDefined();
  });
});
