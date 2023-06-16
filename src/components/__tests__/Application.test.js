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
  xit("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

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
  await waitForElement(() => getByText(container, 'Archie Cohen'));
  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, 'appointment').find(appointment => queryByText(appointment, 'Archie Cohen')); //finding the appointment

    fireEvent.click(queryByAltText(appointment, 'Delete'));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(getByText(appointment, "Confirm"));
  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Delete")).toBeInTheDocument();
  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, 'Add'));
  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find((day) =>
  queryByText(day, "Monday")
);

expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  
  // debug()
  });
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. render the aplication 
    const { container, debug } = render(<Application />);
    //2. confirm mount with 
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    //3. click the edit button
    const appointment = getAllByTestId(container, 'appointment').find(appointment => queryByText(appointment, 'Archie Cohen')); //finding the appointment

    fireEvent.click(queryByAltText(appointment, 'Edit'));

    // 4. changes the interviewer info 
    fireEvent.click(getByAltText(appointment,"Sylvia Palmer"));

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

    // debug()
  });
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

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

    await waitForElement(() => getByText(appointment, "could not save the appointment"));

    // debug()
  });
  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
     // 1. Render the Application.
     const { container, debug } = render(<Application />);
     // 2. Wait until the text "Archie Cohen" is displayed.
     await waitForElement(() => getByText(container, 'Archie Cohen'));
     // 3. Click the "Delete" button on the booked appointment.
     const appointment = getAllByTestId(container, 'appointment').find(appointment => queryByText(appointment, 'Archie Cohen')); //finding the appointment
   
       fireEvent.click(queryByAltText(appointment, 'Delete'));
   
       // 4. Check that the confirmation message is shown.
       expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
     // 5. Click the "Confirm" button on the confirmation.
     fireEvent.click(getByText(appointment, "Confirm"));
     // 6. Check that the element with the text "Deleting" is displayed.
     expect(getByText(appointment, "Delete")).toBeInTheDocument();
     // 7. confirm error display
     await waitForElement(() => getByText(appointment, "could not cancel the appointment"));

    //  debug()
  });
  it("testing cancel button (personal stretch)", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    await waitForElement(() => getByPlaceholderText(appointment,  /enter student name/i));

    fireEvent.click(getByText(appointment, "Cancel"));

    await waitForElement(() => getByAltText(appointment,"Add"));

    // debug()
  });

});
