import React, { useEffect, useRef, useState } from 'react'
import { MDBBadge, MDBCard, MDBCardImage, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import { Badge, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, TextField, Typography } from '@mui/material'

import { useNavigate, useParams } from 'react-router-dom'

import Block from '../Layout/Loaders/Block'
import MetaData from '../Layout/MetaData'
import SideNav from '../Layout/SideNav'
import TopBar from '../Layout/TopBar'
import DropzoneFile from '../Generic/DropzoneFile'
import axios from 'axios'
import ToastEmmiter from '../Layout/ToastEmmiter'
import { getUser } from '../../utils/helper'

const EditGroup = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([])

    const [groupName, setGroupName] = useState('');
    const [coverPhoto, setCoverPhoto] = useState([]);
    const [defCover, setDefCover] = useState('') // preview of old cover photo
    const [groupUsers, setGroupUsers] = useState([]);

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);


    const getGroup = async () => {
        setLoading(true)
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/group/get-single/${id}`, {
                withCredentials: true,
            })
            // console.log(data)

            setAllUsers(data.users);
            setUsers(data.users);
            setGroupName(data.group.groupName);
            setDefCover(data.group.coverPhoto.url)
            setGroupUsers(data.group.members)
            setLoading(false)

        } catch (err) {
            setLoading(false)
            console.log(err)
            ToastEmmiter.error('Error occured', 'top-right')
        }
    }

    const updateGroup = async () => {

        if (groupName === '') {
            return ToastEmmiter.warning('Group Name should not be empty', 'top-center');
        }
        if (groupUsers.length <= 0) {
            return ToastEmmiter.warning('Group Users should not be empty', 'top-center');
        }
        setLoading(true)
        try {

            const formData = new FormData;
            let members = groupUsers.map(user => { return user._id })

            formData.append('groupName', groupName)
            formData.append('members', JSON.stringify(members))
            if (coverPhoto.length > 0) {
                formData.append('coverPhoto', coverPhoto[0])
            }

            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/group/update/${id}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })

            setLoading(false)
            ToastEmmiter.success(data.message, 'top-right')
            navigate('/announcements')

        } catch (err) {
            setLoading(false)
            console.log(err)
            ToastEmmiter.error('Error occured', 'top-right')
        }


    }

    const deselect = (user) => {
        setGroupUsers(groupUsers.filter(tempUser => tempUser._id !== user._id));
    }

    const handleSearch = e => {
        const keyword = e.target.value;
        const regex = new RegExp(keyword, 'i');
        const filteredUsers = allUsers.filter(user => regex.test(user.firstname) || regex.test(user.lastname));
        setUsers(filteredUsers);
    }

    const addTempUser = (user) => {
        setGroupUsers([...groupUsers, user]);
    }

    useEffect(() => {
        getGroup();
    }, [])


    return (
        <>
            <Block loading={loading} />
            <MetaData pageTitle='Create Group' />
            <div style={{ display: 'flex', height: '100vh', }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <MDBContainer style={{ maxWidth: 850 }} className='mt-4'>
                        <MDBRow>
                            <MDBCol>
                                <Box sx={{ boxShadow: 5, p: 2 }}>

                                    <TextField onChange={e => setGroupName(e.target.value)} value={groupName} className='mb-4' fullWidth label='Group name' type='text' size='small' />

                                    <Typography className='mb-2'>Upload group photo</Typography>
                                    <DropzoneFile setImages={setCoverPhoto} />
                                    {coverPhoto.length <= 0 ?
                                        < img src={defCover} width={100} height={100} />
                                        : <></>
                                    }
                                </Box>
                            </MDBCol>
                            <MDBCol>
                                <Box sx={{ boxShadow: 5, p: 2 }}>
                                    <Box className='d-flex justify-content-between '>
                                        <Typography >
                                            List of Accounts
                                        </Typography>
                                        <Button onClick={handleClickOpen('paper')} size='small'>View Members</Button>
                                    </Box>
                                    <Paper sx={{ height: 350, overflowY: 'scroll' }} className='p-4 bg-secondary mb-4'>
                                        {groupUsers.length > 0 ?
                                            <>
                                                {groupUsers.map((user, i) => (

                                                    <MDBCard key={i} className='p-2 px-4 mb-2'>
                                                        <MDBRow>
                                                            <MDBCol sm={'4'} className='d-flex justify-content-center align-items-center'>
                                                                <MDBCardImage style={{ height: 50, width: 50, objectFit: 'cover', borderRadius: '50%' }} src={user?.avatar?.url || 'https://via.placeholder.com/150'} fluid />
                                                            </MDBCol>
                                                            <MDBCol sm={'8'} className='d-flex justify-content-start align-items-center'>
                                                                <Typography>
                                                                    {user.firstname} {user.lastname}
                                                                </Typography>
                                                            </MDBCol>
                                                            {/* <MDBCol sm={'3'} className='d-flex justify-content-start align-items-center'>
                                                                <Button className='text-capitalize' onClick={() => removeUser(user._id)}>
                                                                    Remove
                                                                </Button>
                                                            </MDBCol> */}
                                                        </MDBRow>
                                                    </MDBCard>

                                                ))}
                                            </>
                                            :
                                            <Typography className='text-center text-dark'>Nothing to show</Typography>
                                        }

                                    </Paper>

                                    <Button onClick={updateGroup} size='medium' variant='outlined' color='success' sx={{ margin: 'auto' }}>Update Group</Button>

                                </Box>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </main>
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title"></DialogTitle>
                <DialogContent dividers={scroll === 'paper'} sx={{ width: 500 }}>

                    <Box className='mb-4'>
                        {groupUsers?.map((user, i) => (
                            <Chip key={i} label={`${user.firstname} ${user.lastname}`} onDelete={() => deselect(user)} sx={{ mx: 0.3, my: 0.3 }} />
                        ))}
                    </Box>

                    <TextField onChange={handleSearch} className='mb-4' placeholder='Search' size='small' fullWidth />

                    <Paper sx={{ height: 350, overflowY: 'scroll', minWidth: 400 }} className='p-4 bg-info mb-4'>
                        {users?.map((user, i) => {
                            if (!groupUsers.some(tempUser => tempUser._id === user._id) && user._id !== getUser()._id) {
                                return (
                                    <MDBCard key={i} className='p-2 px-4 mb-2'>
                                        <MDBRow>
                                            <MDBCol sm={'3'} className='d-flex justify-content-center align-items-center'>
                                                <MDBCardImage style={{ height: 45, width: 45, objectFit: 'cover', borderRadius: '50%' }} src={users?.avatar?.url || 'https://via.placeholder.com/150'} fluid />
                                            </MDBCol>
                                            <MDBCol sm={'6'} className='d-flex justify-content-start align-items-center'>
                                                <Typography fontSize={14}>
                                                    {user.firstname} {user.lastname}
                                                </Typography>
                                            </MDBCol>
                                            <MDBCol sm={'3'} className='d-flex justify-content-start align-items-center'>
                                                <Button className='text-capitalize'
                                                    onClick={() => addTempUser(user)}
                                                >
                                                    Add
                                                </Button>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCard>
                                )
                            }
                        })}

                    </Paper>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={handleClose}>Cancel</Button> */}
                    <Button onClick={handleClose}>Done</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditGroup