import React from 'react'
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
    Box, Divider, Typography
} from '@mui/material'

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const teacherData = [
    { name: 'John Smith', image: 'https://via.placeholder.com/150' },
    { name: 'Mary Johnson', image: 'https://via.placeholder.com/150' },
    { name: 'David Williams', image: 'https://via.placeholder.com/150' },
    { name: 'Linda Brown', image: 'https://via.placeholder.com/150' },
    { name: 'Michael Jones', image: 'https://via.placeholder.com/150' },
    { name: 'Sarah Davis', image: 'https://via.placeholder.com/150' },
    { name: 'James Wilson', image: 'https://via.placeholder.com/150' },
    { name: 'Patricia Martinez', image: 'https://via.placeholder.com/150' },
    { name: 'Robert Anderson', image: 'https://via.placeholder.com/150' },
    { name: 'Barbara Taylor', image: 'https://via.placeholder.com/150' },
    { name: 'William Thomas', image: 'https://via.placeholder.com/150' },
    { name: 'Jennifer Garcia', image: 'https://via.placeholder.com/150' },
    { name: 'Richard Hernandez', image: 'https://via.placeholder.com/150' },
    { name: 'Susan Martinez', image: 'https://via.placeholder.com/150' },
    { name: 'Joseph Rodriguez', image: 'https://via.placeholder.com/150' },
    { name: 'Margaret Lopez', image: 'https://via.placeholder.com/150' },
    { name: 'Thomas Perez', image: 'https://via.placeholder.com/150' },
    { name: 'Dorothy Gonzalez', image: 'https://via.placeholder.com/150' },
    { name: 'Daniel Wilson', image: 'https://via.placeholder.com/150' },
    { name: 'Lisa Moore', image: 'https://via.placeholder.com/150' }
];

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

const announcements = [
    {
        title: 'Important Announcement 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus odio et urna efficitur, in gravida eros luctus.',
        image: 'https://via.placeholder.com/150',
        postedDate: '2024-02-20'
    },
    {
        title: 'Upcoming Event 1',
        content: 'Nulla vitae libero pharetra, egestas libero at, lacinia leo. Duis suscipit, ligula ut fermentum luctus, justo nulla consequat urna, nec consequat est mi eget metus.',
        image: 'https://via.placeholder.com/150',
        postedDate: '2024-02-21'
    },
    {
        title: 'Holiday Closure 1',
        content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas vel ultricies magna.',
        image: 'https://via.placeholder.com/150',
        postedDate: '2024-02-22'
    },
    {
        title: 'Important Announcement 2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus odio et urna efficitur, in gravida eros luctus.',
        image: 'https://via.placeholder.com/150',
        postedDate: '2024-02-23'
    },
    {
        title: 'Upcoming Event 2',
        content: 'Nulla vitae libero pharetra, egestas libero at, lacinia leo. Duis suscipit, ligula ut fermentum luctus, justo nulla consequat urna, nec consequat est mi eget metus.',
        image: 'https://via.placeholder.com/150',
        postedDate: '2024-02-24'
    },
    {
        title: 'Holiday Closure 2',
        content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas vel ultricies magna.',
        image: 'https://via.placeholder.com/150',
        postedDate: '2024-02-25'
    },
    {
        title: 'Important Announcement 3',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus odio et urna efficitur, in gravida eros luctus.',
        image: 'https://via.placeholder.com/150',
        postedDate: '2024-02-26'
    },
    {
        title: 'Upcoming Event 3',
        content: 'Nulla vitae libero pharetra, egestas libero at, lacinia leo. Duis suscipit, ligula ut fermentum luctus, justo nulla consequat urna, nec consequat est mi eget metus.',
        image: 'https://via.placeholder.com/150',
        postedDate: '2024-02-27'
    },
    {
        title: 'Holiday Closure 3',
        content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas vel ultricies magna.',
        image: 'https://via.placeholder.com/150',
        postedDate: '2024-02-28'
    },
    {
        title: 'Important Announcement 4',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus odio et urna efficitur, in gravida eros luctus.',
        image: 'https://via.placeholder.com/150',
        postedDate: '2024-02-29'
    },
    {
        title: 'Upcoming Event 4',
        content: 'Nulla vitae libero pharetra, egestas libero at, lacinia leo. Duis suscipit, ligula ut fermentum luctus, justo nulla consequat urna, nec consequat est mi eget metus.',
        image: 'https://via.placeholder.com/150',
        postedDate: '2024-03-01'
    },
    {
        title: 'Holiday Closure 4',
        content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas vel ultricies magna.',
        image: 'https://via.placeholder.com/150',
        postedDate: '2024-03-02'
    },
    {
        title: 'Important Announcement 5',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus odio et urna efficitur, in gravida eros luctus.',
        image: 'https://via.placeholder.com/150',
        postedDate: '2024-03-03'
    },
    {
        title: 'Upcoming Event 5',
        content: 'Nulla vitae libero pharetra, egestas libero at, lacinia leo. Duis suscipit, ligula ut fermentum luctus, justo nulla consequat urna, nec consequat est mi eget metus.',
        image: 'https://via.placeholder.com/150',
        postedDate: '2024-03-04'
    },
    {
        title: 'Holiday Closure 5',
        content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas vel ultricies magna.',
        image: 'https://via.placeholder.com/150',
        postedDate: '2024-03-05'
    },
    // Add more announcements as needed
];


const Announcement = () => {
    return (
        <>
            <MetaData pageTitle="Announcements" />
            <div style={{ display: 'flex', height: '100vh' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <MDBContainer fluid style={{ maxWidth: '1500px' }}>
                        <MDBRow className='pt-3'>

                            <MDBCol sm={'12'} md='6'>
                                <Typography variant='h5' sx={{ position: 'sticky', top: 0 }}>Announcements</Typography>
                                <Divider sx={{ my: 1.5, borderBottom: 3, position: 'sticky', top: '48px' }} />
                                <Box sx={{ boxShadow: 5, py: 2, px: 3, overflowY: 'scroll', maxHeight: 550 }}>
                                    {announcements.map(announcement => (
                                        <MDBCard style={{ cursor: 'pointer' }} className='mb-2'>
                                            <MDBRow className='g-0'>
                                                <MDBCol md='3' sm='3' xs='3'>
                                                    <MDBCardImage style={{ height: 150, width: 150, objectFit: 'cover' }} src={announcement.image} fluid />
                                                </MDBCol>
                                                <MDBCol md='9' sm='9' xs='9'>
                                                    <MDBCardBody className='ps-2'>
                                                        <MDBCardTitle>{announcement.title}</MDBCardTitle>
                                                        <MDBCardText>
                                                            {announcement.content.substring(0, 50) + '...'}
                                                        </MDBCardText>
                                                        <MDBCardText>
                                                            <CalendarMonthIcon />{announcement.postedDate}
                                                        </MDBCardText>
                                                    </MDBCardBody>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCard>
                                    ))}
                                </Box>
                            </MDBCol>

                            <MDBCol sm={'12'} md='3'>
                                <Typography variant='h5' sx={{ position: 'sticky', top: 0 }}>Teachers</Typography>
                                <Divider sx={{ my: 1.5, borderBottom: 3, position: 'sticky', top: '48px' }} />
                                <Box sx={{ boxShadow: 5, py: 2, px: 3, overflowY: 'scroll', maxHeight: 550 }}>
                                    {teacherData.map(teacher => (
                                        <MDBCard style={{ cursor: 'pointer', }} className='mb-2'>
                                            <MDBRow className='g-0'>
                                                <MDBCol xs={'2'} sm='2' md='4' className='d-flex justify-content-center align-items-center'>
                                                    <MDBCardImage style={{ height: 50, width: 50, objectFit: 'cover', borderRadius: '50%' }} src={teacher.image} fluid />
                                                </MDBCol>
                                                <MDBCol xs={'10'} sm='10' md={'8'}>
                                                    <MDBCardBody className='ps-0'>
                                                        {/* <MDBCardTitle>Popsicles Madriaga</MDBCardTitle> */}
                                                        <MDBCardText>
                                                            {teacher.name}
                                                        </MDBCardText>
                                                        {/* <MDBCardText>
                                                        <small className='text-muted'>Last updated 3 mins ago</small>
                                                    </MDBCardText> */}
                                                    </MDBCardBody>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCard>
                                    ))}
                                </Box>
                            </MDBCol>

                            <MDBCol sm={'12'} md='3'>
                                <Typography variant='h5' sx={{ position: 'sticky', top: 0 }}>Groups</Typography>
                                <Divider sx={{ my: 1.5, borderBottom: 3, position: 'sticky', top: '48px' }} />
                                <Box sx={{ boxShadow: 5, py: 2, px: 3, overflowY: 'scroll', maxHeight: 550 }}>
                                    {groupChatData.map(group => (
                                        <MDBCard style={{ cursor: 'pointer', }} className='mb-2'>
                                            <MDBRow className='g-0'>
                                                <MDBCol xs={'2'} sm='2' md='4' className='d-flex justify-content-center align-items-center'>
                                                    <MDBCardImage style={{ height: 50, width: 50, objectFit: 'cover', borderRadius: '50%' }} src={group.image} fluid />
                                                </MDBCol>
                                                <MDBCol xs={'10'} sm='10' md={'8'}>
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
                                            </MDBRow>
                                        </MDBCard>
                                    ))}
                                </Box>
                            </MDBCol>

                        </MDBRow>
                    </MDBContainer>

                </main >

            </div >
        </>
    )
}

export default Announcement