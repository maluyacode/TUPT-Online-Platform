import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBRow, MDBBadge, MDBIcon } from 'mdb-react-ui-kit'
import { Box, Button, TextField, Typography } from '@mui/material'
import CalendarMonth from '@mui/icons-material/CalendarMonth'
import GroupsIcon from '@mui/icons-material/Groups';

import TopBar from '../Layout/TopBar'
import MetaData from '../Layout/MetaData'
import SideNav from '../Layout/SideNav'

import { useNavigate, useParams } from 'react-router-dom'
import { fetchTeachersPost, getAnnouncement } from '../../api/announcementsAPI'
import ToastEmmiter from '../Layout/ToastEmmiter'
import Block from '../Layout/Loaders/Block'
import { getUser } from '../../utils/helper'
import { profileHead } from '../../utils/avatar';

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


const TeacherAnnouncements = () => {

    const [loading, setLoading] = useState(false);

    const { teacherId } = useParams();
    const navigate = useNavigate();
    const [announcements, setAnnouncements] = useState([]);
    const [teacher, setTeacher] = useState({});

    const getAnnouncements = async () => {
        setLoading(true);
        const { data } = await fetchTeachersPost(teacherId);

        if (data.success) {
            setLoading(false)
            setAnnouncements(data.announcements);
            setTeacher(data.teacher)
        } else {
            setLoading(false)
            ToastEmmiter.error('Error occured', 'top-right');
        }
    }

    useEffect(() => {
        getAnnouncements();
    }, [])

    console.log(announcements)

    return (
        <>
            <MetaData pageTitle="Announcements" />
            <Block loading={loading} />
            <div style={{ display: 'flex', height: '100vh' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <MDBContainer style={{ maxWidth: 1000 }} className='mt-4'>
                        <MDBRow>
                            <MDBCol>
                                <Box sx={{ boxShadow: 5, py: 2, px: 3 }} className='d-flex gap-3'>
                                    {profileHead(teacher, 75, 75, 30, 5)}
                                    <Box>
                                        <Typography variant='h5'>{teacher.firstname} {teacher.lastname} Announcements</Typography>
                                        <MDBBadge color='success' light>Teacher</MDBBadge>
                                    </Box>
                                </Box>
                                <Box sx={{ boxShadow: 5, py: 2, px: 3, overflowY: 'auto', maxHeight: '73vh' }}>
                                    {!announcements.map(announcement => isAllowedToView(announcement)).includes(true) && (
                                        <Box>
                                            <Typography>Nothing to show</Typography>
                                        </Box>
                                    )}
                                    {announcements.map(announcement => (
                                        <>
                                            {isAllowedToView(announcement) && (
                                                <MDBCard onClick={() => navigate('/announcement-details/sampleId')} style={{ cursor: 'pointer' }} className='mb-2'>
                                                    <MDBRow className='g-0'>
                                                        <MDBCol md='3' sm='3' xs='3'>
                                                            <MDBCardImage style={{ height: 150, width: 150, objectFit: 'cover' }} src={announcement?.images[0]?.url || '/bullhorn.svg'} fluid />
                                                        </MDBCol>
                                                        <MDBCol md='9' sm='9' xs='9'>
                                                            <MDBCardBody className='ps-2'>
                                                                <MDBCardTitle>{announcement.title}</MDBCardTitle>
                                                                <MDBCardText>
                                                                    {announcement.content.substring(0, 50) + '...'}
                                                                </MDBCardText>
                                                                <MDBCardText className='d-flex align-items-center gap-1'>
                                                                    <CalendarMonth />
                                                                    <Typography className='me-3'>
                                                                        {formatDate(announcement.createdAt, announcement.updatedAt)}
                                                                    </Typography>
                                                                    <GroupsIcon />
                                                                    <Typography className='me-3'>
                                                                        {announcement.isForAll ? 'For everyone' :
                                                                            announcement?.groupViewers?.groupName}
                                                                    </Typography>
                                                                </MDBCardText>
                                                            </MDBCardBody>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCard>
                                            )}
                                        </>
                                    ))}
                                </Box>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </main>
            </div>
        </>
    )
}

const isAllowedToView = (announcement) => {

    if (!announcement.groupViewers) {
        return true
    } else {

        if (announcement.groupViewers.members.includes(getUser()._id) || announcement.createdBy._id === getUser()._id) {
            return true
        }

    }
    return false
}

function formatDate(createdAt, updatedAt) {

    let texIndication = ''

    if (createdAt !== updatedAt) {
        texIndication = 'Reannounced'
    }
    return `${texIndication} ${new Date(updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
}

export default TeacherAnnouncements