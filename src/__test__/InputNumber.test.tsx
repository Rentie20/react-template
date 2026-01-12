import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { InputNumber } from "../components/form/InputNumber";

describe("InputNumber Component", () => {
  it("renders and handles input", () => {
    const onChange = vi.fn();
    const { container } = render(<InputNumber value="5" onChange={onChange} />);

    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.value).toBe("5");

    fireEvent.change(input, { target: { value: "10" } });
    expect(onChange).toHaveBeenCalledWith("10");

    fireEvent.change(input, { target: { value: "1,5" } });
    expect(onChange).toHaveBeenCalledWith("1.5");
  });
});
