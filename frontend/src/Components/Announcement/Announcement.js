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

    const [groupDate, setGroupDate] = useState({
        today: [],
        lastDay: [],
        otherDays: [],
    })

    const setGroups = (announcements) => {
        const today = [];
        const lastDay = [];
        const otherDays = [];
        announcements.forEach((announcement) => {
            const dateCategory = isTodayOrYesterday(new Date(announcement.updatedAt));
            if (dateCategory === 'Today') {
                today.push(announcement);
            } else if (dateCategory === 'Yesterday') {
                lastDay.push(announcement);
            } else {
                otherDays.push(announcement);
            }
        });

        // Update the state with categorized announcements
        setGroupDate({
            today: today,
            lastDay: lastDay,
            otherDays: otherDays
        });
    };


    const getAllAnnouncemets = async () => {

        const { data } = await getAnnouncements();

        if (data.success) {
            setAnnouncements(data.announcements);
            setGroups(data.announcements)
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

                            <MDBCol sm={'12'} md='12' lg={'6'}>
                                <Typography variant='h6' sx={{ position: 'sticky', top: 0 }}>Announcements For Everyone</Typography>
                                <Divider sx={{ my: 1.5, borderBottom: 3, position: 'sticky', top: '48px' }} />
                                <Box sx={{ boxShadow: 5, py: 2, px: 3, overflowY: 'auto', maxHeight: '81vh' }}>
                                    {groupDate?.today?.length > 0 && (
                                        <>
                                            <Typography fontSize={20} textAlign={'center'}>Today</Typography>
                                            {groupDate?.today?.map((announcement, i) => (
                                                <MDBCard key={`announcement${i}`} onClick={() => navigate(`/announcement-details/${announcement._id}`)} style={{ cursor: 'pointer' }} className='mb-2'>
                                                    <MDBRow className='g-0'>
                                                        <MDBCol md='3' sm='3' xs='3' className='d-flex justify-content-center'>
                                                            <MDBCardImage style={{ height: 150, width: 150, objectFit: 'cover' }} src={announcement.images[0]?.url || '/bullhorn.svg'} fluid />
                                                        </MDBCol>
                                                        <MDBCol md='9' sm='9' xs='9'>
                                                            <MDBCardBody className='ps-2'>
                                                                <MDBCardTitle>{announcement.title}</MDBCardTitle>
                                                                <MDBCardText>
                                                                    {announcement.content.substring(0, 50) + '...'}
                                                                </MDBCardText>
                                                                <MDBCardText className='d-flex gap-1'>
                                                                    <CalendarMonthIcon /> <span>{formatDate(announcement.createdAt, announcement.updatedAt)}</span>
                                                                </MDBCardText>
                                                            </MDBCardBody>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCard>
                                            ))}
                                        </>
                                    )}

                                    {groupDate?.lastDay?.length > 0 && (
                                        <>
                                            <Typography fontSize={20} textAlign={'center'}>Last Day</Typography>
                                            {groupDate?.lastDay?.map((announcement, i) => (
                                                <MDBCard key={`announcement${i}`} onClick={() => navigate(`/announcement-details/${announcement._id}`)} style={{ cursor: 'pointer' }} className='mb-2'>
                                                    <MDBRow className='g-0'>
                                                        <MDBCol md='3' sm='3' xs='3'>
                                                            <MDBCardImage style={{ height: 150, width: 150, objectFit: 'cover' }} src={announcement.images[0]?.url || '/bullhorn.svg'} fluid />
                                                        </MDBCol>
                                                        <MDBCol md='9' sm='9' xs='9'>
                                                            <MDBCardBody className='ps-2'>
                                                                <MDBCardTitle>{announcement.title}</MDBCardTitle>
                                                                <MDBCardText>
                                                                    {announcement.content.substring(0, 50) + '...'}
                                                                </MDBCardText>
                                                                <MDBCardText className='d-flex gap-1'>
                                                                    <CalendarMonthIcon /> <span>{formatDate(announcement.createdAt, announcement.updatedAt)}</span>
                                                                </MDBCardText>
                                                            </MDBCardBody>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCard>
                                            ))}
                                        </>
                                    )}

                                    {groupDate?.otherDays?.length > 0 && (
                                        <>
                                            <Typography fontSize={20} textAlign={'center'}>Other Days</Typography>
                                            {groupDate?.otherDays?.map((announcement, i) => (
                                                <MDBCard key={`announcement${i}`} onClick={() => navigate(`/announcement-details/${announcement._id}`)} style={{ cursor: 'pointer' }} className='mb-2'>
                                                    <MDBRow className='g-0'>
                                                        <MDBCol md='3' sm='3' xs='3'>
                                                            <MDBCardImage style={{ height: 150, width: 150, objectFit: 'cover' }} src={announcement.images[0]?.url || '/bullhorn.svg'} fluid />
                                                        </MDBCol>
                                                        <MDBCol md='9' sm='9' xs='9'>
                                                            <MDBCardBody className='ps-2'>
                                                                <MDBCardTitle>{announcement.title}</MDBCardTitle>
                                                                <MDBCardText>
                                                                    {announcement.content.substring(0, 50) + '...'}
                                                                </MDBCardText>
                                                                <MDBCardText className='d-flex gap-1'>
                                                                    <CalendarMonthIcon /> <span>{formatDate(announcement.createdAt, announcement.updatedAt)}</span>
                                                                </MDBCardText>
                                                            </MDBCardBody>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCard>
                                            ))}
                                        </>
                                    )}
                                </Box>
                            </MDBCol>

                            <MDBCol sm={'12'} md='6' lg={'3'}>
                                <TeachersList />
                            </MDBCol>

                            <MDBCol sm={'12'} md='6' lg={'3'}>
                                <GroupList />
                            </MDBCol>

                        </MDBRow>
                    </MDBContainer>

                </main >

            </div >
        </>
    )
}

function isTodayOrYesterday(dateToCheck) {
    // Get the current date
    const currentDate = new Date();

    // Create a date for yesterday
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);

    // Check if the date is equal to today
    if (dateToCheck.toDateString() === currentDate.toDateString()) {
        return "Today";
    }

    // Check if the date is equal to yesterday
    if (dateToCheck.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
    }

    // If the date is neither today nor yesterday, return null
    return null;
}

function formatDate(createdAt, updatedAt) {

    let texIndication = ''

    if (createdAt !== updatedAt) {
        texIndication = 'Reannounced'
    }
    return `${texIndication} ${new Date(updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
}

export default Announcement