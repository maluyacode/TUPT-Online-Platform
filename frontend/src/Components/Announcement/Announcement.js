import React, { useEffect, useState } from 'react'
import SideNav from '../Layout/SideNav'
import MetaData from '../Layout/MetaData'
import TopBar from '../Layout/TopBar'
import {
    MDBContainer,
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';

import {
    Box, Button, Divider, Typography
} from '@mui/material'

import {
    useNavigate
} from 'react-router-dom'

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupList from './GroupList';
import TeachersList from './TeachersList';

import { getAnnouncements } from '../../api/announcementsAPI';
import ToastEmmiter from '../Layout/ToastEmmiter';

const Announcement = () => {
    const navigate = useNavigate();

    const [announcements, setAnnouncements] = useState([]);

    const getAllAnnouncemets = async () => {

        const { data } = await getAnnouncements();

        if (data.success) {
            setAnnouncements(data.announcements);
        } else {
            ToastEmmiter.error('Error occured', 'top-right');
        }
    }

    useEffect(() => {
        getAllAnnouncemets()
    }, [])

    return (
        <>
            <MetaData pageTitle="Announcements" />
            <div style={{ display: 'flex' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <MDBContainer fluid style={{ maxWidth: '1500px' }}>
                        <MDBRow className='pt-3'>

                            <MDBCol sm={'12'} md='6'>
                                <Typography variant='h5' sx={{ position: 'sticky', top: 0 }}>Announcements</Typography>
                                <Divider sx={{ my: 1.5, borderBottom: 3, position: 'sticky', top: '48px' }} />
                                <Box sx={{ boxShadow: 5, py: 2, px: 3, overflowY: 'scroll', maxHeight: '81vh' }}>
                                    {announcements.map((announcement, i) => (
                                        <MDBCard key={`announcement${i}`} onClick={() => navigate(`/announcement-details/${announcement._id}`)} style={{ cursor: 'pointer' }} className='mb-2'>
                                            <MDBRow className='g-0'>
                                                <MDBCol md='3' sm='3' xs='3'>
                                                    <MDBCardImage style={{ height: 150, width: 150, objectFit: 'cover' }} src={announcement.images[0]?.url} fluid />
                                                </MDBCol>
                                                <MDBCol md='9' sm='9' xs='9'>
                                                    <MDBCardBody className='ps-2'>
                                                        <MDBCardTitle>{announcement.title}</MDBCardTitle>
                                                        <MDBCardText>
                                                            {announcement.content.substring(0, 50) + '...'}
                                                        </MDBCardText>
                                                        <MDBCardText className='d-flex gap-1'>
                                                            <CalendarMonthIcon /> <span>{formatedDate(announcement.createdAt)}</span>
                                                        </MDBCardText>
                                                    </MDBCardBody>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCard>
                                    ))}
                                </Box>
                            </MDBCol>

                            <MDBCol sm={'12'} md='3'>
                                <TeachersList />
                            </MDBCol>

                            <MDBCol sm={'12'} md='3'>
                                <GroupList />
                            </MDBCol>

                        </MDBRow>
                    </MDBContainer>

                </main >

            </div >
        </>
    )
}

const formatedDate = (date) => {
    return new Date(date).toLocaleDateString('en-PH', { year: 'numeric', day: '2-digit', month: 'long' })
}

export default Announcement