import moment from 'moment';
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
type Meeting = {
  title: string;
  start: Date;
  end: Date;
  location: string;
  familyContact: string;
  requestDescription: string;
};

const FAKE_DATA: Meeting[] = [
  {
    title: 'פגישה עם משפחת כהן',
    start: new Date(),
    end: new Date(Date.now() + 10800000),
    location: 'תל אביב',
    familyContact: 'פלאפון: 0526334446',
    requestDescription: 'פגישה עעם משפחת כהן בפעם השלישית החודש',
  },
];

const DutiesCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState<Meeting | null>(
    null
  );
  const [showPopup, setShowPopup] = useState(false);
  const localizer = momentLocalizer(moment);

  const handleEventSelect = (event: Meeting) => {
    setSelectedEvent(event);
    setShowPopup(true);
  };

  const getCalendarDuties = () => {
    return FAKE_DATA.map((event) => ({
      ...event,
      allDay: false,
    }));
  };

  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ width: '80%' }}
      >
        <div className="d-flex flex-column">
          <div>
            <Calendar
              localizer={localizer}
              // startAccessor="start"
              // endAccessor="end"
              culture=""
              enableAutoScroll
              style={{
                height: '80vh',
                width: '90%',
                fontSize: '2vh',
              }}
              events={getCalendarDuties()}
              popup
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: 'blue',
                },
              })}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DutiesCalendar;
