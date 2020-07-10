import React from 'react';
import { Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import ScheduleFormContainer from './containers/ScheduleFormContainer';
import ScheduleListContainer from './containers/ScheduleListContainer';
import ScheduleDetailContainer from './containers/ScheduleDetailContainer';
import ScheduleCalendar from './components/Calendar/ScheduleCalendar';
import ListUsingCal from './components/List/ListUsingCal';
import SearchSchedule from './components/Search/SearchSchedule';
import Header from './components/Header';
const GlobalStyle = createGlobalStyle`
  a {
    color: black;
    text-decoration: none !important;
  }
`;

function App() {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Route path="/" component={ScheduleCalendar} exact={true} />
      <Route path="/list" component={ScheduleListContainer} />
      <Route path="/new" component={ScheduleFormContainer} />
      <Route path="/:id" component={ScheduleDetailContainer} exact={true} />
      <Route path="/search" component={SearchSchedule} exact={true} />
      <Route path="/calist" component={ListUsingCal} exact={true} />
    </div>
  );
}

export default App;
