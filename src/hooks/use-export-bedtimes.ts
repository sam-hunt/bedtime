import dayjs from 'dayjs';
import useBedtimes from './use-bedtimes';

export interface IExportResult {
    isSuccess: boolean,
    message: string,
}

export interface IUseExportBedtimes {
    exportJson: () => IExportResult,
}

const useExportBedtimes = (): IUseExportBedtimes => {
    const { bedtimes } = useBedtimes();

    const exportJson = () => {
        const filename = `bedtimes-export-${dayjs().format('YYYYMMDD-hhmmss')}.json`;
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(bedtimes)));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        return {
            isSuccess: true,
            message: `Exported bedtimes for ${Object.keys(bedtimes).length} days to download file "${filename}"`,
        };
    };

    return { exportJson };
}

export default useExportBedtimes;
