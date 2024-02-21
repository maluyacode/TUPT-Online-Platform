import React, { useRef, useState } from 'react'
import { Box, Button, Divider, IconButton, Menu, Typography, MenuItem, Fade, Popper, Paper } from '@mui/material';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import {
    useNavigate
} from 'react-router-dom'

const groupChatData = [
    { name: 'The Brainstormers', image: 'https://via.placeholder.com/150' },
    { name: 'The Collaborators', image: 'https://via.placeholder.com/150' },
    { name: 'The Dream Team', image: 'https://via.placeholder.com/150' },
    { name: 'The Power Group', image: 'https://via.placeholder.com/150' },
    { name: 'The Innovation Hub', image: 'https://via.placeholder.com/150' },
    { name: 'The Creative Collective', image: 'https://via.placeholder.com/150' },
    { name: 'The Visionaries', image: 'https://via.placeholder.com/150' },
    { name: 'The Problem Solvers', image: 'https://via.placeholder.com/150' },
    { name: 'The Strategy Squad', image: 'https://via.placeholder.com/150' },
    { name: 'The Game Changers', image: 'https://via.placeholder.com/150' },
    { name: 'The Think Tank', image: 'https://via.placeholder.com/150' },
    { name: 'The Synergy Squad', image: 'https://via.placeholder.com/150' },
    { name: 'The Motivation Nation', image: 'https://via.placeholder.com/150' },
    { name: 'The Success Squad', image: 'https://via.placeholder.com/150' },
    { name: 'The Idea Exchange', image: 'https://via.placeholder.com/150' },
    { name: 'The Brain Trust', image: 'https://via.placeholder.com/150' },
    { name: 'The Solution Seekers', image: 'https://via.placeholder.com/150' },
    { name: 'The Genius Club', image: 'https://via.placeholder.com/150' },
    { name: 'The Inspiration Station', image: 'https://via.placeholder.com/150' },
    { name: 'The Achievement Alliance', image: 'https://via.placeholder.com/150' }
];


const GroupList = () => {

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const [prevButtonId, setPrevButtonId] = useState();
    const groupBox = useRef();

    const handleClick = (newPlacement) => (event) => {
        const newButtonId = event.currentTarget.getAttribute('data-id');
        console.log(prevButtonId)
        if (open && prevButtonId === newButtonId) {
            setPrevButtonId(newButtonId)
            setOpen(false)
        } else {
            setPrevButtonId(newButtonId)
            setOpen(true)
        }
        setAnchorEl(event.currentTarget);
        // setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    window.addEventListener('scroll', () => {
        console.log("Asdsad")
        setOpen(false)
    })

    groupBox?.current?.addEventListener('scroll', () => {
        console.log("Asdsad")
        setOpen(false)
    })


    return (
        <>
            <Popper
                // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
                sx={{ zIndex: 1200 }}
                open={open}
                anchorEl={anchorEl}
                placement={placement}
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={100}>
                        <Paper className='d-flex flex-column' sx={{ p: 1 }}>
                            <Button size='large'>
                                <MDBIcon fas icon="edit" />
                            </Button>
                            <Button size='large'>
                                <MDBIcon fas icon="trash-alt" />
                            </Button>
                        </Paper>
                    </Fade>
                )}
            </Popper>
            <Box className='d-flex justify-content-between '>
                <Typography variant='h5' sx={{ position: 'sticky', top: 0 }}>Groups</Typography>
                <Button onClick={() => navigate('/announcement/create-group')} variant='outlined'>Add Group</Button>
            </Box>
            <Divider sx={{ my: 1.5, borderBottom: 3, position: 'sticky', top: '48px' }} />
            <Box ref={groupBox} sx={{ boxShadow: 5, py: 2, px: 3, overflowY: 'scroll', maxHeight: '81vh' }}>
                {groupChatData.map((group, i) => (
                    <MDBCard key={`group${i}`} style={{ cursor: 'pointer', }} className='mb-2'>
                        <MDBRow className='g-0'>
                            <MDBCol onClick={() => navigate('/categorize-announcements/sampleId')} sm={'3'} className='d-flex justify-content-center align-items-center'>
                                <MDBCardImage style={{ height: 50, width: 50, objectFit: 'cover', borderRadius: '50%' }} src={group.image} fluid />
                            </MDBCol>
                            <MDBCol onClick={() => navigate('/categorize-announcements/sampleId')} sm={'7'}>
                                <MDBCardBody className='ps-0'>
                                    {/* <MDBCardTitle>Popsicles Madriaga</MDBCardTitle> */}
                                    <MDBCardText>
                                        {group.name}
                                    </MDBCardText>
                                    {/* <MDBCardText>
                                        <small className='text-muted'>Last updated 3 mins ago</small>
                                    </MDBCardText> */}
                                </MDBCardBody>
                            </MDBCol>
                            <MDBCol sm={'2'} className='d-flex justify-content-center align-items-center'>
                                <IconButton key={i} data-id={i} onClick={handleClick('bottom')} >
                                    <MoreVertIcon />
                                </IconButton>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                ))}
            </Box >
        </>
    )
}

export default GroupList