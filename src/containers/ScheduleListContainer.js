import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addMonths, startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';
import { createMonthArray } from '@/utils/dateHelpers';
import * as api from '@/apis';
import { getFilteredSchedules } from '@/selectors';
import LabelFilters from '../components/LabelFilters';

export default function ScheduleListContainer() {
  const [currentSchedules, setCurrentSchedules] = useState([]);
  const [listDates, setListDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dates, setDates] = useState([new Date()]);
  const filteredSchedules = useSelector((state) => getFilteredSchedules(state));

  useEffect(() => {
    const daysOfMonth = createMonthArray(currentDate);
    setListDates([...listDates, ...daysOfMonth]);
  }, [currentDate]);

  useEffect(() => {
    const newList = api.getSchedules(dates, filteredSchedules);
    setCurrentSchedules({ ...newList });
  }, [dates, filteredSchedules]);

  const addMonth = () => {
    const newDate = addMonths(currentDate, 1);
    setCurrentDate(newDate);
    setDates([...dates, newDate]);
  };

  const scheduleList = useMemo(
    () =>
      listDates.map((date) => (
        <div key={date}>
          {date}
          {currentSchedules[date] ? (
            <ul>
              {currentSchedules[date].map((schedule) => (
                <Link key={schedule.id} to={`/${schedule.id}`}>
                  <li>{schedule.title}</li>
                </Link>
              ))}
            </ul>
          ) : (
            'empty'
          )}
        </div>
      )),
    [currentSchedules, filteredSchedules, listDates]
  );

  return (
    <div>
      <LabelFilters />
      {scheduleList}
      <button onClick={addMonth}>+1</button>
    </div>
  );
}
