import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { MDBIcon } from 'mdb-react-ui-kit';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = ({ open, setOpen, announcement }) => {

    const navigate = useNavigate()

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                // onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle >
                    <Box className='d-flex gap-3 align-items-center'>
                        <MDBIcon fas icon="bullhorn" size='xl' color='danger' />
                        <Typography variant='h6'>
                            {announcement.createdAt === announcement.createdAt ?
                                "New Announcement!" :
                                "Re-announcement"
                            }
                        </Typography>
                    </Box>
                    <br />
                    <Typography variant='h5'>{announcement.title}</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {announcement.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={() => {
                        navigate(`/announcement-details/${announcement._id}`)
                        handleClose()
                    }}>View</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default Alert