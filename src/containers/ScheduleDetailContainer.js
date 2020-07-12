import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ScheduleForm from '@Components/Form/ScheduleForm';
import { editSchedule, deleteSchedule, editRepeatedSchedules, deleteRepeatedSchedules } from '../modules/schedules';
import { getSchedule } from '@/selectors';
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

  const [isEditing, setIsEditing] = useState(false);
  const schedule = useSelector((state) => getScheduleById(state, id));

  const dispatch = useDispatch();

  const handleEdit = (schedule) => {
    dispatch(editSchedule(schedule));
    if (schedule.repeated) dispatch(editRepeatedSchedules(schedule));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteSchedule(schedule));
    if (schedule.repeated) dispatch(deleteRepeatedSchedules(schedule));
    history.push('/');
  };

  return (
    <div>
      {schedule?.id && (
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
