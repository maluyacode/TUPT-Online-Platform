import React, { useEffect, useState } from 'react'
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import { Box, Divider, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AttachmentIcon from '@mui/icons-material/Attachment';
import GroupsIcon from '@mui/icons-material/Groups';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'

import { useNavigate } from 'react-router-dom';

import MetaData from '../Layout/MetaData'
import SideNav from '../Layout/SideNav'
import TopBar from '../Layout/TopBar'
import { getMyAnnouncements } from '../../api/announcementsAPI';
import { getUser } from '../../utils/helper';
import ToastEmmiter from '../Layout/ToastEmmiter';
import Block from '../Layout/Loaders/Block';
import axios from 'axios';

const TeachersPosts = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [announcements, setAnnouncements] = useState([]);
    const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);


    const getAnnouncements = async () => {
        setLoading(true);
        const { data } = await getMyAnnouncements(getUser()._id);
        console.log(data);
        if (data.success) {
            setLoading(false);
            setAnnouncements(data.announcements)
            setFilteredAnnouncements(data.announcements)
        } else {
            setLoading(false);
            ToastEmmiter.warning('System error, Please try again later', 'top-right')
        }
    }

    const deleteAnnouncement = async (id) => {
        setLoading(true)
        try {

            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/announcement/delete/${id}`, {
                withCredentials: true,
            })

            setLoading(false)
            ToastEmmiter.success(data.message, 'top-right')
            getAnnouncements()

        } catch (err) {
            setLoading(false)
            console.log(err)
            ToastEmmiter.error('Error occured', 'top-right')
        }
    }

    const handleDelete = (id) => {
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
                deleteAnnouncement(id)
            }
        });
    }

    useEffect(() => {
        getAnnouncements();
    }, [])

    const handleSearch = e => {
        const keyword = e.target.value;
        const regex = new RegExp(keyword, 'i');
        const filteredAnnouncements = announcements.filter(
            announcement =>
                regex.test(announcement.title) || regex.test(announcement.groupViewers?.groupName)
        );
        setFilteredAnnouncements(filteredAnnouncements);
    }

    return (
        <>
            <Block loading={loading} />
            <MetaData pageTitle="Announcements" />
            <div style={{ display: 'flex', minHeight: '100vh' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <MDBContainer fluid style={{ maxWidth: '1500px' }}>
                        <MDBRow className='pt-3 mb-4'>

                            <MDBCol sm={'12'}>
                                <Box className='d-flex w-100 justify-content-between'>
                                    <Typography variant='h5'>My Announcements</Typography>
                                    <TextField sx={{ width: '40%' }} size='small' placeholder='Search post'
                                        onChange={handleSearch}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Box>
                            </MDBCol>

                        </MDBRow>

                        <MDBRow>
                            {filteredAnnouncements?.map(announcement => (
                                <MDBCol md={4} className='mb-4'>
                                    <Paper className='p-3' >
                                        <Box className='d-flex justify-content-between'>
                                            <Typography className='text-body mb-2' fontSize={12}>
                                                Posted on {
                                                    new Date(announcement.createdAt)
                                                        .toLocaleDateString('en-PH', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: '2-digit'
                                                        })
                                                }
                                            </Typography>
                                            <Box>
                                                <IconButton onClick={() => navigate(`/edit-announcement/${announcement._id}`)} size='small'>
                                                    <EditIcon fontSize='small' />
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(announcement._id)} size='small'>
                                                    <DeleteIcon fontSize='small' />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        <Typography onClick={() => {
                                            navigate(`/announcement-details/${announcement._id}`)
                                        }} className='fw-bold mb-2' sx={{
                                            cursor: 'pointer', '&:hover': {
                                                color: 'red', // Change this to the desired color
                                            },
                                        }} fontSize={20}>{announcement.title}</Typography>
                                        <Typography variant='body'>{announcement.content.substring(0, 50)}...</Typography>

                                        <Divider className='mt-3 mb-2' sx={{ borderBottom: 1 }} />
                                        <Box className='d-flex gap-5 '>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <VisibilityIcon sx={{ marginRight: 1 }} />
                                                <Typography className='text-body' fontSize={14}>{announcement.viewedBy?.length}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <AttachmentIcon sx={{ marginRight: 1 }} />
                                                <Typography className='text-body' fontSize={14}>{announcement.attachments?.length}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <GroupsIcon sx={{ marginRight: 1 }} />
                                                <Typography className='text-body' fontSize={14}>
                                                    {announcement.isForAll ? "For All" :
                                                        announcement?.groupViewers?.groupName ? announcement?.groupViewers?.groupName : "Deleted Group"
                                                    }
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </MDBCol>
                            ))}
                        </MDBRow>
                    </MDBContainer>

                </main >

            </div >
        </>
    )
}

export default TeachersPosts