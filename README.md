# Interview Scheduler

Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database.

!["Scheduler"](https://github.com/djepi29/scheduler/blob/master/docs/onLoadView.png#:~:text=onLoadView.-,png,-public)

**_BEWARE:_ This project is for learning purposes. It is _not_ intended for use in production-grade software.**

# User Features

- Interviews can be booked between Monday and Friday.

- A user can switch between weekdays.

- A user can book an interview in an empty appointment slot.

- Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.

- A user can cancel an existing interview.

- A user can edit the details of an existing interview.

- The list of days informs the user how many slots are available for each day.

- The expected day updates the number of spots available when an interview is booked or canceled.

- A user is presented with a confirmation when they attempt to cancel an interview.

- A user is shown an error if an interview cannot be saved or deleted.

- A user is shown a status indicator while asynchronous operations are in progress.

- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).

- The application makes API requests to load and persist data. We do not lose data after a browser refresh.

## Getting Started

1. [Create] a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
3. Start the web app using the `npm start` command. The app will be served at <http://localhost:8000/>.

## Running Jest Test Framework
the app was tested using Jest Test Framework:
'npm test -- --coverage --watchAll=false ' for report.

## Running Storybook Visual Testbed
components were created using storybook:
"npm run storybook" for details

## Cypress
E2E testing covered with [cypress](https://docs.cypress.io/guides/overview/why-cypress)

## database 

4. a database is needed to run the app. you can visit [Scheduler-api](https://github.com/lighthouse-labs/scheduler-api) to help set it up  or use the samples provided in the docs folder to create your own.
