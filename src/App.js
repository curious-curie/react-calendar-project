import React from 'react';
import { Route } from 'react-router-dom';
import ScheduleFormContainer from './containers/ScheduleFormContainer';
import ScheduleListContainer from './containers/ScheduleListContainer';
import ScheduleDetailContainer from './containers/ScheduleDetailContainer';
import ScheduleCalendar from './components/Calendar/ScheduleCalendar';
import ListUsingCal from './components/List/ListUsingCal';
import SearchSchedule from './components/Search/SearchSchedule';

function App() {
  return (
    <div>
      <SearchSchedule />
      <Route path="/" component={ScheduleCalendar} exact={true} />
      <Route path="/list" component={ScheduleListContainer} />
      <Route path="/new" component={ScheduleFormContainer} />
      <Route path="/:id" component={ScheduleDetailContainer} exact={true} />
      <Route path="/calist" component={ListUsingCal} exact={true} />
    </div>
  );
}

export default App;
