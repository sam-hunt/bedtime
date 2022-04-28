import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#CB9EFF',
            light: '#FFCFFF',
            dark: '#996FCB',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#7005FC',
            light: '#AB4CFF',
            dark: '#2600C7',
            contrastText: '#FFFFFF',
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#CB9EFF',
            light: '#FFCFFF',
            dark: '#996FCB',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#7005FC',
            light: '#AB4CFF',
            dark: '#2600C7',
            contrastText: '#FFFFFF',
        },
    },
});
