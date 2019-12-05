import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  getByText,
  fireEvent,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  waitForElementToBeRemoved,
  getByTestId
} from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";

beforeEach(() => {
  jest.mock("axios", () => require("../../__mocks__/axios"));
});

afterEach(cleanup);

describe("Form", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    fireEvent.click(getByAltText(container, "Delete"));

    await waitForElement(() => getByText(container, "Confirm"));
    expect(getByText(container, "CONFIRM")).toBeInTheDocument();

    fireEvent.click(getByText(container, "Confirm"));

    expect(getByText(container, "DELETING")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(container, "DELETING"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    fireEvent.click(getByAltText(container, "Edit"));

    fireEvent.change(getByTestId(container, "student-name-input"), {
      target: { value: "Frank Rose" }
    });

    fireEvent.click(getByText(container, "Save"));

    expect(getByText(container, "SAVING")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(container, "SAVING"));

    expect(getByText(container, "Frank Rose")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    await waitForElement(() =>
      getByText(container, "Could not save appointment.")
    );
  });

  it("shows the delete error when failing to delete an appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    fireEvent.click(getByAltText(container, "Delete"));

    await waitForElement(() => getByText(container, "Confirm"));
    expect(getByText(container, "CONFIRM")).toBeInTheDocument();

    fireEvent.click(getByText(container, "Confirm"));

    expect(getByText(container, "DELETING")).toBeInTheDocument();
    await waitForElement(() =>
      getByText(container, "Could not delete appointment.")
    );
  });
});
