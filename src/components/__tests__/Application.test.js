import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  ByLabelText,
  getByPlaceholderText,
  getByText,
  ByDisplayValue,
  getByAltText,
  queryByAltText,
  queryByText,
  ByTitle,
  ByRole,
  getAllByTestId,
} from "@testing-library/react";
import Application from "components/Application";
import axios from "__mocks__/axios";

afterEach(cleanup);

describe("Application", () => {

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    ); //finding the appointment

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Delete")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. render the aplication
    const { container, debug } = render(<Application />);
    //2. confirm mount with
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //3. click the edit button
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    ); //finding the appointment

    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. changes the interviewer info
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 5. changes the student info
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    // 6. saving the changes
    fireEvent.click(getByText(appointment, "Save"));

    // 7. confirm saving status
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 8. confirm update
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
  it("shows the save error when failing to save an appointment", async () => {
    // Mock a rejected promise for the axios.put method
    axios.put.mockRejectedValueOnce();
  
    // Render the Application component and get the container and debug function
    const { container, debug } = render(<Application />);
  
    // Wait for the element with the text "Archie Cohen" to be present in the container
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // Get all appointments from the container and select the first appointment
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    // Simulate a click event on the "Add" button of the appointment
    fireEvent.click(getByAltText(appointment, "Add"));
  
    // Simulate a change event on the input field with the placeholder text "enter student name"
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
  
    // Simulate a click event on the "Sylvia Palmer" button within the appointment
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    // Simulate a click event on the "Save" button within the appointment
    fireEvent.click(getByText(appointment, "Save"));
  
    // Assert that the text "Saving" is present within the appointment
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
  
    // Wait for the element with the text "could not save the appointment" to be present within the appointment
    await waitForElement(() =>
      getByText(appointment, "could not save the appointment")
    );
  });
  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    ); //finding the appointment

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Delete")).toBeInTheDocument();
    // 7. confirm error display
    await waitForElement(() =>
      getByText(appointment, "could not cancel the appointment")
    );
  });
  it("testing cancel button (personal stretch)", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    await waitForElement(() =>
      getByPlaceholderText(appointment, /enter student name/i)
    );

    fireEvent.click(getByText(appointment, "Cancel"));

    await waitForElement(() => getByAltText(appointment, "Add"));
  });
});
