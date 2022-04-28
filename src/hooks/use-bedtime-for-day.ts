import dayjs from 'dayjs';
import { IBedtimes, Iso8601Timestamp } from '../App/App';
import useBedtimes from './use-bedtimes';

export type IUseBedtimeForDay = {
    bedtimeForDay: Iso8601Timestamp | null,
    setBedtimeForDay: (newBedtime: Iso8601Timestamp | null) => void,
};

const useBedtimeForDay = (day: dayjs.Dayjs): IUseBedtimeForDay => {
    const { bedtimes, setBedtimes } = useBedtimes();

    if (!dayjs.isDayjs(day)) return {
        bedtimeForDay: null,
        setBedtimeForDay: () => {},
    };

    const dayKey = day.format('YYYY-MM-DD');
    const bedtimeForDay = bedtimes[dayKey] || null;

    const setBedtimeForDay = (bedtimeForDay: Iso8601Timestamp | null) => {
        const newBedtimes = { ...bedtimes, [dayKey]: bedtimeForDay }
        if (!bedtimeForDay) delete newBedtimes[dayKey];
        setBedtimes(newBedtimes as IBedtimes);
    }

    return { bedtimeForDay, setBedtimeForDay };
};

export default useBedtimeForDay;
