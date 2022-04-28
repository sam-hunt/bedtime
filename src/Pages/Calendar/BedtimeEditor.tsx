import dayjs, { Dayjs } from 'dayjs';
import { Box, IconButton } from '@mui/material';
import Icon from '@mdi/react';
import { mdiClockPlusOutline, mdiDelete } from '@mdi/js';
import useBedtimeForDay from '../../hooks/use-bedtime-for-day';
import EditableTime from '../../Components/EditableTime';
import { useParams } from 'react-router-dom';

const BedtimeEditor = () => {

    const { date } = useParams();
    const dateObj = dayjs(date);
    const { bedtimeForDay, setBedtimeForDay } = useBedtimeForDay(dateObj);

    const onBedtimeForDayChange = (t: Dayjs | null) => {
        if (!t?.isValid()) {
            setBedtimeForDay(null);
            return;
        }
        // Ensure that the date is correct as late bedtimes roll over the dateline
        const newBedtime = dateObj
            .month(t?.hour() >= 12 ? dateObj.month() : (dateObj.add(1, 'day').month()))
            .year(t?.hour() >= 12 ? dateObj.year() : (dateObj.add(1, 'day').year()))
            .date(t?.hour() >= 12 ? dateObj.date() : (dateObj.add(1, 'day').date()))
            .hour(t?.hour())
            .minute(t?.minute())
            .second(0).millisecond(0);

        setBedtimeForDay(newBedtime.toISOString());
    }

    return (
        <Box display='flex' flexDirection='row' alignItems='center' my={4} mx={2}>
            <EditableTime value={dayjs(bedtimeForDay)} onChange={onBedtimeForDayChange} />
            <IconButton aria-label='delete' disabled={!bedtimeForDay} color='error' onClick={() => setBedtimeForDay(null)}>
                <Icon path={mdiDelete} title='Delete' size={0.8} />
            </IconButton>
            <IconButton aria-label='now' onClick={() => setBedtimeForDay(dayjs().toISOString())}>
                <Icon path={mdiClockPlusOutline} title='Now' size={0.8} />
            </IconButton>
        </Box>
    )
}

export default BedtimeEditor;