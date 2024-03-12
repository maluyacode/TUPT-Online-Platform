import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { closeProfile } from '../../actions/uiActions';
import { Box, Chip, IconButton, Typography } from '@mui/material';
import { colorCoding, profileHead } from '../../utils/avatar';
import { Close } from '@mui/icons-material';

const ViewUser = () => {

    const [open, setOpen] = React.useState(false);
    const { openProfile, user } = useSelector(state => state.ui)

    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        dispatch(closeProfile());
    };

    console.log(user)

    return (
        <React.Fragment>
            <Dialog
                open={openProfile}
                onClose={handleClose}
            >
                <IconButton onClick={handleClose} aria-label="close"
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}>
                    <Close />
                </IconButton>
                <DialogTitle>
                    <Typography>
                        {user?.user?.firstname} {user?.user?.lastname}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Box className='d-flex gap-2'>
                        {profileHead(user?.user, 250, 250, 80, '0px')}
                        <Box className='d-flex flex-column justify-content-center'>
                            <Typography fontSize={18}>{user?.user?.email}</Typography>
                            <Box className='d-flex gap-2 mt-2'>
                                <Chip label={user?.user?.role} sx={{ textTransform: 'capitalize', backgroundColor: colorCoding(user?.user?.role) }} />
                                <Chip label={`Joined Since ${new Date(user?.user?.createdAt).toLocaleDateString('en-PH')}`} sx={{ textTransform: 'capitalize', backgroundColor: colorCoding(user?.user?.role) }} />
                            </Box>
                            {(user?.user?.role === 'student' && user?.connectedParents?.length > 0) && (
                                <>
                                    <Typography className='mt-4 fw-bold'>Connected Parents</Typography>
                                    <Box>
                                        {user?.connectedParents?.map(user => (
                                            <div className='d-flex gap-2 align-items-center mt-2'>
                                                {profileHead(user, 60, 60)}
                                                <div>
                                                    <Typography>{user.firstname} {user.lastname}</Typography>
                                                    <Typography>{user.email}</Typography>
                                                </div>
                                            </div>
                                        ))}
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Box>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions> */}
            </Dialog>
        </React.Fragment>
    )
}

export default ViewUser