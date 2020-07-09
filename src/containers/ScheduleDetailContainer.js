import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ScheduleForm from '@Components/ScheduleForm';
import { editSchedule, deleteSchedule } from '../modules/schedules';

import * as api from '../apis';

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
          <button onClick={() => setIsEditing(!isEditing)}>수정</button>
          <button onClick={() => handleDelete()}>삭제</button>
          <ScheduleForm presetData={schedule} readOnly={!isEditing} handleSubmit={handleEdit} />
        </>
      )}
    </div>
  );
}

export default withRouter(ScheduleDetailContainer);
