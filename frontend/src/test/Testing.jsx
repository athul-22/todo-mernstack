import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Test = () => {
  const [startDate, setStartDate] = useState(null);

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
        popperPlacement="bottom-start"
        popperModifiers={{
          flip: {
            behavior: ['bottom'],
          },
          preventOverflow: {
            enabled: false,
          },
          hide: {
            enabled: false,
          },
        }}
        popperClassName="date-picker-popper"
        showPopperArrow={false}
        customInput={<CustomCalendarIcon />}
      />
    </div>
  );
};

const CustomCalendarIcon = React.forwardRef(({ value, onClick }, ref) => (
  <CalendarTodayIcon onClick={onClick} color="primary" ref={ref} />
));

export default Test;
