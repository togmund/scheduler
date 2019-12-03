import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  getByText,
  prettyDOM,
  fireEvent,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText
} from "@testing-library/react";

import Application from "components/Application";

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
    console.log(prettyDOM(appointment));

    // Wait until the element with the text "Lydia Miller-Jones" is displayed.
    // Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
  });
});
