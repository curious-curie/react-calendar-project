import React from 'react';
import { format, isSameDay } from 'date-fns';
import styled from 'styled-components';

const ItemWrapper = styled.div`
  display: flex;
  margin-bottom: 8px;
  border-bottom: 1px solid #ececec;
  padding-bottom: 8px;
  width: 100%;
`;

const ItemTime = styled.div`
  margin-left: 8px;
  padding: 0 8px;
  font-size: 12px;
  width: 90px;
  color: #bbb;
  align-self: flex-end;
`;

const ItemLabel = styled.div`
  margin-left: 20px;
  font-size: 8px;
  height: min-content;
  padding: 3px;
  opacity: 0.7;
  color: black;
  ${({ color }) => `background-color: ${color};`}
`;

export default function ScheduleListItem({ date, schedule }) {
  const { start, end, label, title, allDay } = schedule;
  const isStartDate = isSameDay(start, new Date(date));
  const isEndDate = isSameDay(end, new Date(date));
  const defaultColor = '#62efd3';

  const getTime = () => {
    if (allDay) return '종일';
    const startTime = format(start, 'HH:mm');
    const endTime = format(end, 'HH:mm');
    if (isStartDate && isEndDate) return `${startTime} ~ ${endTime}`;
    else if (isStartDate) return `${startTime} ~`;
    else if (isEndDate) return `~ ${endTime}`;
    else return '종일';
  };

  const scheduleTime = getTime();

  return (
    <ItemWrapper>
      <ItemTime>{scheduleTime}</ItemTime>
      <div>{title}</div>
      <ItemLabel color={label.color || defaultColor}>{label.title}</ItemLabel>
    </ItemWrapper>
  );
}
