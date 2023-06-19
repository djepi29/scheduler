import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import useApplicationData from "hooks/useApplicationData";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview, editInterview } =
    useApplicationData();

  // Shorthand state reference
  const { day, days } = state;


  // Selectors
  const dailyAppointments = getAppointmentsForDay(state, day); // Get appointments for the selected day
  const interviewerArray = getInterviewersForDay(state, day); // Get interviewers available for the selected day

  // creating appointment component array mapping jsx appointment component over appointment key array
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    // Retrieve interview data for the current appointment (if it exists)
    return (
      <Appointment
        key={appointment.id} // Unique key for each appointment component
        id={appointment.id} // Appointment ID
        time={appointment.time} // Appointment time
        interview={interview} // Interview data (if it exists)
        interviewers={interviewerArray} // Array of available interviewers for the day
        bookInterview={bookInterview} // Function to book an interview
        cancelInterview={cancelInterview} // function to cancel an interview
        editInterview={editInterview}
      />
    );
  });

  ///////////////////////////////////////////////////////////////////

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} value={day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
