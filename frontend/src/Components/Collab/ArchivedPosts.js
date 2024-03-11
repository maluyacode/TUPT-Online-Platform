import React, { useEffect, useState } from 'react'
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import Snackbar from '@mui/material/Snackbar';

import MetaData from '../Layout/MetaData'
import Block from '../Layout/Loaders/Block'
import SideNav from '../Layout/SideNav'
import TopBar from '../Layout/TopBar'
import { Alert, Box, Chip, Collapse, IconButton, Paper, Tooltip, Typography, Button } from '@mui/material'
import { Unarchive, ChatBubble, Close, RemoveRedEye, Attachment } from '@mui/icons-material'
import { fetchAllPost, restoreTopicApi } from '../../api/collabsApi'
import ToastEmmiter from '../Layout/ToastEmmiter'
import { colorCoding } from '../../utils/avatar'

import Filter from 'bad-words'
import filipinoBarwords from 'filipino-badwords-list'
import ArchivedPostDetails from './ArchivedPostDetails'

const ArchivedPosts = () => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(true);
    const [topics, setTopics] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [isViewOpen, setIsViewOpen] = useState(false);

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [selectedId, setSelectedId] = useState(null); // id to unarchive

    const getTopics = async () => {
        const fetchArchived = 'fetch';
        const fetchStatus = 'mypost'
        const { data } = await fetchAllPost(fetchStatus, fetchArchived);
        if (data.success) {
            console.log(data);
            setLoading(false)
            setTopics(data.topics)

        } else {
            ToastEmmiter.warning('System error, please try again later', 'top-center');
            setLoading(false)
        }
    }

    useEffect(() => {
        getTopics()
    }, [])

    const handleClickUnArchive = (id) => {
        setSelectedId(id)
        setOpenSnackBar(true);
        removeTopicInitially(id)
    };

    const removeTopicInitially = (id) => {
        console.log(topics)
        const filteredTopics = topics.filter(topic => topic._id !== id);
        console.log(filteredTopics)
        setTopics(filteredTopics);
    }

    const unArchiveTopic = async (id) => {
        const { data } = await restoreTopicApi(id);
        if (data.success) {
            console.log(data)
            getTopics()
        } else {
            ToastEmmiter.warning('Error fetching post', 'top-center');
            setLoading(false)
        }
    }

    const handleCloseSnackBar = (event, reason) => {
        console.log("Kahit di ko ginagalaw")

        if (!selectedId) {
            return;
        }

        if (reason === 'clickaway') {
            return;
        }

        if (event?.target?.getAttribute('reason') === 'undo') {
            getTopics()
        } else {
            unArchiveTopic(selectedId);
        }

        setOpenSnackBar(false);
    };

    return (
        <>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={4000}
                onClose={handleCloseSnackBar}
                message="Topic unarchived"
                action={
                    <>
                        <Button reason={'undo'} color="secondary" size="small" onClick={handleCloseSnackBar}>
                            UNDO
                        </Button>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleCloseSnackBar}
                        >
                            <Close fontSize="small" />
                        </IconButton>
                    </>
                }
            />
            <ArchivedPostDetails key={selectedPostId} setOpen={setIsViewOpen} open={isViewOpen} selectedPostId={selectedPostId} />
            <MetaData pageTitle="Collab" />
            <Block loading={loading} />
            <div style={{ display: 'flex', minHeight: '100vh' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <MDBContainer fluid style={{ maxWidth: '1500px' }}>
                        <MDBRow className='pt-3'>

                            <MDBCol sm={'12'}>
                                <Box className='d-flex w-100 justify-content-between'>
                                    <Typography variant='h5'>Archived Topics</Typography>
                                </Box>
                            </MDBCol>

                            <Box sx={{ width: '100%' }}>
                                <Collapse in={open}>
                                    <Alert
                                        action={
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={() => {
                                                    setOpen(false);
                                                }}
                                            >
                                                <Close fontSize="inherit" />
                                            </IconButton>
                                        }
                                        sx={{ mb: 2 }}
                                    >
                                        Please note that archived items will be lost after 7 days. Ensure that you restore any important content before the expiration date to avoid permanent loss.
                                    </Alert>
                                </Collapse>
                            </Box>

                        </MDBRow>
                        <MDBRow>
                            {topics?.map((topic, i) => (
                                <MDBCol xs={12} sm={12} md={12} lg={6}>

                                    <Paper
                                        key={i}
                                        // onClick={() => viewTopic(topic._id)}
                                        className='p-3 d-flex flex-column flex-md-row-reverse gap-4 mb-2 mt-2'>
                                        {topic.images.length > 0 ? <>
                                            <Box>
                                                <a href={topic.images[0].url} target="_blank" rel="noopener noreferrer">
                                                    <img
                                                        src={topic.images[0].url}
                                                        width={220}
                                                        height={220}
                                                        alt='Forum Image'
                                                    />
                                                </a>
                                            </Box>
                                        </> : ""}

                                        <Box sx={{ flex: 1 }}>
                                            <Box className='d-flex flex-row flex-nowrap justify-content-between flex-md-row gap-2 ms-1'>
                                                <Typography>6 Days left</Typography>
                                                <Box>
                                                    <Tooltip title='View Details'>
                                                        <IconButton onClick={() => {
                                                            setSelectedPostId(topic._id)
                                                            setIsViewOpen(true)
                                                        }} size='small'>
                                                            <RemoveRedEye />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title='Unarchived'>
                                                        <IconButton size='small'
                                                            onClick={() => handleClickUnArchive(topic._id)}
                                                        >
                                                            <Unarchive fontSize='small' />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </Box>
                                            <Typography className='mt-2 fs-4 ms-1'>{filterText(topic.heading)}</Typography>
                                            <Typography className='mt-2 ms-1'>
                                                {filterText(topic.body)}
                                            </Typography>
                                            <Box className='mt-3'>
                                                {topic?.category?.map((name, i) => (
                                                    <Chip key={i} label={name} className='me-2' />
                                                ))}
                                            </Box>

                                            <Box className='d-flex gap-2 mt-3 p-1 px-2 rounded-3' sx={{ backgroundColor: '#F6F5F5' }}>
                                                <Tooltip title='Comments'>
                                                    <ChatBubble />
                                                </Tooltip>
                                                <Typography sx={{ fontSize: 16, mt: -0.2, mr: 2 }}>{topic.commentCount}</Typography>
                                                <Tooltip title='Attachments'>
                                                    <Attachment />
                                                </Tooltip>
                                                <Typography sx={{ fontSize: 16, mt: -0.2 }}>{topic?.attachments?.length}</Typography>
                                            </Box>

                                        </Box>
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
    const now = new Date();
    const createdDate = new Date(createdAt);
    const elapsedMilliseconds = now - createdDate;

    const minutes = Math.floor(elapsedMilliseconds / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (months > 0) {
        return months === 1 ? `${months}m ago` : `${months}mos ago`;
    } else if (days > 0) {
        return days === 1 ? `${days}d ago` : `${days}d ago`;
    } else if (hours > 0) {
        return hours === 1 ? `${hours}h ago` : `${hours}h ago`;
    } else {
        return minutes <= 1 ? 'Just now' : `${minutes}m ago`;
    }
}

const filterText = (text) => {
    try {
        const filter = new Filter({ list: filipinoBarwords.array });
        if (typeof text === 'string') {
            return filter.clean(text);
        } else {
            return text;
        }
    } catch (error) {
        console.error('Error filtering text:', error);
        return text;
    }
}

export default ArchivedPosts