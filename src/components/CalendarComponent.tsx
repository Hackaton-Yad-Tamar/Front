import moment from 'moment';
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AlertDialogSlide } from './MeetingDialog';

export type Meeting = {
  title: string;
  start: Date;
  end: Date;
  location: string;
  familyContact: string;
  requestDescription: string;
};

const messages = {
  today: 'היום', // Change "Today"
  previous: 'חזור', // Change "Back"
  next: 'הבא',
  month: 'חודש',
  week: 'שבוע',
  day: 'יום',
  agenda: "אג'נדה",
  date: 'תאריך',
  time: 'שעה',
  event: 'אירוע',
  noEventsInRange: 'אין אירועים בטווח זה',
  showMore: (total: number) => `+ עוד ${total}`,
};

const FAKE_DATA: Meeting[] = [
  {
    title: 'פגישה עם מתנדב',
    start: new Date(),
    end: new Date(Date.now() + 10800000),
    location: 'תל אביב',
    familyContact: 'פלאפון: 0526334446',
    requestDescription: 'פגישה עם מתנדב בפעם השלישית החודש',
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
        style={{ width: '80%', paddingTop: '5vh' }}
      >
        <div className="d-flex flex-column">
          <div>
            <Calendar
              localizer={localizer}
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
              onSelectEvent={(event) => handleEventSelect(event)}
              messages={messages}
            />
          </div>
        </div>
      </div>
      {showPopup && selectedEvent && (
        <AlertDialogSlide
          selectedEvent={selectedEvent}
          closeDialog={() => {
            setShowPopup(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </>
  );
};

export default DutiesCalendar;
