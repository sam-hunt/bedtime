import useBedtimes from './use-bedtimes';

export interface IImportResult {
    isSuccess: boolean,
    message: string,
}

export interface IUseImportBedtimes {
    importJson: () => Promise<IImportResult>,
}

export const enum MergeStrategy {
    REPLACE = 'REPLACE',
    MERGE = 'MERGE',
}

const useImportBedtimes = (
    importFileInputEl: HTMLInputElement | null,
    mergeStrategy: MergeStrategy,
): IUseImportBedtimes => {

    const { bedtimes, setBedtimes } = useBedtimes();

    const importJson = async () => {
        if (!importFileInputEl) {
            return {
                isSuccess: false,
                message: 'No input element passed to hook',
            };
        }
        if ((importFileInputEl.files?.length || 0) < 1) {
            return {
                isSuccess: false,
                message: 'No file selected for import',
            };
        }
        const jsonFile = importFileInputEl.files![0];
        const fileText = await jsonFile.text();
        const fileBedtimes = JSON.parse(fileText);
        // TODO: Validate file's JSON schema
        const importedDayCount = Object.keys(fileBedtimes).length;
        let newBedtimes = null;
        if (mergeStrategy === MergeStrategy.REPLACE) newBedtimes = fileBedtimes;
        if (mergeStrategy === MergeStrategy.MERGE) newBedtimes = { ...bedtimes, ...fileBedtimes };
        setBedtimes(newBedtimes);
        return {
            isSuccess: true,
            message: `Imported bedtimes for ${importedDayCount} days from file "${jsonFile.name}"`
        };
    };

    return { importJson };
}

export default useImportBedtimes;
