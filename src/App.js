import React from 'react';
import { Route } from 'react-router-dom';
import ScheduleFormContainer from './containers/ScheduleFormContainer';

function App() {
  return (
    <div>
      <Route path='/new' component={ScheduleFormContainer} exact={true} />
    </div>
  );
}

export default App;
