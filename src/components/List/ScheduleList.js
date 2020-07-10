import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ScheduleListItem from './ScheduleListItem';

const DateWrapper = styled.div`
  display: flex;
  padding: 8px;
`;

const Item = styled.div`
  flex: 1;
`;

const EmptyWrapper = styled.div`
  display: flex;
  margin-bottom: 8px;
  border-bottom: 1px solid #ececec;
  padding: 0 20px 8px;
  color: #ccc;
`;

export default function ScheduleList({ dates, schedules }) {
  return (
    <div>
      {dates.map((date) => (
        <DateWrapper key={date}>
          <div>{date}</div>
          <Item>
            {schedules[date] ? (
              <div>
                {schedules[date].map((schedule) => (
                  <Link key={schedule.id} to={`/${schedule.id}`}>
                    <ScheduleListItem date={date} schedule={schedule} />
                  </Link>
                ))}
              </div>
            ) : (
              <div>
                <Link to={{ pathname: '/new', search: `?date=${date}` }}>
                  <EmptyWrapper>새 일정 만들기</EmptyWrapper>
                </Link>
              </div>
            )}
          </Item>
        </DateWrapper>
      ))}
    </div>
  );
}
