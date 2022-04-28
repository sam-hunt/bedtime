import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import useBedtimes from '../../../hooks/use-bedtimes';

const DiffReport = () => {
    const { bedtimes } = useBedtimes();

    const avgBetweenDays = (start: dayjs.Dayjs, end: dayjs.Dayjs) => {
        // return start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD')
        const timeDiffs: number[] = [];
        const times: string[] = [];
        let nextDay = start;
        while(1) {
            // return end.diff(start, 'days')
            if (end.diff(nextDay, 'days') <= 0) break;
            const dayKey = nextDay.format('YYYY-MM-DD');
            timeDiffs.push(dayjs(dayKey).diff(dayjs(bedtimes[dayKey]), 'minutes'));
            times.push(dayjs(bedtimes[dayKey]).format('hh:mm a'));
            nextDay = nextDay.add(1, 'day')
        }
        // return JSON.stringify(times)
        if (timeDiffs.length === 0) return 'Not enough data'
        const total = timeDiffs.reduce((acc, val) => acc + val, 0);
        const average = total / timeDiffs.length;
        return dayjs().hour(0).minute(0).second(0).millisecond(0).add(average, 'minutes').format('hh:mm A');
    }
    
    const yesterdayKey = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    const yesterday = bedtimes[yesterdayKey] ? dayjs(bedtimes[yesterdayKey]).format('hh:mm A') : 'Not enough data';

    const avgThisWeek = avgBetweenDays(
        dayjs().subtract(1, 'week'),
        dayjs()
    );
    const avgLastWeek = avgBetweenDays(
        dayjs().subtract(2, 'week'),
        dayjs().subtract(1, 'week'),
    );
    const avgThisMonth = avgBetweenDays(
        dayjs().subtract(1, 'month'),
        dayjs()
    );
    const avgLastMonth = avgBetweenDays(
        dayjs().subtract(2, 'month'),
        dayjs().subtract(1, 'month'),
    );

    return <>
        <Typography variant='h5' color='primary'>Yesterday</Typography>
        <Typography variant='h4' p={2}>{yesterday}</Typography>
        <br/>
        <Typography variant='h5' color='primary'>Average this week</Typography>
        <Typography variant='h4' p={2}>{avgThisWeek}</Typography>
        <br/>
        <Typography variant='h5' color='primary'>Average last week</Typography>
        <Typography variant='h4' p={2}>{avgLastWeek}</Typography>
        <br/>
        <Typography variant='h5' color='primary'>Average this month</Typography>
        <Typography variant='h4' p={2}>{avgThisMonth}</Typography>
        <br/>
        <Typography variant='h5' color='primary'>Average last month</Typography>
        <Typography variant='h4' p={2}>{avgLastMonth}</Typography>
    </>
}

export default DiffReport;