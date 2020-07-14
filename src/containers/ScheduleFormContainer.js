import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isAfter } from 'date-fns';
import ScheduleForm from '@/components/Form/ScheduleForm';
import { createSchedule, createRepeatedSchedules, createReservation, updateRepeatEnd } from '@/modules/schedules';
import { createIntervalArray } from '@/utils/dateHelpers';

function ScheduleFormContainer({ history, location }) {
  const dispatch = useDispatch();
  const scheduleCount = useSelector((state) => state.schedules.scheduleCount);
  const repeatEnd = useSelector((state) => state.schedules.repeatEnd);
  const defaultDate = new URLSearchParams(location.search).get('date');
  const { labels } = useSelector((state) => state.labels);

  const handleSubmit = useCallback((schedule) => {
    const includedDates = createIntervalArray([schedule.start, schedule.end]);
    if (isAfter(schedule.end, repeatEnd)) dispatch(updateRepeatEnd());
    if (includedDates.some((date) => scheduleCount[date] >= 100)) {
      alert('100개 이상 일정을 생성할 수 없습니다!');
    } else {
      dispatch(createSchedule(schedule));
    }
    if (schedule.repeated) {
      dispatch(createRepeatedSchedules(schedule));
    }
    history.push('/');
  }, []);

  const handleReservation = useCallback((item) => {
    dispatch(createReservation(item));
  }, []);

  return (
    <div>
      <ScheduleForm
        handleSubmit={handleSubmit}
        handleReservation={handleReservation}
        defaultLabel={labels[0]}
        defaultDate={defaultDate}
      />
    </div>
  );
}

export default withRouter(ScheduleFormContainer);
