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
    // Render the Application
    const { getByText } = render(<Application />);

    // Wait until Monday is displayed
    await waitForElement(() => getByText("Monday"));

    // Click Tuesday
    fireEvent.click(getByText("Tuesday"));

    // Observe that the expected Fixture is displayed
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // Render the Application.
    const { container } = render(<Application />);

    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Get the first empty appointment
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));

    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    // Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // Render the Application.
    const { container } = render(<Application />);

    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Click the "Delete" button on the booked appointment.
    fireEvent.click(getByAltText(container, "Delete"));

    // Check that the confirmation message is shown.
    await waitForElement(() => getByText(container, "Confirm"));
    expect(getByText(container, "CONFIRM")).toBeInTheDocument();

    // Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(container, "Confirm"));

    // Check that the element with the text "DELETING" is displayed.
    expect(getByText(container, "DELETING")).toBeInTheDocument();

    // Wait until the element with the text "DELETING" button is removed.
    await waitForElementToBeRemoved(() => getByText(container, "DELETING"));

    // Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // Render the Application.
    const { container } = render(<Application />);

    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Click the "Edit" button on the booked appointment.
    fireEvent.click(getByAltText(container, "Edit"));

    // Check that "Archie Cohen" currently is the input value
    fireEvent.change(getByTestId(container, "student-name-input"), {
      target: { value: "Frank Rose" }
    });

    // Click the "Save" button on the confirmation.
    fireEvent.click(getByText(container, "Save"));

    // Check that the element with the text "SAVING" is displayed.
    expect(getByText(container, "SAVING")).toBeInTheDocument();

    // Wait until the element with the text "DELETING" button is removed.
    await waitForElementToBeRemoved(() => getByText(container, "SAVING"));

    // See if the name is Frank now.
    expect(getByText(container, "Frank Rose")).toBeInTheDocument();

    // Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    // Render the Application.
    const { container } = render(<Application />);

    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Get the first empty appointment
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));

    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    await waitForElement(() =>
      getByText(container, "Could not save appointment.")
    );
  });

  it("shows the delete error when failing to delete an appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    // Render the Application.
    const { container } = render(<Application />);

    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Click the "Delete" button on the booked appointment.
    fireEvent.click(getByAltText(container, "Delete"));

    // Check that the confirmation message is shown.
    await waitForElement(() => getByText(container, "Confirm"));
    expect(getByText(container, "CONFIRM")).toBeInTheDocument();

    // Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(container, "Confirm"));

    // Check that the element with the text "DELETING" is displayed.

    expect(getByText(container, "DELETING")).toBeInTheDocument();
    await waitForElement(() =>
      getByText(container, "Could not delete appointment.")
    );
  });
});
