import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScheduleForm from '@Components/ScheduleForm';
import { createSchedule } from '../modules/schedules';
import { withRouter } from 'react-router-dom';

function ScheduleFormContainer({ history }) {
  const dispatch = useDispatch();
  const { labels } = useSelector((state) => state.labels);
  const handleSubmit = (schedule) => {
    dispatch(createSchedule(schedule));
    history.push('/');
  };
  return (
    <div>
      <ScheduleForm handleSubmit={handleSubmit} defaultLabel={labels[0]} />
    </div>
  );
}

export default withRouter(ScheduleFormContainer);
