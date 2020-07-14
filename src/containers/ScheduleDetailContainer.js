import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ScheduleForm from '@Components/Form/ScheduleForm';
import styled from 'styled-components';
import { format } from 'date-fns';
import {
  editSchedule,
  deleteSchedule,
  editRepeatedSchedules,
  deleteRepeatedSchedules,
  createReservation,
  deleteReservation,
} from '@/modules/schedules';
import { getScheduleById } from '@/selectors';

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
  const [reservation, setReservation] = useState({});
  const schedule = useSelector((state) => getScheduleById(state, id));
  const reservations = useSelector((state) => state.schedules.reservations);

  const dispatch = useDispatch();

  useEffect(() => {
    if (schedule?.start) {
      const currentReservations = reservations[format(schedule.start, 'yyyy-MM-dd')];
      const foundReservation = currentReservations?.find((item) => +item.scheduleId === +id);
      if (foundReservation) setReservation(foundReservation);
    }
  }, [schedule]);

  const handleEdit = useCallback((schedule) => {
    dispatch(editSchedule(schedule));
    if (schedule.repeated) dispatch(editRepeatedSchedules(schedule));
    setIsEditing(false);
  }, []);

  const handleDelete = useCallback(() => {
    dispatch(deleteSchedule(schedule));
    if (reservation && schedule.reservation) dispatch(deleteReservation(reservation));
    if (schedule.repeated) dispatch(deleteRepeatedSchedules(schedule));
    history.push('/');
  }, [schedule]);

  const handleReservation = useCallback(
    (item) => {
      if (item.room > -1) {
        dispatch(deleteReservation(reservation));
        dispatch(createReservation(item));
      }
    },
    [reservation]
  );

  const handleDeleteReservation = useCallback(
    (item) => {
      if (item.room > -1) {
        dispatch(deleteReservation(reservation));
      }
    },
    [reservation]
  );

  return (
    <div>
      {schedule?.id && (
        <>
          <ScheduleForm
            presetData={schedule}
            readOnly={!isEditing}
            handleSubmit={handleEdit}
            handleReservation={handleReservation}
            deleteReservation={handleDeleteReservation}
            presetReservation={reservation}
          />
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
