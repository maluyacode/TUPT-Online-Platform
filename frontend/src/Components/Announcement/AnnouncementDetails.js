import React, { useEffect, useState } from 'react'
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
import { FileIcon, defaultStyles } from 'react-file-icon';


import { useParams } from 'react-router-dom'

import MetaData from '../Layout/MetaData'
import SideNav from '../Layout/SideNav'
import TopBar from '../Layout/TopBar'
import { Box, Paper, Typography } from '@mui/material'
import ToastEmmiter from '../Layout/ToastEmmiter'

import { getAnnouncement } from '../../api/announcementsAPI'
import axios from 'axios'

const AnnouncementDetails = () => {

    const { id } = useParams();

    const [announcement, setAnnouncement] = useState({});

    const getSingleAnnouncement = async () => {
        const { data } = await getAnnouncement(id);
        if (data.success) {
            setAnnouncement(data.announcement)
        } else {
            ToastEmmiter.error('Error occured');
        }
    }

    useEffect(() => {
        getSingleAnnouncement()
    }, [])

    console.log(announcement)

    return (
        <>
            <MetaData pageTitle="Announcements" />
            <div style={{ display: 'flex', height: '100vh' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <MDBContainer style={{ maxWidth: 900, }} className='mt-4'>
                        <MDBCard border='primary' background='white' shadow='0' className='mb-3' style={{ height: 575 }}>
                            <MDBCardHeader background='transparent' border='primary' className='d-flex flex-row justify-content-center'>
                                <Typography variant='h5' color={'primary'} >
                                    <MDBIcon fas icon="bullhorn" size='xl' color={'danger'} />
                                    <span className='fw-bold ms-2'>{announcement.title}</span>
                                </Typography>
                            </MDBCardHeader>
                            <MDBCardBody style={{ overflowY: 'auto', height: 500 }}>
                                {announcement.images?.length > 0 ?
                                    <MDBCarousel dark
                                        showControls={announcement.images?.length > 1}
                                        className='mb-3' interval={2000}>
                                        {announcement.images?.map(image => (
                                            <MDBCarouselItem itemId={1} className='d-flex flex-row justify-content-center mb-3'>
                                                <img src={image.url} height={250} className='d-block w-75' alt='...' />
                                            </MDBCarouselItem>
                                        ))}

                                    </MDBCarousel> : ""
                                }
                                {/* <div className='d-flex flex-row justify-content-center mb-3'>
                                    <MDBCardImage width={250} src='https://via.placeholder.com/150' />
                                </div> */}

                                <MDBCardText className='text-center'>
                                    {announcement.content}
                                </MDBCardText>
                                {announcement.attachments?.length > 0 ?
                                    <>
                                        <Typography className='fw-bold my-2 mt-4'>Attachments</Typography>
                                        <Box className='d-flex flex-wrap gap-3'>
                                            {announcement.attachments?.map(attachment => {
                                                const fileName = attachment.original_name;
                                                const parts = fileName.split('.');
                                                const fileExtension = parts[parts.length - 1];
                                                return (
                                                    <>
                                                        <Paper component={'a'} href={attachment.url} target='_blank' className='d-flex gap-1' sx={{ width: 'fit-content', p: 1, backgroundColor: '#EEEDEB', cursor: 'pointer' }}>
                                                            <div style={{ width: 25 }}>
                                                                <FileIcon extension={fileExtension} {...defaultStyles[fileExtension]} />
                                                            </div>
                                                            <span className='text-decoration-underline mt-1'>{attachment.original_name}</span>
                                                        </Paper>
                                                    </>
                                                )
                                            })}
                                        </Box>
                                    </> : ""
                                }

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

export default AnnouncementDetails