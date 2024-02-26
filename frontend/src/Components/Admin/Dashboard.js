import React from 'react'
import TopBar from '../Layout/TopBar'
import SideNav from '../Layout/SideNav'
import RegressionChart from './Charts/RegressionChart'
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import { Box, Divider, Paper, Typography } from '@mui/material'
import FiberNewIcon from '@mui/icons-material/FiberNew';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Dashboard = () => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <SideNav />
            <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                <TopBar />
                <MDBContainer fluid>
                    <MDBRow className='mt-3'>
                        <MDBCol md={3} >
                            <Paper className='p-4' sx={{ boxShadow: 5 }}>
                                <Typography className='mb-1' fontSize={20}>Total Users</Typography>
                                <Divider sx={{ borderBottom: 2 }} />
                                <Typography className='fw-bold' fontSize={50} textAlign={'center'}>123</Typography>
                                <Divider sx={{ borderBottom: 2 }} />
                                <Box className='d-flex justify-content-between px-1 mt-2'>
                                    <Box>
                                        <Typography className='fw-light'>Teachers</Typography>
                                        <Typography className='fw-bold' textAlign={'center'}>21</Typography>
                                    </Box>
                                    <Box>
                                        <Typography className='fw-light'>Students</Typography>
                                        <Typography className='fw-bold' textAlign={'center'}>12</Typography>
                                    </Box>
                                    <Box>
                                        <Typography className='fw-light'>Parents</Typography>
                                        <Typography className='fw-bold' textAlign={'center'}>34</Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </MDBCol>
                        <MDBCol md={3}>
                            <Paper className='p-4' sx={{ boxShadow: 5 }}>
                                <Typography className='mb-1' fontSize={20}>Total Announcements</Typography>
                                <Divider sx={{ borderBottom: 2 }} />
                                <Typography className='fw-bold' fontSize={50} textAlign={'center'}>20</Typography>
                                <Divider sx={{ borderBottom: 2 }} />
                                <Box className='px-1 mt-2'>
                                    <Box className='d-flex gap-2' >
                                        <FiberNewIcon />
                                        <Typography className='fw-light'>Now Classes due to strike...</Typography>
                                    </Box>
                                    <Box className='d-flex gap-2' >
                                        <TrendingUpIcon />
                                        <Typography className='fw-light'>Flood at the motor parking lot...</Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </MDBCol>
                        <MDBCol md={3}>
                            <Paper className='p-4' sx={{ boxShadow: 5 }}>
                                <Typography className='mb-1' fontSize={20}>Total Messages</Typography>
                                <Divider sx={{ borderBottom: 2 }} />
                                <Typography className='fw-bold' fontSize={50} textAlign={'center'}>20</Typography>
                                <Divider sx={{ borderBottom: 2 }} />
                                <Box className='d-flex justify-content-between px-1 mt-2'>
                                    <Box>
                                        <Typography className='fw-light'>/Day</Typography>
                                        <Typography className='fw-bold' textAlign={'center'}>21</Typography>
                                    </Box>
                                    <Box>
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
                                    </Box>
                                </Box>
                            </Paper>
                        </MDBCol>
                        <MDBCol md={3}>
                            <Paper className='p-4' sx={{ boxShadow: 5 }}>
                                <Typography className='mb-1' fontSize={20}>Total Forum Topics</Typography>
                                <Divider sx={{ borderBottom: 2 }} />
                                <Typography className='fw-bold' fontSize={50} textAlign={'center'}>243</Typography>
                                <Divider sx={{ borderBottom: 2 }} />
                                <Box className='px-1 mt-2'>
                                    <Box className='d-flex gap-2' >
                                        <Typography className='fw-light'>Most commented: </Typography>
                                        <Typography className='fw-bold'>sadsaasdasd</Typography>
                                    </Box>
                                    <Box className='d-flex gap-2' >
                                        <Typography className='fw-light'>Latest Topic: </Typography>
                                        <Typography className='fw-bold'>Flood ASDSAD</Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className='mt-4'>
                        <MDBCol md={6}>
                            <RegressionChart />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </main>
        </div>
    )
}

export default Dashboard