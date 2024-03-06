import React, { useEffect, useState } from 'react'
import TopBar from '../Layout/TopBar'
import SideNav from '../Layout/SideNav'
import RegressionChart from './Charts/RegressionChart'
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import { Box, Divider, Paper, Typography } from '@mui/material'
import FiberNewIcon from '@mui/icons-material/FiberNew';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { fetchTotalAnnouncements, fetchTotalMessages, fetchTotalTopics, fetchTotalUsers } from '../../api/dashboardsApi'
import ToastEmmiter from '../Layout/ToastEmmiter'
import Block from '../Layout/Loaders/Block'
import MetaData from '../Layout/MetaData'
import IncidentsChart from './Charts/IncidentsChart'
import MostIncidentsOccur from './Charts/MostIncidentOccur'
import IncidentLocations from './Charts/IncidentLocations'

const Dashboard = () => {

    const [loading, setLoading] = useState();

    const [totalUsers, setTotalUsers] = useState(0);
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalTeachers, setTotalTeachers] = useState(0);
    const [totalParents, setTotalParents] = useState(0);

    const [totalAnnoucements, setTotalAnnouncements] = useState(0);
    const [latestAnnouncement, setLatestAnnouncement] = useState({});

    const [totalMessages, setTotalMessages] = useState(0);
    const [avgMessagesPerDay, setAvgMessagesPerDay] = useState(0);

    const [totalTopics, setTotalTopics] = useState(0);
    const [latestTopic, setLatestTopic] = useState(0);


    const getTotalUsers = async () => {

        setLoading(true)

        const { data } = await fetchTotalUsers();
        if (data.success) {
            setLoading(false)
            setTotalUsers(data.totalUsers)
            setTotalStudents(data.totalStudents)
            setTotalTeachers(data.totalTeachers)
            setTotalParents(data.totalParents)
        } else {
            setLoading(false)
            ToastEmmiter.error('System error, please try again later', 'top-center')
        }

    }

    const getTotalAnnouncements = async () => {
        setLoading(true)

        const { data } = await fetchTotalAnnouncements();
        if (data.success) {
            setLoading(false)
            setTotalAnnouncements(data.totalAnnoucements)
            setLatestAnnouncement(data.latestAnnouncement)
        } else {
            setLoading(false)
            ToastEmmiter.error('System error, please try again later', 'top-center')
        }

    }

    const getTotalMessages = async () => {

        setLoading(true)

        const { data } = await fetchTotalMessages();
        if (data.success) {
            setLoading(false)
            setTotalMessages(data.totalMessages)
            setAvgMessagesPerDay(data.averageMessagesPerDay)
        } else {
            setLoading(false)
            ToastEmmiter.error('System error, please try again later', 'top-center')
        }

    }

    const getTotalTopics = async () => {

        setLoading(true)

        const { data } = await fetchTotalTopics();
        if (data.success) {
            setLoading(false)
            setTotalTopics(data.totalTopics)
            setLatestTopic(data.latestTopic)
        } else {
            setLoading(false)
            ToastEmmiter.error('System error, please try again later', 'top-center')
        }

    }

    useEffect(() => {
        getTotalUsers()
        getTotalAnnouncements()
        getTotalMessages()
        getTotalTopics()
    }, [])

    console.log(totalAnnoucements)
    return (
        <div style={{ display: 'flex', height: 'fit-content' }}>
            <MetaData pageTitle='Dashboard' />
            <Block loading={loading} />
            <SideNav />
            <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                <TopBar />
                <MDBContainer fluid>
                    <MDBRow className='mt-3 '>
                        <MDBCol className='mb-3' style={{ minWidth: 300 }}>
                            <Paper className='p-4' sx={{ boxShadow: 5, }}>
                                <Typography className='mb-1' fontSize={20}>Total Users</Typography>
                                <Divider sx={{ borderBottom: 2 }} />
                                <Typography className='fw-bold' fontSize={50} textAlign={'center'}>{totalUsers}</Typography>
                                <Divider sx={{ borderBottom: 2 }} />
                                <Box className='d-flex justify-content-between px-1 mt-2'>
                                    <Box>
                                        <Typography className='fw-light'>Teachers</Typography>
                                        <Typography className='fw-bold' textAlign={'center'}>{totalTeachers}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography className='fw-light'>Students</Typography>
                                        <Typography className='fw-bold' textAlign={'center'}>{totalStudents}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography className='fw-light'>Parents</Typography>
                                        <Typography className='fw-bold' textAlign={'center'}>{totalParents}</Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </MDBCol>
                        <MDBCol className='mb-3' style={{ minWidth: 300 }}>
                            <Paper className='p-4' sx={{ boxShadow: 5 }}>
                                <Typography className='mb-1' fontSize={20}>Total Announcements</Typography>
                                <Divider sx={{ borderBottom: 2 }} />
                                <Typography className='fw-bold' fontSize={50} textAlign={'center'}>{totalAnnoucements}</Typography>
                                <Divider sx={{ borderBottom: 2 }} />
                                <Box className='d-flex justify-content-center px-1 mt-2'>
                                    <Box className='d-flex flex-column align-items-center'>
                                        <FiberNewIcon />
                                        <Typography className='fw-light'>{latestAnnouncement?.title?.substring(0, 20)}...</Typography>
                                    </Box>
                                    {/* <Box className='d-flex gap-2' >
                                        <TrendingUpIcon />
                                        <Typography className='fw-light'>Flood at the motor parking lot...</Typography>
                                    </Box> */}
                                </Box>
                            </Paper>
                        </MDBCol>
                        <MDBCol className='mb-3' style={{ minWidth: 300 }}>
                            <Paper className='p-4' sx={{ boxShadow: 5 }}>
                                <Typography className='mb-1' fontSize={20}>Total Messages</Typography>
                                <Divider sx={{ borderBottom: 2 }} />
                                <Typography className='fw-bold' fontSize={50} textAlign={'center'}>{totalMessages}</Typography>
                                <Divider sx={{ borderBottom: 2 }} />
                                <Box className='d-flex justify-content-center px-1 mt-2'>
                                    <Box>
                                        <Typography className='fw-light'>Average Message Per Day</Typography>
                                        <Typography className='fw-bold' textAlign={'center'}>{avgMessagesPerDay}</Typography>
                                    </Box>
                                    {/* <Box>
                                        <Typography className='fw-light'>/Week</Typography>
                                        <Typography className='fw-bold' textAlign={'center'}>12</Typography>
                                    </Box>
                                    <Box>
                                        <Typography className='fw-light'>/Month</Typography>
                                        <Typography className='fw-bold' textAlign={'center'}>34</Typography>
                                    </Box>
                                    <Box>
                                        <Typography className='fw-light'>/Year</Typography>
                                        <Typography className='fw-bold' textAlign={'center'}>34</Typography>
                                    </Box> */}
                                </Box>
                            </Paper>
                        </MDBCol>
                        <MDBCol className='mb-3' style={{ minWidth: 300 }}>
                            <Paper className='p-4' sx={{ boxShadow: 5 }}>
                                <Typography className='mb-1' fontSize={20}>Total Forum Topics</Typography>
                                <Divider sx={{ borderBottom: 2 }} />
                                <Typography className='fw-bold' fontSize={50} textAlign={'center'}>{totalTopics}</Typography>
                                <Divider sx={{ borderBottom: 2 }} />
                                <Box className='d-flex justify-content-center px-1 mt-2 '>
                                    {/* <Box className='d-flex gap-2' >
                                        <Typography className='fw-light'>Most commented: </Typography>
                                        <Typography className='fw-bold'>sadsaasdasd</Typography>
                                    </Box> */}
                                    <Box >
                                        <Typography className='fw-light' textAlign={'center'}>Latest Topic</Typography>
                                        <Typography className='fw-bold' textAlign={'center'}>{latestTopic?.heading}</Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className='mt-2'>
                        <MDBCol md={6}>
                            <IncidentsChart />
                            <IncidentLocations />
                        </MDBCol>
                        <MDBCol md={6}>
                            <MostIncidentsOccur />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </main>
        </div>
    )
}

export default Dashboard