import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMonths, isAfter } from 'date-fns';
import { updateRepeatEnd } from '@/modules/schedules';
import { createMonthArray, getSchedulesByDates, getSchedulesByMonth } from '@/utils/dateHelpers';
import { getFilteredSchedules } from '@/selectors';
import LabelFilters from '@/components/Label/LabelFilters';
import ScheduleList from '@/components/List/ScheduleList';

export default function ScheduleListContainer() {
  const [currentSchedules, setCurrentSchedules] = useState([]);
  const [listDates, setListDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dates, setDates] = useState([new Date()]);
  const [target, setTarget] = useState(null);
  const filteredSchedules = useSelector((state) => getFilteredSchedules(state));
  const { repeatEnd } = useSelector((state) => state.schedules);
  const dispatch = useDispatch();

  useEffect(() => {
    const daysOfMonth = createMonthArray(currentDate);
    setListDates([...listDates, ...daysOfMonth]);
    if (isAfter(addMonths(currentDate, 1), repeatEnd)) {
      dispatch(updateRepeatEnd());
    }
  }, [currentDate]);

  useEffect(() => {
    const newList = getSchedulesByDates(dates, filteredSchedules);
    setCurrentSchedules({ ...newList });
  }, [filteredSchedules]);
  // filter가 바뀐 경우 바뀐 스케쥴에 대해 배열 형태 변형하여 다시 set

  useEffect(() => {
    const addedList = getSchedulesByMonth(currentDate, filteredSchedules);
    setCurrentSchedules((currentSchedules) => ({ ...currentSchedules, ...addedList }));
  }, [dates]);
  // date만 추가되는 경우 추가된 날짜의 스케쥴들만 가져와서 APPEND

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

  return (
    <div>
      <LabelFilters />
      <ScheduleList dates={listDates} schedules={currentSchedules} appendList={addMonth} />
      <div ref={setTarget}></div>
    </div>
  );
}
