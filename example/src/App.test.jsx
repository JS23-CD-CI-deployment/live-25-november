import { beforeEach, describe, expect } from "vitest";
import App from "./App";
import { waitFor, screen, render } from "@testing-library/react";

describe("App", () => {
  beforeEach(() => {
    global.localStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };
  });

  it("should fetch and display todos", async () => {
    localStorage.getItem.mockReturnValue("adwa9djaw9d912381jkd9ajd90a");

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText("Inga todos").not.toBeInTheDocument());
    });

    const listItems = screen.getAllByRole("list-item");

    expect(listItems.length).toBeGreaterThan(0);
  });
});
