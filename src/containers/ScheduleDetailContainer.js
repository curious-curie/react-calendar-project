import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ScheduleForm from '@Components/ScheduleForm';
import { editSchedule, deleteSchedule } from '../modules/schedules';
import * as api from '../apis';
import styled from 'styled-components';

const EditButton = styled.button`
  padding: 8px;
  text-align: center;
  background: #ececec;
  border: none;
  margin: 0 6px;
  border-radius: 8px;
`;

const ButtonWrapper = styled.div`
  padding: 16px;
  position: absolute;
  right: 16px;
`;
function ScheduleDetailContainer({ match, history }) {
  const { id } = match.params;

  const [schedule, setSchedule] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const event = api.getEventByID(id);
    if (event?.id) setSchedule({ ...event });
  }, [id]);

  const handleEdit = (schedule) => {
    dispatch(editSchedule(schedule));
    setIsEditing(false);
    setSchedule(schedule);
  };

  const handleDelete = () => {
    dispatch(deleteSchedule(schedule));
    history.push('/');
  };

  return (
    <div>
      {schedule.id && (
        <>
          <ScheduleForm presetData={schedule} readOnly={!isEditing} handleSubmit={handleEdit} />
          {!isEditing && (
            <ButtonWrapper>
              <EditButton onClick={() => setIsEditing(!isEditing)}>수정</EditButton>
              <EditButton onClick={() => handleDelete()}>삭제</EditButton>
            </ButtonWrapper>
          )}
        </>
      )}
    </div>
  );
}

export default withRouter(ScheduleDetailContainer);
