import React from 'react';
import styled from 'styled-components';
import { format, isSameDay } from 'date-fns';
import { ColorContainer } from '@/components/Label/label-styles';
import { Link } from 'react-router-dom';

const LabelContainer = styled.div`
  position: relative;
`;
const LabelText = styled.div`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  top: 35%;
  left: 14px;
`;

const ItemContainer = styled.div`
  text-decorations: none;
  display: flex;
  margin: 10px;
  border-bottom: 1px solid #eee;
`;

const ItemInfo = styled.div`
  padding: 8px;
`;

const ItemDate = styled.div`
  font-size: 12px;
  color: #999;
`;

export default function SearchResultItem({ item }) {
  const defaultColor = '#2be5c0';
  const pathId = item?.id.toString().split('-')[0];
  const formattedDate = isSameDay(item.start, item.end)
    ? item.allDay
      ? format(item.start, 'yyyy-MM-dd')
      : format(item.start, 'yyyy-MM-dd  HH:mm')
    : item.allDay
    ? `${format(item.start, 'yyyy-MM-dd')} ~ ${format(item.end, 'yyyy-MM-dd')}`
    : `${format(item.start, 'yyyy-MM-dd HH:mm')} ~ ${format(item.end, 'yyyy-MM-dd HH:mm')}`;

  return (
    <Link to={`/${item.id}`}>
      <ItemContainer>
        <LabelContainer>
          <ColorContainer color={item.label.color || defaultColor} />
          <LabelText>{item.label.title}</LabelText>
        </LabelContainer>
        <ItemInfo>
          <div>{item.title}</div>
          <ItemDate>{formattedDate}</ItemDate>
        </ItemInfo>
      </ItemContainer>
    </Link>
  );
}
