import React from 'react'
import SideNav from './Layout/SideNav'
import TopBar from './Layout/TopBar'
import { Container, Paper, Typography } from '@mui/material'
import { MDBCol, MDBRow } from 'mdb-react-ui-kit'
import HomeImageList from './Static/HomeImageList'
import MetaData from './Layout/MetaData'
import TodaysAnnouncement from './TodaysAnnouncement'

const Home = () => {
    return (
        <>
            <MetaData pageTitle='Home' />
            <div style={{ display: 'flex', height: '100vh' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <Container maxWidth='xl'>
                        <MDBRow className='mt-3'>

                            <MDBCol md={'6'}>
                                <Paper className='px-3 pt-3 d-flex flex-column gap-3' sx={{ backgroundColor: '#FAD4D4' }}>
                                    <Typography className='text-center lh-sm' variant='h6'>
                                        Welcome to TUPT Online Communication Platform Specialized for Emergencies and Collaborative Emergency Management
                                    </Typography>
                                    <HomeImageList />
                                </Paper>
                            </MDBCol>

                            <MDBCol md={'6'}>
                                <Paper className='px-3 pt-3 d-flex flex-column gap-3' sx={{ backgroundColor: '#FAD4D4' }}>
                                    <Typography className='text-center lh-sm' variant='h6'>
                                        Today's Announcement
                                    </Typography>
                                    <TodaysAnnouncement />
                                </Paper>

                            </MDBCol>

                        </MDBRow>
                    </Container>
                </main>
            </div>
        </>
    )
}

export default Home