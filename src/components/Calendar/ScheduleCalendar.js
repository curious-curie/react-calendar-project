import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { format, parse, startOfWeek, getDay, isAfter } from 'date-fns';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { getFilteredSchedules } from '@/selectors';
import LabelFilters from '../Label/LabelFilters';
import './cal.css';
import { updateRepeatEnd } from '@/modules/schedules';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const formats = {
  weekdayFormat: (date, culture, localizer) => localizer.format(date, 'eee', culture),
};

function ScheduleCalendar({ history }) {
  const filteredSchedules = useSelector((state) => getFilteredSchedules(state));
  const { repeatEnd } = useSelector((state) => state.schedules);
  const defaultColor = '#62efd3';

  const dispatch = useDispatch();

  const eventStyle = (event) => {
    const style = {
      backgroundColor: event.label.color || defaultColor,
    };
    return { style };
  };

  const onSelectEvent = (e) => {
    const pathId = e.id.toString().split('-')[0];
    history.push(`/${pathId}`);
  };

  const onRangeChange = (e) => {
    if (isAfter(e.end, repeatEnd)) {
      dispatch(updateRepeatEnd());
    }
  };

  return (
    <div>
      <LabelFilters />
      <Calendar
        defaultDate={new Date()}
        localizer={localizer}
        events={filteredSchedules}
        formats={formats}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={onSelectEvent}
        onRangeChange={onRangeChange}
        views={{ month: true }}
        popup
        eventPropGetter={eventStyle}
      />
    </div>
  );
}

export default withRouter(ScheduleCalendar);
