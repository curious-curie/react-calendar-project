import React from 'react';
import { Route } from 'react-router-dom';
import ScheduleFormContainer from './containers/ScheduleFormContainer';
import ScheduleListContainer from './containers/ScheduleListContainer';
import ScheduleDetailContainer from './containers/ScheduleDetailContainer';
import LabelFilters from './components/LabelFilters';
import ScheduleCalendar from './components/ScheduleCalendar';

function App() {
  return (
    <div>
      <Route path="/" component={ScheduleCalendar} exact={true} />
      <Route path="/list" component={ScheduleListContainer} />
      <Route path="/new" component={ScheduleFormContainer} exact={true} />
      <Route path="/:id" component={ScheduleDetailContainer} exact={true} />
    </div>
  );
}

export default App;
