import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addMonths } from 'date-fns';
import { createMonthArray } from '@/utils/dateHelpers';
import * as api from '@/apis';
import { getFilteredSchedules } from '@/selectors';
import LabelFilters from '../components/LabelFilters';

export default function ScheduleListContainer() {
  const [currentSchedules, setCurrentSchedules] = useState([]);
  const [listDates, setListDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dates, setDates] = useState([new Date()]);
  const [target, setTarget] = useState(null);
  const filteredSchedules = useSelector((state) => getFilteredSchedules(state));

  useEffect(() => {
    const daysOfMonth = createMonthArray(currentDate);
    setListDates([...listDates, ...daysOfMonth]);
  }, [currentDate]);

  useEffect(() => {
    const newList = api.getSchedules(dates, filteredSchedules);
    setCurrentSchedules({ ...newList });
  }, [dates, filteredSchedules]);

  //TODO: dates랑 분리해서 dates만 바꼈으면 append하는식으로 해보자ㅋ

  const addMonth = useCallback(() => {
    const newDate = addMonths(currentDate, 1);
    setCurrentDate((currentDate) => addMonths(currentDate, 1));
    setDates([...dates, newDate]);
  }, [currentDate, dates]);

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  const onIntersect = ([entry]) => {
    if (entry.isIntersecting) {
      addMonth();
    }
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
            <ul>
              <Link to={{ pathname: '/new', search: `?date=${date}` }}>
                <li>새 일정 만들기</li>
              </Link>
            </ul>
          )}
        </div>
      )),
    [currentSchedules, filteredSchedules, listDates]
  );

  return (
    <div>
      <LabelFilters />
      {scheduleList}
      <div ref={setTarget} />
    </div>
  );
}
