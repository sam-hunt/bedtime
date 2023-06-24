import Icon from '@mdi/react';
import { mdiListStatus, mdiCalendarMonth } from '@mdi/js';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const reports = [
    { path: 'heat', icon: mdiCalendarMonth },
    { path: 'diff', icon: mdiListStatus },
];

const ReportsPage = () => {

    const [selectedReport, setSelectedReport] = useState<string>('diff');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const lastSubpath = location.pathname.split('/').pop() || '';
        const initialReport = reports.map(r => r.path).includes(lastSubpath) ? lastSubpath : reports[0].path;
        setSelectedReport(initialReport);
        navigate(`/reports/${initialReport}`);
    }, [location.pathname, navigate]);

    const onChange = (event: any) => {
        setSelectedReport(event.target.value);
        navigate(`/reports/${event.target.value}`);
    }

    return (
        <section id='reports'>
            <Typography variant='h2' sx={{ mt: 2 }}>
                Reports
            </Typography>
            <br />
            <Select
                style={{ minWidth: '200px' }}
                value={selectedReport}
                onChange={onChange}
            >
                {reports.map(r =>
                    <MenuItem key={r.path} value={r.path}>
                        <Box display='flex' flexDirection='row' alignItems='center'>
                            <Icon path={r.icon} title={r.path} size={0.8} />&nbsp;&nbsp;&nbsp;
                            <Typography>{r.path.charAt(0).toUpperCase() + r.path.slice(1)} Report</Typography>
                        </Box>
                    </MenuItem>
                )}
            </Select>
            <br />
            <br />
            <Outlet />
            <br />
            <br />
        </section>
    );
}

export default ReportsPage;
