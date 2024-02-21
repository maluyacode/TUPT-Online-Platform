import React from 'react'
import {
    MDBContainer,
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardHeader,
    MDBCardFooter,
    MDBIcon,
    MDBCardImage,
    MDBCarousel,
    MDBCarouselItem
} from 'mdb-react-ui-kit'


import { useParams } from 'react-router-dom'

import MetaData from '../Layout/MetaData'
import SideNav from '../Layout/SideNav'
import TopBar from '../Layout/TopBar'
import { Box, Typography } from '@mui/material'
const AnnoncementDetails = () => {

    const { announcementId } = useParams();

    return (
        <>
            <MetaData pageTitle="Announcements" />
            <div style={{ display: 'flex', height: '100vh' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <MDBContainer style={{ maxWidth: 900 }} className='mt-4'>
                        <MDBCard border='primary' background='white' shadow='0' className='mb-3'>
                            <MDBCardHeader background='transparent' border='primary' className='d-flex flex-row justify-content-center'>
                                <Typography variant='h5' color={'primary'} >
                                    <MDBIcon fas icon="bullhorn" size='xl' color={'danger'} />
                                    <span className='fw-bold ms-2'>Important Announcement 1</span>
                                </Typography>
                            </MDBCardHeader>
                            <MDBCardBody className=''>
                                <MDBCarousel dark
                                    // showControls 
                                    className='mb-3' interval={2000}>
                                    <MDBCarouselItem itemId={1} className='d-flex flex-row justify-content-center mb-3'>
                                        <img src='https://mdbootstrap.com/img/new/slides/041.jpg' height={250} className='d-block w-75' alt='...' />
                                    </MDBCarouselItem>
                                    {/* <MDBCarouselItem itemId={2}>
                                        <img src='https://mdbootstrap.com/img/new/slides/042.jpg' className='d-block w-100' alt='...' />
                                    </MDBCarouselItem>
                                    <MDBCarouselItem itemId={3}>
                                        <img src='https://mdbootstrap.com/img/new/slides/043.jpg' className='d-block w-100' alt='...' />
                                    </MDBCarouselItem> */}
                                </MDBCarousel>
                                {/* <div className='d-flex flex-row justify-content-center mb-3'>
                                    <MDBCardImage width={250} src='https://via.placeholder.com/150' />
                                </div> */}

                                <MDBCardText className='text-center'>
                                    Nulla vitae libero pharetra, egestas libero at, lacinia leo. Duis suscipit, ligula ut fermentum luctus, justo nulla consequat urna, nec consequat est mi eget metus.
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter background='transparent' border='primary' className='d-flex flex-row justify-content-between'>
                                <div>
                                    <MDBIcon fas icon="calendar-alt" size='lg' />
                                    <span className='ms-2'>Posted on April 16, 2022</span>
                                </div>
                                <div>
                                    <MDBIcon fas icon="user" size='lg' />
                                    <span className='ms-2'>Posted by Dave Merc Adlawan</span>
                                </div>
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBContainer>
                </main>
            </div>
        </>
    )
}

export default AnnoncementDetails