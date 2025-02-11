import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import Greet from "../../src/components/Greet";
import "@testing-library/jest-dom/vitest";

describe("Greet", () => {
  it("should render hello when name is present", () => {
    render(<Greet name="Piumika" />);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument(); // first assertion to check theres a heading
    expect(heading).toHaveTextContent(/piumika/i); // second assertion to test the content
  });

  it("should render login button when name is not provided", () => {
    render(<Greet />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument(); // first assertion to check theres a button
    expect(button).toHaveTextContent(/login/i); // second assertion to test the content
  });
});
