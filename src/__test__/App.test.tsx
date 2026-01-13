import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import App from "../App";

describe("App Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders UI and handles increment/decrement", () => {
    const { container } = render(<App />);
    expect(screen.getByText("Unit")).toBeInTheDocument();

    const input = container.querySelector(
      'input[name="input-number"]'
    ) as HTMLInputElement;

    fireEvent.click(screen.getByLabelText("increment"));
    expect(input.value).toBe("0.1");

    fireEvent.click(screen.getByLabelText("decrement"));
    expect(input.value).toBe("0");
  });

  it("validates input correctly", () => {
    const { container } = render(<App />);
    const input = container.querySelector(
      'input[name="input-number"]'
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "1,5" } });
    expect(input.value).toBe("1.5");
  });
});
