import React, { useEffect, useState } from 'react'
import Block from '../Layout/Loaders/Block'
import SideNav from '../Layout/SideNav';
import TopBar from '../Layout/TopBar';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import MetaData from '../Layout/MetaData';
import axios from 'axios';
import ToastEmmiter from '../Layout/ToastEmmiter';
import { Search } from '@mui/icons-material';

const TutorialsList = () => {

    const [loading, setLoading] = useState(false);

    const [tutorials, settutorials] = useState([]);
    const [filteredTutorials, setFilteredTutorials] = useState([]);
    const [keyWord, setKeyWord] = useState('');

    const getVideoTutorials = async () => {

        setLoading(true)
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/video-tutorial/get-all?user=true`, {
                withCredentials: true,
            })
            settutorials(data.videoTutorials)
            setFilteredTutorials(data.videoTutorials)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            ToastEmmiter.error('Error occured');
            console.log(err);
        }
    }

    useEffect(() => {
        getVideoTutorials()
    }, [])

    useEffect(() => {
        const regex = new RegExp(keyWord, 'i');
        const filteredTutorials = tutorials.filter(tutorial => regex.test(tutorial.title)
            // || regex.test(user.lastname)
        );
        setFilteredTutorials(filteredTutorials);
    }, [keyWord])

    return (
        <>
            <Block loading={loading} />
            <MetaData pageTitle="Tutorials" />
            <div style={{ display: 'flex', minHeight: '100vh' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />

                    <MDBContainer fluid>

                        <MDBRow className='mt-4'>
                            <MDBCol sm={6}>
                                <TextField placeholder='Search' fullWidth size='small'
                                    onChange={(e) => setKeyWord(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <Search />
                                        )
                                    }} />
                            </MDBCol>
                        </MDBRow>

                        <MDBRow className='mt-4'>
                            {filteredTutorials?.map(tutorial => (
                                <MDBCol key={tutorial._id} sm={12} md={6} lg={4}>
                                    <Paper className='p-2 px-4 pb-3' sx={{ backgroundColor: tutorial.isDisabled ? '#D37676' : '#DCFFB7' }}>
                                        <Box className='d-flex justify-content-between align-items-center'>
                                            <Typography className='fw-bold' fontSize={20}>{tutorial.title}</Typography>
                                            <Typography>{computeTimeElapsed(tutorial.createdAt)}</Typography>
                                        </Box>
                                        <video id="videoPlayer" width="400" controls style={{ width: '100%' }}>
                                            <source src={tutorial.video?.url} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </Paper>

                                </MDBCol>
                            ))}
                        </MDBRow>

                    </MDBContainer>

                </main >

            </div >
        </>
    )
}

function computeTimeElapsed(createdAt) {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();

    // Calculate the difference in milliseconds between the current date and the created date
    const differenceInMilliseconds = currentDate - createdDate;

    // Convert milliseconds to seconds, minutes, hours, and days
    const seconds = Math.floor(differenceInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else {
        return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
    }
}


export default TutorialsList