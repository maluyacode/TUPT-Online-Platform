import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { getUser } from '../../utils/helper';
import Block from '../Layout/Loaders/Block';
import { notifyApi } from '../../api/messagesApi';
import ToastEmmiter from '../Layout/ToastEmmiter';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EmergencyMessage = ({ open, setOpen, chatInfo }) => {
    const [loading, setLoading] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const notifyUser = async (formData) => {
        setLoading(true)
        const { data } = await notifyApi(formData);
        if (data.success) {
            ToastEmmiter.success(data.message)
            setLoading(false)
        } else {
            ToastEmmiter.warning('System error, please try again later', 'top-center');
            setLoading(false)
        }
    }

    const handleNotify = (message) => {

        const sendTo = chatInfo?.participants?.filter(user => {
            if (user._id !== getUser()._id) {
                return user;
            }
        })

        notifyUser({
            message: message,
            sendTo: sendTo,
        })

        handleClose()
    }

    return (
        <React.Fragment>
            <Block loading={loading} />
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Emergency Message
                        </Typography>
                        {/* <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button> */}
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItemButton>
                        <ListItemText
                            onClick={() => handleNotify("Could you please come online? I have something important to discuss with you.")}
                            primary="Notify to Online"
                            secondary={`"Could you please come online? I have something important to discuss with you."`}
                        />
                    </ListItemButton>

                    <Divider />

                    <ListItemButton>
                        <ListItemText primary="Emergency"
                            onClick={() => handleNotify("Urgent: Please come online immediately. There's an important matter I need to discuss with you regarding the emergency.")}
                            secondary={`"Urgent: Please come online immediately. There's an important matter I need to discuss with you regarding the emergency."`}
                        />
                    </ListItemButton>

                    <Divider />
                    {/* 
                    <ListItemButton>
                        <ListItemText
                            primary="Emergency Fire"
                            secondary="Tethys"
                        />
                    </ListItemButton>

                    <Divider />

                    <ListItemButton>
                        <ListItemText
                            primary="Default notification ringtone"
                            secondary="Tethys"
                        />
                    </ListItemButton> */}
                </List>
            </Dialog>
        </React.Fragment>
    )
}

export default EmergencyMessage