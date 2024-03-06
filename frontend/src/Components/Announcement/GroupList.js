import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Divider, IconButton, Menu, Typography, MenuItem, Fade, Popper, Paper } from '@mui/material';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Block from '../Layout/Loaders/Block';
import ToastEmmiter from '../Layout/ToastEmmiter';

import {
    useNavigate
} from 'react-router-dom'

import Swal from 'sweetalert2'
import axios from 'axios';
import { getUser } from '../../utils/helper'

const GroupList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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

    const [groups, setGroups] = useState([])

    const getGroups = async () => {
        setLoading(true)
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/group/get-all`, {
                withCredentials: true,
            })

            setGroups(data.groups);
            setLoading(false)

        } catch (err) {
            setLoading(false)
            console.log(err)
            ToastEmmiter.error('Error occured', 'top-right')
        }
    }

    const deleteGroup = async () => {
        setLoading(true)
        try {

            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/group/delete/${prevButtonId}`, {
                withCredentials: true,
            })

            setLoading(false)
            setOpen(false)
            ToastEmmiter.success(data.message, 'top-right')
            getGroups()

        } catch (err) {
            setLoading(false)
            console.log(err)
            ToastEmmiter.error('Error occured', 'top-right')
        }
    }

    const handleEdit = () => {
        navigate(`/announcement/edit-group/${prevButtonId}`)
    }

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteGroup()
            }
        });
    }

    useEffect(() => {
        getGroups()
    }, [])
    console.log(groups.length)
    return (
        <>
            <Block loading={loading} />
            <Popper
                sx={{ zIndex: 1200 }}
                open={open}
                anchorEl={anchorEl}
                placement={placement}
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={100}>
                        <Paper className='d-flex flex-column' sx={{ p: 1 }}>
                            <Button onClick={handleEdit} size='large'>
                                <MDBIcon fas icon="edit" />
                            </Button>
                            <Button onClick={handleDelete} size='large'>
                                <MDBIcon fas icon="trash-alt" />
                            </Button>
                        </Paper>
                    </Fade>
                )}
            </Popper>
            <Box className='d-flex justify-content-between '>
                <Typography variant='h6' sx={{ position: 'sticky', top: 0 }}>
                    {getUser().role === 'teacher' ? 'Your Groups' : 'Joined Groups'}
                </Typography>
                {getUser().role === 'teacher' && (
                    <Button onClick={() => navigate('/announcement/create-group')} variant='outlined'>Add Group</Button>
                )}
            </Box>
            <Divider sx={{ my: 1.5, borderBottom: 3, position: 'sticky', top: '48px' }} />
            <Box ref={groupBox} sx={{ boxShadow: 5, py: 2, px: 3, overflowY: 'auto', maxHeight: '81vh' }}>
                {checkGroupInvolvement(groups)}
                {groups.map((group, i) => (
                    <>
                        {(group.members.includes(getUser()._id) || group.createdBy === getUser()._id) && (
                            <MDBCard key={`group${i}`} style={{ cursor: 'pointer', }} className='mb-2 py-2'>
                                <MDBRow className='g-0'>
                                    <MDBCol onClick={() => navigate(`/group-announcements/${group._id}`)} sm={'4'} className='d-flex justify-content-center align-items-center'>
                                        <MDBCardImage style={{ height: 50, width: 50, objectFit: 'cover', borderRadius: '50%' }} src={group.coverPhoto.url} fluid />
                                    </MDBCol>
                                    <MDBCol onClick={() => navigate(`/group-announcements/${group._id}`)} sm={'6'}>
                                        <MDBCardBody className='px-0 py-3'>
                                            {/* <MDBCardTitle>Popsicles Madriaga</MDBCardTitle> */}
                                            <MDBCardText className='w-100'>
                                                {group.groupName}
                                            </MDBCardText>
                                            {/* <MDBCardText>
                                        <small className='text-muted'>Last updated 3 mins ago</small>
                                    </MDBCardText> */}
                                        </MDBCardBody>
                                    </MDBCol>
                                    <MDBCol sm={'2'} className='d-flex justify-content-center align-items-center'>
                                        {getUser().role === 'teacher' && group.createdBy === getUser()._id && (
                                            <IconButton key={group._id} data-id={group._id} onClick={handleClick('bottom')} >
                                                <MoreVertIcon />
                                            </IconButton>
                                        )}
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        )}
                    </>
                ))}
            </Box >
        </>
    )
}

const checkGroupInvolvement = (groups) => {

    if (getUser().role === 'teacher') {

        const results = groups.map(group => group.members.includes(getUser()._id) || group.createdBy === getUser()._id)
        if (!results.includes(true)) {
            return <Typography>You haven't created or added to group yet</Typography>
        }

    } else {

        const results = groups.map(group => group.members.includes(getUser()._id))
        if (!results.includes(true)) {
            return <Typography>You haven't added to the group yet</Typography>
        }
    }

}

export default GroupList