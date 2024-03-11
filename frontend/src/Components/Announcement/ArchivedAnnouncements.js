import React, { useEffect, useState } from 'react'
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import { Alert, Box, Collapse, Divider, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import AttachmentIcon from '@mui/icons-material/Attachment';
import GroupsIcon from '@mui/icons-material/Groups';
import ArchiveIcon from '@mui/icons-material/Unarchive';
import CloseIcon from '@mui/icons-material/Close';

import { useNavigate } from 'react-router-dom';

import MetaData from '../Layout/MetaData'
import SideNav from '../Layout/SideNav'
import TopBar from '../Layout/TopBar'
import { archiveAnnouncementApi, getMyAnnouncements, unArchiveAnnouncementApi } from '../../api/announcementsAPI';
import { getUser } from '../../utils/helper';
import ToastEmmiter from '../Layout/ToastEmmiter';
import Block from '../Layout/Loaders/Block';
import axios from 'axios';

const ArchivedAnnouncements = () => {

    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    const [announcements, setAnnouncements] = useState([]);

    const getAnnouncements = async () => {
        setLoading(true);
        const { data } = await getMyAnnouncements(getUser()._id, true); // true, fetch archived
        if (data.success) {
            setLoading(false);
            setAnnouncements(data.announcements)
        } else {
            setLoading(false);
            ToastEmmiter.warning('System error, Please try again later', 'top-right')
        }
    }

    const unArchiveAnnouncement = async (id) => {
        setLoading(true);
        const { data } = await unArchiveAnnouncementApi(id);
        if (data.success) {
            setLoading(false);
            ToastEmmiter.success(data.message, 'top-right')
            getAnnouncements();
        } else {
            setLoading(false);
            ToastEmmiter.warning('System error, Please try again later', 'top-right')
        }
    }

    const handleArchive = (id) => {
        unArchiveAnnouncement(id)
    }

    useEffect(() => {
        getAnnouncements();
    }, [])

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
                                    <Typography variant='h5'>Archived Announcements</Typography>
                                </Box>
                            </MDBCol>

                        </MDBRow>

                        <MDBRow>
                            {announcements?.length > 0 && (
                                <Box sx={{ width: '100%' }}>
                                    <Collapse in={open}>
                                        <Alert
                                            action={
                                                <IconButton
                                                    aria-label="close"
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => {
                                                        setOpen(false);
                                                    }}
                                                >
                                                    <CloseIcon fontSize="inherit" />
                                                </IconButton>
                                            }
                                            sx={{ mb: 2 }}
                                        >
                                            Please note that archived items will be lost after 7 days. Ensure that you restore any important content before the expiration date to avoid permanent loss.
                                        </Alert>
                                    </Collapse>
                                </Box>
                            )}
                            {announcements?.length <= 0 && (
                                <Typography className='mt-5' textAlign={'center'}>Nothing to show</Typography>
                            )}
                            {announcements?.map(announcement => (
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
                                                <IconButton onClick={() => handleArchive(announcement._id)} size='small'>
                                                    <ArchiveIcon fontSize='small' />
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
                                            {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <VisibilityIcon sx={{ marginRight: 1 }} />
                                            <Typography className='text-body' fontSize={14}>{announcement.viewedBy?.length}</Typography>
                                        </Box> */}
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

export default ArchivedAnnouncements