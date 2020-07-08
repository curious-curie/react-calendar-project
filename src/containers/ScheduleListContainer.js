import React, { useEffect, useState } from 'react';
import * as api from '../apis';

import { useSelector } from 'react-redux';
import { addMonths } from 'date-fns';

export default function ScheduleListContainer() {
  const [currentSchedules, setCurrentSchedules] = useState([]);
  const currentDate = new Date();

  const { schedules } = useSelector((state) => state.schedules);
  useEffect(() => {
    const newList = api.getEventsByMonth(currentDate);
    setCurrentSchedules({ ...newList });
  }, [schedules]);

  return <div></div>;
}
