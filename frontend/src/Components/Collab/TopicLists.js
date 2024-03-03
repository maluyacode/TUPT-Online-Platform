import React, { useEffect, useState } from 'react'
import { Badge, Box, Button, Chip, Paper, Tooltip, Typography } from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
import ToastEmmiter from '../Layout/ToastEmmiter';
import { fetchAllPost } from '../../api/collabsApi';
import Block from '../Layout/Loaders/Block';
import { colorCoding } from '../../utils/avatar';

const TopicLists = ({ keyword, loading, setLoading, viewTopic }) => {

    const [topics, setTopics] = useState([]);
    const [filteredTopics, setFilteredTopics] = useState();

    const getAllTopics = async () => {

        const { data } = await fetchAllPost();
        if (data.success) {

            setLoading(false)
            setTopics(data.topics)
            setFilteredTopics(data.topics)

        } else {
            ToastEmmiter.warning('System error, please try again later', 'top-center');
            setLoading(false)
        }
    }


    useEffect(() => {
        getAllTopics()
    }, [loading])

    useEffect(() => {
        const regex = new RegExp(keyword, 'i');
        const filteredTopics = topics.filter(topic => regex.test(topic.heading)
            // || regex.test(user.lastname)
        );
        setFilteredTopics(filteredTopics);
    }, [keyword])

    return (
        <>
            <div style={{ height: '80vh', overflowY: 'auto' }}>

                {filteredTopics?.map((topic, i) => (
                    <Paper
                        key={i}
                        onClick={() => viewTopic(topic._id)}
                        sx={{
                            cursor: 'pointer', '&:hover': {
                                bgcolor: '#F6F9FC',
                            },
                        }} className='p-3 d-flex flex-column flex-md-row-reverse gap-4 mb-2 mt-2'>
                        <Block loading={loading} />

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
                            <Box className='d-flex flex-column flex-md-row gap-2 ms-1'>
                                <Tooltip title={
                                    <Typography className='text-capitalize'>
                                        {topic.postedBy.role}
                                    </Typography>
                                } placement='right'>
                                    <Typography className='fw-bold'
                                        color={colorCoding(topic.postedBy.role)}
                                    >{topic.postedBy.firstname} {topic.postedBy.lastname}</Typography>
                                </Tooltip>
                                <Typography>{computeTimeElapsed(topic.createdAt)}</Typography>
                            </Box>
                            <Typography className='mt-2 fs-4 ms-1'>{topic.heading}</Typography>
                            <Typography className='mt-2 ms-1'>
                                {topic.body}
                            </Typography>
                            <Box className='mt-3'>
                                {topic?.category?.map((name, i) => (
                                    <Chip key={i} label={name} className='me-2' />
                                ))}
                            </Box>

                            <Box className='d-flex gap-2 mt-3 p-1 px-2 rounded-3' sx={{ backgroundColor: '#F6F5F5' }}>
                                <ChatBubbleOutlineIcon />
                                <Typography sx={{ fontSize: 16, mt: -0.2 }}>2</Typography>
                                <Typography className='fw-bold' sx={{ fontSize: 16, mt: -0.2 }}>Dave Merc: </Typography>
                                <Typography sx={{ fontSize: 16, mt: -0.2 }}>paano magnetworking sa linux server?</Typography>
                            </Box>
                        </Box>
                    </Paper>
                ))}

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

export default TopicLists