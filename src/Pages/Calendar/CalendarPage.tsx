import dayjs, { Dayjs } from 'dayjs'
import { Box, Button, Divider, Typography } from '@mui/material';
import Icon from '@mdi/react'
import { mdiArrowRight, mdiArrowLeft, mdiCalendarToday } from '@mdi/js';
import DateSelectorWithHours from './DateSelectorWithHours';
import { Outlet, useNavigate, useParams } from 'react-router-dom';


const CalendarPage = () => {
    const today = () => dayjs().hour(0).minute(0).second(0).millisecond(0);

    const { date } = useParams();
    const navigate = useNavigate();

    // TODO: Shouldn't this be in a state variable or something
    const selectedDate = dayjs(date);
    const setSelectedDate = (newDate: Dayjs) => navigate(newDate.format('YYYY-MM-DD'));

    return (
        <section>
            <Typography variant='h2' sx={{ my: 2 }}>
                Calendar
            </Typography>

            <DateSelectorWithHours value={selectedDate} onChange={(newValue) => setSelectedDate(newValue || today())} />

            <Button
                variant='outlined'
                aria-label='previous day'
                onClick={() => setSelectedDate(selectedDate.subtract(1, 'day'))}
                color='inherit'
                sx={{ ml: 2, mr: 1 }}
                startIcon={<Icon path={mdiArrowLeft} title='Previous Day' size={0.8} />}
            >
                Previous
            </Button>
            <Button
                variant='outlined'
                aria-label='today'
                onClick={() => setSelectedDate(today())}
                color='inherit'
                sx={{ ml: 1, mr: 1 }}
                startIcon={<Icon path={mdiCalendarToday} title='Today' size={0.8} />}
            >
                Today
            </Button>
            <Button
                variant='outlined'
                aria-label='next day'
                onClick={() => setSelectedDate(selectedDate.add(1, 'day'))}
                color='inherit'
                endIcon={<Icon path={mdiArrowRight} title='Next Day' size={0.8} />}
                sx={{ ml: 1, mr: 2 }}
            >
                Next
            </Button>
            <br /><br />
            <Divider />
            {/* Probably move this into the BedtimeEditor in the outlet once it's passed as a prop? */}
            <Box display='flex' flexDirection='row' alignItems='center' mt={4} mx={2}>
                <Typography variant="h4" color="secondary">{selectedDate.format('dddd, D MMMM YYYY')}</Typography>
            </Box>
            <Outlet />
        </section >
    );
};

export default CalendarPage;
