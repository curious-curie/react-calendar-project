import React from 'react';
import { Route, Link } from 'react-router-dom';
import ScheduleFormContainer from './containers/ScheduleFormContainer';
import ScheduleListContainer from './containers/ScheduleListContainer';
import ScheduleDetailContainer from './containers/ScheduleDetailContainer';
import LabelFilters from './components/LabelFilters';

function App() {
  return (
    <div>
      <LabelFilters />
      <ScheduleListContainer />
      <Route path="/new" component={ScheduleFormContainer} exact={true} />
      <Route path="/:id" component={ScheduleDetailContainer} exact={true} />
    </div>
  );
}

export default App;
