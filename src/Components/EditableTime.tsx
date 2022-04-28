import { mdiCheck, mdiClose, mdiPencil } from '@mdi/js';
import Icon from '@mdi/react';
import { LocalizationProvider, TimePicker } from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import { Box, IconButton, TextField, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';

interface IEditableTimeProps {
    value: dayjs.Dayjs | null;
    onChange: (value: dayjs.Dayjs | null) => void;
}

const EditableTime = ({ value, onChange }: IEditableTimeProps) => {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newValue, setNewValue] = useState<dayjs.Dayjs | null>(value);
    const theme = useTheme();

    const beginEdit = () => {
        setNewValue(value);
        setIsEditing(true)
    }
    const saveEdit = () => {
        onChange(newValue);
        setIsEditing(false);
    }
    const discardEdit = () => {
        setIsEditing(false);
    }

    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box display='flex' flexDirection='row' alignItems='center'>
            {!isEditing
                ? <>
                    <Typography variant='h4'>{value?.isValid() ? value?.format('hh:mm A') : 'No Time Set'}</Typography>
                    <IconButton aria-label='edit' onClick={beginEdit} style={{ marginLeft: '10px' }}>
                        <Icon path={mdiPencil}
                            title='Edit'
                            size={0.8}
                        />
                    </IconButton>
                </>
                : <>
                    <TimePicker
                        value={newValue}
                        onChange={(v: dayjs.Dayjs | null) => setNewValue(v)}
                        renderInput={(params: any) =>
                            <TextField
                                {...params}
                                variant='standard'
                                style={{ width: '140px' }}
                                autoFocus
                            />
                        }
                    />
                    <IconButton aria-label='Save edit' onClick={saveEdit} style={{
                        color: theme.palette.success.main,
                        marginLeft: '25px',
                    }}>
                        <Icon path={mdiCheck} title='SaveEdit' size={1} />
                    </IconButton>
                    <IconButton aria-label='Discard edit' onClick={discardEdit} style={{
                        color: theme.palette.warning.main,
                        marginLeft: '5px',
                    }}>
                        <Icon path={mdiClose} title='Discard edit' size={1} />
                    </IconButton>
                </>
            }
        </Box>
    </LocalizationProvider>
}

export default EditableTime;