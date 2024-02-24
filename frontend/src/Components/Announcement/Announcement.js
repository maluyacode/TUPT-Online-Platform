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

// const announcements = [
//     {
//         title: 'Important Announcement 1',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus odio et urna efficitur, in gravida eros luctus.',
//         image: 'https://via.placeholder.com/150',
//         postedDate: '2024-02-20'
//     },
//     {
//         title: 'Upcoming Event 1',
//         content: 'Nulla vitae libero pharetra, egestas libero at, lacinia leo. Duis suscipit, ligula ut fermentum luctus, justo nulla consequat urna, nec consequat est mi eget metus.',
//         image: 'https://via.placeholder.com/150',
//         postedDate: '2024-02-21'
//     },
//     {
//         title: 'Holiday Closure 1',
//         content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas vel ultricies magna.',
//         image: 'https://via.placeholder.com/150',
//         postedDate: '2024-02-22'
//     },
//     {
//         title: 'Important Announcement 2',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus odio et urna efficitur, in gravida eros luctus.',
//         image: 'https://via.placeholder.com/150',
//         postedDate: '2024-02-23'
//     },
//     {
//         title: 'Upcoming Event 2',
//         content: 'Nulla vitae libero pharetra, egestas libero at, lacinia leo. Duis suscipit, ligula ut fermentum luctus, justo nulla consequat urna, nec consequat est mi eget metus.',
//         image: 'https://via.placeholder.com/150',
//         postedDate: '2024-02-24'
//     },
//     {
//         title: 'Holiday Closure 2',
//         content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas vel ultricies magna.',
//         image: 'https://via.placeholder.com/150',
//         postedDate: '2024-02-25'
//     },
//     {
//         title: 'Important Announcement 3',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus odio et urna efficitur, in gravida eros luctus.',
//         image: 'https://via.placeholder.com/150',
//         postedDate: '2024-02-26'
//     },
//     {
//         title: 'Upcoming Event 3',
//         content: 'Nulla vitae libero pharetra, egestas libero at, lacinia leo. Duis suscipit, ligula ut fermentum luctus, justo nulla consequat urna, nec consequat est mi eget metus.',
//         image: 'https://via.placeholder.com/150',
//         postedDate: '2024-02-27'
//     },
//     {
//         title: 'Holiday Closure 3',
//         content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas vel ultricies magna.',
//         image: 'https://via.placeholder.com/150',
//         postedDate: '2024-02-28'
//     },
//     {
//         title: 'Important Announcement 4',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus odio et urna efficitur, in gravida eros luctus.',
//         image: 'https://via.placeholder.com/150',
//         postedDate: '2024-02-29'
//     },
//     {
//         title: 'Upcoming Event 4',
//         content: 'Nulla vitae libero pharetra, egestas libero at, lacinia leo. Duis suscipit, ligula ut fermentum luctus, justo nulla consequat urna, nec consequat est mi eget metus.',
//         image: 'https://via.placeholder.com/150',
//         postedDate: '2024-03-01'
//     },
//     {
//         title: 'Holiday Closure 4',
//         content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas vel ultricies magna.',
//         image: 'https://via.placeholder.com/150',
//         postedDate: '2024-03-02'
//     },
//     {
//         title: 'Important Announcement 5',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus odio et urna efficitur, in gravida eros luctus.',
//         image: 'https://via.placeholder.com/150',
//         postedDate: '2024-03-03'
//     },
//     {
//         title: 'Upcoming Event 5',
//         content: 'Nulla vitae libero pharetra, egestas libero at, lacinia leo. Duis suscipit, ligula ut fermentum luctus, justo nulla consequat urna, nec consequat est mi eget metus.',
//         image: 'https://via.placeholder.com/150',
//         postedDate: '2024-03-04'
//     },
//     {
//         title: 'Holiday Closure 5',
//         content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas vel ultricies magna.',
//         image: 'https://via.placeholder.com/150',
//         postedDate: '2024-03-05'
//     },
//     // Add more announcements as needed
// ];


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
                                                    <MDBCardImage style={{ height: 150, width: 150, objectFit: 'cover' }} src={announcement.images[0].url} fluid />
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