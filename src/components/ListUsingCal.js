import React, { useEffect } from 'react';
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
  useEffect(() => {
    console.log(filteredSchedules);
  }, [filteredSchedules]);
  const defaultColor = '#62efd3';

  const eventStyle = (event) => {
    const style = {
      border: `2px solid ${event.label.color || defaultColor}`,
    };
    return { style };
  };

  const onSelectEvent = (e) => {
    console.log(e);
    // history.push(`/${e.id}`);
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
        length={60}
        style={{ height: '89vh' }}
        onSelectEvent={onSelectEvent}
        onNavigate={onSelectEvent}
        onSelectSlot={onSelectEvent}
        defaultView={'agenda'}
        views={['agenda']}
        popup
      />
    </div>
  );
}

export default withRouter(ScheduleCalendar);
