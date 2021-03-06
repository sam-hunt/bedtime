import dayjs from 'dayjs';
import { TextField, useTheme } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/lab';
import PickersDay, { PickersDayProps, pickersDayClasses } from '@mui/lab/PickersDay';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import useBedtimes from '../../hooks/use-bedtimes';
import { useMemo } from 'react';

export interface IDateSelectorWithBedtimesProps {
    value: dayjs.Dayjs;
    onChange: (value: dayjs.Dayjs | null) => void;
}

const DateSelectorWithBedtimes = ({ value, onChange }: IDateSelectorWithBedtimesProps) => {
    const { bedtimes } = useBedtimes();
    const highlightedDays = useMemo(() => Object.keys(bedtimes), [bedtimes])

    const theme = useTheme();

    const highlightedDayStyles = {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    }

    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
            openTo='day'
            value={value}
            onChange={onChange}
            inputFormat='YYYY-MM-DD'
            renderInput={(params) => <TextField {...params} />}
            renderDay={(
                date: dayjs.Dayjs,
                selectedDates: Array<dayjs.Dayjs | null>,
                pickersDayProps: PickersDayProps<dayjs.Dayjs>
            ) => {
                const matchedStyles = highlightedDays.reduce((acc, val) => date.isSame(val, 'day') ? highlightedDayStyles : acc, {});
                return (
                    <PickersDay
                        {...pickersDayProps}
                        sx={{
                            ...matchedStyles,
                            [`&&.${pickersDayClasses.selected}`]: {
                                backgroundColor: theme.palette.secondary.main,
                            }
                        }}
                    />
                );
            }}
        />
    </LocalizationProvider>
}

export default DateSelectorWithBedtimes;
