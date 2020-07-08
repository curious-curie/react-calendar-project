import React from 'react';
import { Route } from 'react-router-dom';
import ScheduleFormContainer from './containers/ScheduleFormContainer';
import ScheduleListContainer from './containers/ScheduleListContainer';

function App() {
  return (
    <div>
      <ScheduleListContainer />
      <Route path='/new' component={ScheduleFormContainer} exact={true} />
    </div>
  );
}

export default App;
