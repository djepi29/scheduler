import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // State object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Fetching data
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then(([daysResponse, appointmentsResponse, interviewersResponse]) => {
        setState((prev) => ({
          ...prev,
          days: [...daysResponse.data],
          appointments: { ...appointmentsResponse.data },
          interviewers: { ...interviewersResponse.data },
        }));
      })
      .catch(([daysError, appointmentsError, interviewersError]) =>
        console.log(daysError, appointmentsError, interviewersError)
      );
  }, []);

  // Function to set the selected day

  const setDay = (day) => {
    setState((prev) => ({ ...prev, day })); // day => day: day
  };

  // Function to book an interview
  const bookInterview = async (id, interview) => {
    // selecting appointment by id
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    // updating appointments state object with updated appointment by id
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        return { ...day, spots: day.spots - 1 };
      } else {
        return day;
      }
    });

    // Make the PUT request to update the appointment data
    try {
      const response = await axios.put(`/api/appointments/${id}`, {
        interview,
      });
      setState((prev) => ({
        ...prev,
        appointments,
        days,
      }));
      return response;
    } catch (error) {
      
      throw error;
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

    const days = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        return { ...day, spots: day.spots + 1 };
      } else {
        return day;
      }
    });

    try {
      const response = await axios.delete(`/api/appointments/${id}`, {
        interview,
      });
      setState((prev) => ({
        ...prev,
        appointments,
        days,
      }));
      return response;
    } catch (error) {
     
      throw error;
    }
  };

  // function to edit an interview 
  const editInterview = async (id ,interview) => {

    // selecting appointment by id
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    // updating appointments state object with updated appointment by id
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    try {
      const response = await axios.put(`/api/appointments/${id}`, {
        interview,
      });
      setState((prev) => ({
        ...prev,
        appointments,
      }));
      return response;
    } catch (error) {
      
      throw error;
    }
  }

  return { state, setDay, bookInterview, cancelInterview, editInterview };
}
