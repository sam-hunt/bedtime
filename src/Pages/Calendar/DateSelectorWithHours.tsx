import dayjs, { Dayjs } from 'dayjs';
import { useTheme } from '@mui/material';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { PickersDay, PickersDayProps, pickersDayClasses } from '@mui/x-date-pickers/PickersDay';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useBedtimes from '../../hooks/use-bedtimes';
import { useMemo } from 'react';

export interface IDateSelectorWithBedtimesProps {
    value: dayjs.Dayjs;
    onChange: (value: dayjs.Dayjs | null) => void;
}

const DateSelectorWithBedtimes = ({ value, onChange }: IDateSelectorWithBedtimesProps) => {
    const { bedtimes } = useBedtimes();
    const highlightedDays = useMemo(() => new Set(Object.keys(bedtimes)), [bedtimes])

    const theme = useTheme();

    const highlightedDayStyles = {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    }

    function CustomDay(props: PickersDayProps<Dayjs>) {
        const { day, outsideCurrentMonth, ...other } = props;

        const matchedStyles = highlightedDays.has(day.format('YYYY-MM-DD')) ? highlightedDayStyles : {};
        return (
            <PickersDay
                {...other}
                day={day}
                outsideCurrentMonth={outsideCurrentMonth}
                sx={{
                    ...matchedStyles,
                    [`&&.${pickersDayClasses.selected}`]: {
                        backgroundColor: theme.palette.secondary.main,
                    }
                }}
            />
        );
    }

    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
            openTo="day"
            value={value}
            onChange={onChange}
            slots={{ day: CustomDay }}
        />
    </LocalizationProvider>
}

export default DateSelectorWithBedtimes;
