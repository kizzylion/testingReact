import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import Input from "./components/input";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

describe("App component", () => {
  it("renders h1 element", () => {
    render(<App />);

    // screen.debug();
    const h1 = screen.getByText(/Hello World/i);
    expect(h1).toBeInTheDocument();
  });

  it("renders data-testId element", () => {
    render(<App />);
    const dataTestId = screen.getByTestId("mySpan");

    expect(dataTestId).toBeInTheDocument();
  });

  it("list contains 5 animals", () => {
    render(<App />);
    //  1. The `ul` element should be in the document.
    //  2. The `ul` element should have a class named `animals`.
    //  3. There should be exactly 5 list items in the `ul` element.

    const listElement = screen.getByRole("list");
    const listItems = screen.getAllByRole("listitem");

    expect(listElement).toBeInTheDocument();
    expect(listElement).toHaveClass("animals");
    expect(listItems.length).toEqual(5);
  });
});

describe("API request loading text", () => {
  beforeEach(() => {
    // Mock the fetch API
    window.fetch = vi.fn(() => {
      const user = { name: "Jack", email: "jack@email.com" };

      return Promise.resolve({
        json: () => Promise.resolve(user),
      });
    });
  });

  afterEach(() => {
    vi.resetAllMocks(); // Clears the fetch mock after each test
  });

  it("Loading text is shown while API request is in progress", async () => {
    render(<App />);
    // screen.debug();
    const loading = screen.getByText("Loading...");
    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(loading);
  });

  it("user's name is rendered", async () => {
    render(<App />);
    const userName = await screen.findByText("Jack");
    // screen.debug();
    expect(userName).toBeInTheDocument();
  });
});

describe("API request error", async () => {
  beforeEach(() => {
    // Mock the fetch API
    window.fetch = vi.fn(() => {
      return Promise.reject({ message: "API is down" });
    });
  });

  afterEach(() => {
    vi.resetAllMocks(); // Clears the fetch mock after each test
  });

  it("error message is shown", async () => {
    render(<App />);
    const error = await screen.findByText("API is down");
    // screen.debug();
    expect(error).toBeInTheDocument();
  });
});

describe("Testing Counter Section", () => {
  beforeEach(() => {
    // Mock the fetch API for success scenario in the counter test
    window.fetch = vi.fn(() => {
      const user = { name: "Jack", email: "jack@email.com" };
      return Promise.resolve({
        json: () => Promise.resolve(user),
      });
    });
  });

  afterEach(() => {
    vi.resetAllMocks(); // Clears the fetch mock after each test
  });

  it("counter is increased on increment button click", async () => {
    const action = userEvent.setup();

    render(<App />);

    const counter = screen.getByTestId("counter");
    const incrementBtn = screen.getByText("Increment");

    await action.click(incrementBtn);
    await action.click(incrementBtn);

    expect(parseInt(counter.textContent)).toEqual(2);

    // screen.debug();
  });

  it("counter is decrease on decrement button click", async () => {
    const action = userEvent.setup();

    render(<App />);

    const counter = screen.getByTestId("counter");
    const decrementBtn = screen.getByText("Decrement");

    await action.click(decrementBtn);
    await action.click(decrementBtn);

    expect(parseInt(counter.textContent)).toEqual(-2);

    // screen.debug();
  });
});

describe("Testing input component", () => {
  // Mock the fetch API
  beforeEach(() => {
    // Mock the fetch API
    window.fetch = vi.fn(() => {
      const user = { name: "Jack", email: "jack@email.com" };
      return Promise.resolve({
        json: () => Promise.resolve(user),
      });
    });
  });

  afterEach(() => {
    vi.resetAllMocks(); // Clears the fetch mock after each test
  });

  it("input value is updated correctly", async () => {
    let action = userEvent.setup();
    render(<App />);

    const input = screen.getByRole("textbox");
    await action.type(input, "React");

    expect(input.value).toBe("React");
  });

  it("call the callback every time input value changed", async () => {
    const action = userEvent.setup();
    const handleChange = vi.fn();

    render(<Input handleChange={handleChange} inputValue="" />);

    const input = screen.getByRole("textbox");
    await action.type(input, "React");

    expect(handleChange).toHaveBeenCalledTimes(5);
  });
});
