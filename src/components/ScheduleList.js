import React from 'react';
import { Link } from 'react-router-dom';

export default function ScheduleList({ dates, schedules }) {
  return (
    <div>
      {dates.map((date) => (
        <div key={date}>
          {date}
          {schedules[date] ? (
            <ul>
              {schedules[date].map((schedule) => (
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
      ))}
    </div>
  );
}
