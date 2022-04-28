import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Icon from '@mdi/react'
import { mdiAlarmSnooze, mdiBackupRestore, mdiBrightness4, mdiBrightness7, mdiCalendar, mdiSigma } from '@mdi/js';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../App/App';
import { useTheme } from '@mui/material';

const Nav = () => {

    const { currentTheme, toggleTheme } = useContext(ThemeContext);

    const theme = useTheme();
    const inactiveNavStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        marginRight: '10px',
        color: theme.palette.primary.contrastText,
        '&:hover': {
            color: theme.palette.primary.dark,
        },
    }
    const activeNavStyle = {
        ...inactiveNavStyle,
        color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary.main,
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <Icon path={mdiAlarmSnooze} title='Menu' size={1} />
                    <Typography variant='h6' component='div' ml={1} mr={3}>
                        Bedtime
                    </Typography>

                    <NavLink
                        to='/calendar'
                        style={({ isActive }) => isActive ? activeNavStyle : inactiveNavStyle as any}
                    >
                            <Icon path={mdiCalendar} title='Calendar' size={1} />
                    </NavLink>
                    <NavLink
                        to='/reports'
                        style={({ isActive }) => isActive ? activeNavStyle : inactiveNavStyle as any}
                    >
                            <Icon path={mdiSigma} title='Reports' size={1} />
                    </NavLink>
                    <NavLink
                        to='/backup'
                        style={({ isActive }) => isActive ? activeNavStyle : inactiveNavStyle as any}
                    >
                            <Icon path={mdiBackupRestore} title='Backup/Restore' size={1} />
                    </NavLink>




                    {/* <IconButton aria-label='Calendar' onClick={() => navigate('/calendar')} >
                        <Icon path={mdiCalendar} title='Calendar' size={1} />
                    </IconButton>
                    <IconButton aria-label='Reports' onClick={() => navigate('/reports')} >
                        <Icon path={mdiSigma} title='Reports' size={1} />
                    </IconButton>
                    <IconButton aria-label='Backup/Restore' onClick={() => navigate('/backup')}>
                        <Icon path={mdiBackupRestore} title='Backup/Restore' size={1} />
                    </IconButton>
                    <pre><code>{JSON.stringify(location, null, 4)}</code></pre> */}


                    <Box sx={{ flexGrow: 1 }} />

                    <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
                        {currentTheme === 'light'
                            ? <Icon path={mdiBrightness4} title='Menu' size={1} />
                            : <Icon path={mdiBrightness7} title='Menu' size={1} />
                        }
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Nav;
