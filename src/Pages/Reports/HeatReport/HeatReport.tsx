import dayjs from 'dayjs';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import useBedtimes from '../../../hooks/use-bedtimes';
import useLocalStorageDayjs from '../../../hooks/use-local-storage-dayjs';
import EditableTime from '../../../Components/EditableTime';
import { ResponsiveCalendar } from '@nivo/calendar'
import { useMemo } from 'react';
import { interpolateRdYlGn } from 'd3-scale-chromatic';
import { useNavigate } from 'react-router-dom';

const HeatReport = () => {
    const { bedtimes } = useBedtimes();

    const navigate = useNavigate();
    const theme = useTheme();
    const isWidescreen = useMediaQuery(theme.breakpoints.up('sm'));

    const [targetBedtime, setTargetBedtime] = useLocalStorageDayjs('targetBedtime', dayjs().hour(22).minute(0).second(0).millisecond(0));

    const data = useMemo(() => Object.keys(bedtimes).map(dayKey => {
        const dayKeyDay = dayjs(dayKey);
        const actualTargetBedtime = targetBedtime?.hour() >= 12
            ? targetBedtime.year(dayKeyDay.year()).month(dayKeyDay.month()).date(dayKeyDay.date())
            : targetBedtime.year(dayKeyDay.year()).month(dayKeyDay.month()).date(dayKeyDay.add(1, 'day').date());
        const diff = dayjs(bedtimes[dayKey]).diff(actualTargetBedtime, 'minutes');
        const clampedDiff = Math.min(5*60, diff);
        return {
            day: dayKey,
            time: dayjs(bedtimes[dayKey]).format('hh:mm A'),
            dayOfWeek: dayKeyDay.format('dddd'),
            value: clampedDiff,
            // actualTargetBedtime,
            // bedtime: bedtimes[dayKey],
        };
    }), [bedtimes, targetBedtime]);

    const from = useMemo(() => Object.keys(bedtimes).sort()[0] || dayjs().month(0).date(1).format('YYYY-MM-DD'), [bedtimes])
    const to = useMemo(() => Object.keys(bedtimes).sort().pop() || dayjs().format('YYYY-MM-DD'), [bedtimes])

    const colors = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map(interpolateRdYlGn).reverse();

    return <>
        <Typography variant='h5'>Target Bedtime</Typography>
        <Box display='flex' flexDirection='row' alignItems='center'>
            <EditableTime
                value={targetBedtime}
                onChange={(newBedtime: dayjs.Dayjs | null) => setTargetBedtime(newBedtime || targetBedtime)}
            />
            <Box flexGrow={1}></Box>
            {colors.map(backgroundColor => <Box width='25px' height='25px' style={{ backgroundColor }} />)}
        </Box>
        <Box height='60vh'>

            <ResponsiveCalendar
                data={data}
                from={from}
                to={to}
                direction={isWidescreen ? 'horizontal' : 'vertical'}
                theme={{
                    fontSize: 16,
                    background: theme.palette.background.default,
                    textColor: theme.palette.text.primary,
                }}
                tooltip={(data) =>
                    <pre
                        style={{
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.primary.main}`,
                            borderRadius: '10px 10px',
                            padding: '10px',
                        }}
                    >
                        <code>{JSON.stringify((data as any).data, null, 4)}</code>
                    </pre>
                }
                onClick={(data) => navigate(`/calendar/${data.day}`)}
                emptyColor={theme.palette.mode === 'dark' ? 'black' : 'whitesmoke'}
                colors={colors}
                margin={{ top: 25, right: 0, bottom: 0, left: 25 }}
                yearSpacing={40}
                monthBorderColor={theme.palette.background.default}
                dayBorderWidth={2}
                dayBorderColor={theme.palette.background.default}
            />
        </Box>
    </>
}

export default HeatReport;