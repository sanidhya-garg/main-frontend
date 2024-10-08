import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function MyDatePicker({ title, width, selectedDate, setSelectedDate, disable, minDate }) {

  // Custom validation function to disable dates before minDate
  const shouldDisableDate = (date) => {
    return minDate ? date.isBefore(dayjs(minDate), 'day') : false;
  };

  return (
    <div className='flex flex-col' style={{ width: `${width}` }}>
      <span
        style={{
          fontSize: "15px",
          fontWeight: "400",
          color: "rgba(81, 91, 111, 1)",
          fontFamily: "Epilogue, sans-serif"
        }}
      >
        {title}
      </span>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disabled={disable}
          value={selectedDate ? dayjs(selectedDate) : null}  // Ensure value is a dayjs object or null
          onChange={(newValue) => {
            if (newValue) {
              const formattedDate = dayjs(newValue).format('YYYY-MM-DD');
              setSelectedDate(formattedDate);
            } else {
              setSelectedDate(null);  // Handle case when date is cleared
            }
          }}
          shouldDisableDate={shouldDisableDate}  // Use custom validation function
          sx={{
            height: '40px',
            width: "70%",
            fontSize: '15px',
            fontWeight: '400',
            color: 'rgba(81, 91, 111, 1)',
            fontFamily: 'Epilogue, sans-serif',
            paddingLeft: '5px',
            backgroundColor: 'white',
            cursor: disable ? "not-allowed" : "pointer",
            border: "none",
            '& .MuiInputBase-root': {
              padding: '5px 10px',
              borderRadius: '4px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(214, 221, 235, 1)',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(214, 221, 235, 1)',
            },
            '& .MuiInputBase-input': {
              padding: '5px',
            },
          }}
          slotProps={{
            textField: {
              id: "outlined-required",
              label: null, // Hides the label
              InputLabelProps: { shrink: false },
              sx: { borderColor: "none", outline: "none" },
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
}

export default MyDatePicker;
