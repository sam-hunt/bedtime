import './App.css';
import dayjs from 'dayjs';
import { createContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../Components/Layout';
import CalendarPage from '../Pages/Calendar/CalendarPage';
import ReportsPage from '../Pages/Reports/ReportsPage';
import BackupPage from '../Pages/Backup/BackupPage';
import useLocalStorage from '../hooks/use-local-storage';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from '../theme';
import { BrowserRouter } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import DiffReport from '../Pages/Reports/DiffReport/DiffReport';
import HeatReport from '../Pages/Reports/HeatReport/HeatReport';
import BedtimeEditor from '../Pages/Calendar/BedtimeEditor';

export type Iso8601Date = string;
export type Iso8601Timestamp = string;

export type IBedtimes = {
    [date: Iso8601Date]: Iso8601Timestamp,
};

export interface IBedtimesContext {
    bedtimes: IBedtimes;
    setBedtimes: (bedtimes: IBedtimes) => void,
}
export interface IThemeContext {
    currentTheme: string,
    toggleTheme: () => void,
}

export const BedtimesContext = createContext<IBedtimesContext>({ bedtimes: {}, setBedtimes: () => { } });
export const ThemeContext = createContext<IThemeContext>({ currentTheme: 'dark', toggleTheme: () => { } });

const App = () => {
    const [bedtimes, setBedtimes] = useLocalStorage<IBedtimes>('bedtimes', {});
    const [currentTheme, setCurrentTheme] = useLocalStorage<'light' | 'dark'>('currentTheme', 'light');
    const toggleTheme = () => setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
    const today = dayjs().format('YYYY-MM-DD');

    return (
        <BedtimesContext.Provider value={{ bedtimes, setBedtimes }}>
        <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
            <ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}>
                <CssBaseline enableColorScheme />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            {/* <Route path="calendar" element={<CalendarPage />} /> */}
                            <Route path="calendar" element={<CalendarPage />}>
                                <Route path=":date" element={<BedtimeEditor />} />
                                <Route path="" element={<Navigate replace to={`/calendar/${today}`} />} />
                                <Route path="*" element={<Navigate replace to={`/calendar/${today}`} />} />
                            </Route>
                            <Route path="reports" element={<ReportsPage />}>
                                <Route path="diff" element={<DiffReport />} />
                                <Route path="heat" element={<HeatReport />} />
                            </Route>
                            <Route path="backup" element={<BackupPage />} />
                            <Route path="" element={<Navigate replace to="/calendar" />} />
                            <Route path="*" element={<Navigate replace to="/calendar" />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </ThemeContext.Provider>
        </BedtimesContext.Provider>
    );
}

export default App;
