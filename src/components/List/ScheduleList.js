import React, { useState, useEffect } from 'react';
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
  margin-bottom: 4px;
  font-size: 12px;
  border-bottom: 1px solid #ececec;
  padding: 0 20px 8px;
  color: #ccc;
`;

const CheckWrapper = styled.div`
  margin: 16px 0;
`;

export default function ScheduleList({ dates, schedules, appendList, hasRepeat }) {
  const getId = (item) => item?.id.toString().split('-')[0];
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    if (!showAll && hasRepeat && Object.values(schedules).length < 15) {
      appendList();
    }
  }, [schedules, showAll]);

  return (
    <div>
      <CheckWrapper>
        <input type="checkbox" onChange={(e) => setShowAll(!e.currentTarget.checked)} checked={!showAll} />
        일정 있는 날짜만 보기
      </CheckWrapper>
      {dates.map((date) =>
        showAll || schedules[date] ? (
          <DateWrapper key={date}>
            <div key={date}>{date}</div>
            <Item>
              {schedules[date] ? (
                <div>
                  {schedules[date].map((schedule) => (
                    <Link key={schedule.id} to={`/${getId(schedule)}`}>
                      <ScheduleListItem date={date} schedule={schedule} />
                    </Link>
                  ))}
                </div>
              ) : (
                <div key={date}>
                  <Link to={{ pathname: '/new', search: `?date=${date}` }}>
                    <EmptyWrapper>새 일정 만들기</EmptyWrapper>
                  </Link>
                </div>
              )}
            </Item>
          </DateWrapper>
        ) : (
          <div key={date}></div>
        )
      )}
    </div>
  );
}
