import React, { useEffect, useState } from 'react'
import { MDBBadge, MDBCard, MDBCardImage, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import { Badge, Box, Button, IconButton, Paper, TextField, Typography } from '@mui/material'

import readXlsxFile from 'read-excel-file'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import SideNav from '../Layout/SideNav'
import TopBar from '../Layout/TopBar'
import MetaData from '../Layout/MetaData'
import DropzoneFile from '../Generic/DropzoneFile'
import ToastEmmiter from '../Layout/ToastEmmiter'

import { Validate as validator } from '../ValidationSchema/Validations'
import Block from '../Layout/Loaders/Block'

const CreateGroup = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    const [groupUsers, setGroupUsers] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [coverPhoto, setCoverPhoto] = useState([]);

    const usersToBeAdded = async (emailAddresses) => {
        setLoading(true)
        try {

            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/group/get-users-to-be-added`, {
                emails: emailAddresses
            }, {
                withCredentials: true
            })

            setGroupUsers(data.users);
            setLoading(false)
        } catch (err) {
            alert('Error Occured');
            console.log(err);
        }
    }

    const handleChange = e => {

        readXlsxFile(e.target.files[0]).then((rows) => {
            let indexOfEmail = rows[0].indexOf('email');
            if (indexOfEmail < 0) {
                alert('Please provide email address list in your excel')
                return;
            }
            const emailAddresses = rows.map(item => {
                return item[indexOfEmail]
            }, null)

            emailAddresses.shift();
            usersToBeAdded(emailAddresses)
        })

    }

    const createGroup = async () => {

        if (groupName === '') {
            return ToastEmmiter.warning('Group Name should not be empty', 'top-center');
        }
        console.log(coverPhoto.length)
        if (coverPhoto.length <= 0) {
            return ToastEmmiter.warning('Cover Photo should not be empty', 'top-center');
        } console.log(groupUsers.length)
        if (groupUsers.length <= 0) {
            return ToastEmmiter.warning('Group Users should not be empty', 'top-center');
        }

        setLoading(true)
        try {
            const formData = new FormData;
            const members = groupUsers.map(user => { return user._id })

            formData.append('groupName', groupName)
            formData.append('members', JSON.stringify(members))
            formData.append('coverPhoto', coverPhoto[0])

            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/group/create`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })

            setLoading(false)
            ToastEmmiter.success('Group created successfully', 'top-right')
            navigate('/announcements')

        } catch (err) {
            setLoading(false)
            console.log(err)
            ToastEmmiter.error('Error occured', 'top-right')
        }
    }

    useEffect(() => {
        if (coverPhoto.length > 1) {
            ToastEmmiter.error('One cover photo only', 'top-right')
        }
    }, [coverPhoto])

    return (
        <>
            <Block loading={loading} />
            <MetaData pageTitle='Create Group' />
            <div style={{ display: 'flex', height: '100vh', }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <MDBContainer style={{ maxWidth: 1000 }} className='mt-4'>
                        <MDBRow>
                            <MDBCol>
                                <Box sx={{ boxShadow: 5, p: 2 }}>

                                    <TextField onChange={e => setGroupName(e.target.value)} className='mb-4' fullWidth label='Group name' type='text' size='small' />

                                    <Typography className='mb-2'>Upload group photo</Typography>
                                    <DropzoneFile setImages={setCoverPhoto} />
                                </Box>
                            </MDBCol>
                            <MDBCol>
                                <Box sx={{ boxShadow: 5, p: 2 }}>

                                    <Typography className='mb-2'>Upload excel file to create a group</Typography>
                                    <TextField onChange={handleChange} className='mb-4' fullWidth placeholder='Upload file' type='file' size='small' InputLabelProps={{
                                        shrink: true,
                                    }}
                                        inputProps={{
                                            accept: '.xls, .xlsx', // Specify accepted Excel file types
                                        }} />

                                    <Typography className='mb-2'>List of Accounts</Typography>
                                    <Paper sx={{ height: 350, overflowY: 'scroll' }} className='p-4 bg-secondary mb-4'>
                                        {groupUsers.length > 0 ?
                                            <>
                                                {groupUsers.map(user => (

                                                    <MDBCard className='p-2 px-4 mb-2'>
                                                        <MDBRow>
                                                            <MDBCol sm={'3'} className='d-flex justify-content-center align-items-center'>
                                                                <MDBCardImage style={{ height: 50, width: 50, objectFit: 'cover', borderRadius: '50%' }} src={user?.avatar?.url || 'https://via.placeholder.com/150'} fluid />
                                                            </MDBCol>
                                                            <MDBCol sm={'5'} className='d-flex justify-content-start align-items-center'>
                                                                <Typography>
                                                                    {user.firstname} {user.lastname}
                                                                </Typography>
                                                            </MDBCol>
                                                            <MDBCol sm={'2'} className='d-flex justify-content-start align-items-center'>
                                                                <MDBBadge pill light>{user.role}</MDBBadge>
                                                            </MDBCol>
                                                            <MDBCol sm={'2'} className='d-flex justify-content-start align-items-center'>
                                                                <MDBBadge color='secondary' pill light>Profile</MDBBadge>
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </MDBCard>

                                                ))}
                                            </>
                                            :
                                            <Typography className='text-center text-dark'>Nothing to show</Typography>
                                        }

                                    </Paper>

                                    <Button onClick={createGroup} size='medium' variant='outlined' color='success' sx={{ margin: 'auto' }}>Create Group</Button>

                                </Box>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </main>
            </div>
        </>
    )
}

export default CreateGroup