import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

export default function Application(props) {
  // state object 
const [state, setState] = useState({
day: "Monday",
days: [],
appointments: {},
interviewers: {},
});
// shorthand state refrence 
const { day, days, appointments, interviewers } = state;

// collecting date 
useEffect(() => {
  Promise.all([
    axios.get("/api/days"),
    axios.get("/api/appointments"),
    axios.get("/api/interviewers")
  ]).then(([daysResponse, appointmentsResponse, interviewersResponse]) => {
    setState((prev) => ({
      ...prev,
      days: [...daysResponse.data],
      appointments: { ...appointmentsResponse.data },
      interviewers: { ...interviewersResponse.data },
    }));
  });
}, []);

const setDay = (day) => {
setState((prev) => ({ ...prev, day })); // day => day: day 
};

const dailyAppointments = getAppointmentsForDay(state, day);
const interviewerArray = getInterviewersForDay(state, day);


const schedule = dailyAppointments.map((appointment) => {
const interview = getInterview(state, appointment.interview);
return (
<Appointment
     key={appointment.id}
     id={appointment.id}
     time={appointment.time}
     interview={interview}
     interviewers={interviewerArray}
   />
);
});

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
<DayList
 days={days} 
 value={day} 
 onChange={setDay} 
 />
</nav>

<img
       className="sidebar__lhl sidebar--centered"
       src="images/lhl.png"
       alt="Lighthouse Labs"
     />

</section>

<section className="schedule">
{schedule}
<Appointment 
key="last" 
time="5pm" 
/>
</section>

</main>
);
}