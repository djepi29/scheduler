import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors";

export default function Application(props) {
  // State object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  // Shorthand state reference
  const { day, days, appointments, interviewers } = state;

  // Fetching data
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then(([daysResponse, appointmentsResponse, interviewersResponse]) => {
      setState((prev) => ({
        ...prev,
        days: [...daysResponse.data],
        appointments: { ...appointmentsResponse.data },
        interviewers: { ...interviewersResponse.data },
      }));
    });
  }, []);

  // Function to set the selected day
  const setDay = (day) => {
    setState((prev) => ({ ...prev, day })); // day => day: day
  };

  // Function to book an interview
  const bookInterview = async (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // Make the PUT request to update the appointment data
    try {
      const response = await axios.put(`/api/appointments/${id}`, {
        interview,
      });
      setState((prev) => ({
        ...prev,
        appointments,
      }))
      return response
    } catch (error) {
      // Handle any errors that occur during the request
      console.log(error);
    }

  };

  const cancelInterview = async (id, interview) => {
    
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };


    try {
      const response = await axios.delete(`/api/appointments/${id}`, {
        interview,
      });
      setState((prev) => ({
        ...prev,
        appointments,
      }))
      return response
    }  catch (error) {
      // Handle any errors that occur during the request
      console.log(error);
    }

  };

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
      />
    );
  });

  ///////////////////////////////////////////////////////////////////

  // rendered jsx
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
