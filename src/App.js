import React from 'react';
import { Route } from 'react-router-dom';
import ScheduleFormContainer from './containers/ScheduleFormContainer';
import ScheduleListContainer from './containers/ScheduleListContainer';
import ScheduleDetailContainer from './containers/ScheduleDetailContainer';
import ScheduleCalendar from './components/ScheduleCalendar';
import ListUsingCal from './components/ListUsingCal';

function App() {
  return (
    <div>
      <Route path="/" component={ScheduleCalendar} exact={true} />
      <Route path="/list" component={ScheduleListContainer} />
      <Route path="/new" component={ScheduleFormContainer} />
      <Route path="/:id" component={ScheduleDetailContainer} exact={true} />
      <Route path="/calist" component={ListUsingCal} exact={true} />
    </div>
  );
}

export default App;
