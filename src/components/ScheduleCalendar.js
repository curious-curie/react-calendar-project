import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import './cal.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { getFilteredSchedules } from '@/selectors';
import LabelFilters from './LabelFilters';

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
  const defaultColor = '#62efd3';

  const eventStyle = (event) => {
    const style = {
      backgroundColor: event.label.color || defaultColor,
    };
    return { style };
  };

  const onSelectEvent = (e) => {
    history.push(`/${e.id}`);
  };

  return (
    <div>
      Calendar <Link to="/new">new</Link>
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
        views={{ month: true }}
        popup
        eventPropGetter={eventStyle}
      />
    </div>
  );
}

export default withRouter(ScheduleCalendar);