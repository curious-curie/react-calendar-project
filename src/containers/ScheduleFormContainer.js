import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ScheduleForm from '@Components/ScheduleForm';
import { createSchedule } from '../modules/schedules';
import { createIntervalArray } from '@/utils/dateHelpers';

function ScheduleFormContainer({ history }) {
  const dispatch = useDispatch();
  const scheduleCount = useSelector((state) => state.schedules.scheduleCount);
  const { labels } = useSelector((state) => state.labels);
  const handleSubmit = (schedule) => {
    const includedDates = createIntervalArray([schedule.start, schedule.end]);
    if (includedDates.some((date) => scheduleCount[date] >= 100)) {
      alert('100개 이상 일정을 생성할 수 없습니다!');
    } else {
      dispatch(createSchedule(schedule));
    }
    history.push('/');
  };
  return (
    <div>
      <ScheduleForm handleSubmit={handleSubmit} defaultLabel={labels[0]} />
    </div>
  );
}

export default withRouter(ScheduleFormContainer);
