import React, { useEffect, useState } from 'react';
import ScheduleForm from '@Components/ScheduleForm';
import * as api from '../apis';

export default function ScheduleDetailContainer({ match }) {
  const { id } = match.params;

  const [schedule, setSchedule] = useState({});
  useEffect(() => {
    const event = api.getEventByID(id);
    if (event?.id) setSchedule({ ...event });
  }, [id]);

  return (
    <div>
      {schedule.id && <ScheduleForm presetData={schedule} readOnly />}
      {/* <button>편집</button> */}
    </div>
  );
  // TODO: Connect editing
}
