import React from "react";
import { render } from "@testing-library/react";
import { describe, expect } from "@jest/globals";
import LoginPage from "./login.page";

describe("LoginPage", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<LoginPage />);
    const componentElement = getByTestId("login");
    expect(componentElement).toBeDefined();
  });
});
