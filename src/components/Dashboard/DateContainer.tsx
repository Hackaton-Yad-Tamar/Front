import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers-pro/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';


interface DateComponentProps {
    name: string;
    onDateChange: (category: string) => void;
}

export const BasicDatePicker = ({name, onDateChange}: DateComponentProps) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={name}
                onChange={(newValue: any) => onDateChange(newValue)}
            />
        </LocalizationProvider>
    );
}
