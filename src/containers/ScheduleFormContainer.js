import React from 'react';
import { useDispatch } from 'react-redux';
import ScheduleForm from '@Components/ScheduleForm';
import { createSchedule } from '../modules/schedules';

export default function ScheduleFormContainer() {
  const dispatch = useDispatch();

  const handleSubmit = (schedule) => {
    dispatch(createSchedule(schedule));
  };
  return (
    <div>
      <ScheduleForm handleSubmit={handleSubmit} />
    </div>
  );
}
