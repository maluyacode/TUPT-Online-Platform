import React, { useEffect, useState } from 'react'
import { Badge, Box, Button, Chip, Paper, Tooltip, Typography } from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
import ToastEmmiter from '../Layout/ToastEmmiter';
import Block from '../Layout/Loaders/Block';
import { colorCoding } from '../../utils/avatar';

import filipinoBarwords from 'filipino-badwords-list';
import Filter from 'bad-words';
import { computeTimeElapsed } from '../../utils/computeTimeElapsed';

const TopicLists = ({ keyword, viewTopic, success, topics, filteredTopics }) => {

    const filter = new Filter({ list: filipinoBarwords.array });

    const [loading, setLoading] = useState(false);

    return (
        <>
            <Block loading={loading} />
            <div style={{ height: '80vh', overflowY: 'auto', }} className='p-3'>

                {filteredTopics?.map((topic, i) => (
                    <Paper
                        key={i}
                        onClick={() => viewTopic(topic._id)}
                        sx={{
                            cursor: 'pointer', '&:hover': {
                                bgcolor: '#F6F9FC',
                            },
                        }} className='p-3 d-flex flex-column flex-md-row-reverse gap-4 mb-2 mt-2'>

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
                                        {topic?.postedBy?.role}
                                    </Typography>
                                } placement='right'>
                                    <Typography className='fw-bold'
                                        color={colorCoding(topic?.postedBy?.role)}
                                    >{topic?.postedBy?.firstname} {topic?.postedBy?.lastname}</Typography>
                                </Tooltip>
                                <Typography>{computeTimeElapsed(topic.createdAt, topic.updatedAt)}</Typography>
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

                            {topic?.commentCount > 0 ?
                                <Box className='d-flex gap-2 mt-3 p-1 px-2 rounded-3' sx={{ backgroundColor: '#F6F5F5' }}>
                                    <ChatBubbleOutlineIcon />
                                    <Typography sx={{ fontSize: 16, mt: -0.2 }}>{topic?.commentCount}</Typography>
                                    <Typography className='fw-bold' sx={{ fontSize: 16, mt: -0.2 }}>{topic.latestComment?.commentedBy?.firstname}: </Typography>
                                    <Typography sx={{ fontSize: 16, mt: -0.2 }}>{filterText(topic?.latestComment?.textContent)}</Typography>
                                </Box>
                                :
                                <Box className='d-flex gap-2 mt-3 p-1 px-2 rounded-3' sx={{ backgroundColor: '#F6F5F5' }}>
                                    <ChatBubbleOutlineIcon />
                                    <Typography sx={{ fontSize: 16, mt: -0.2 }}>Start a comment</Typography>
                                </Box>
                            }
                        </Box>
                    </Paper>
                ))}

            </div >
        </>
    )
}

// function computeTimeElapsed(createdAt) {
//     const now = new Date();
//     const createdDate = new Date(createdAt);
//     const elapsedMilliseconds = now - createdDate;

//     const minutes = Math.floor(elapsedMilliseconds / (1000 * 60));
//     const hours = Math.floor(minutes / 60);
//     const days = Math.floor(hours / 24);
//     const months = Math.floor(days / 30);

//     if (months > 0) {
//         return months === 1 ? `${months}m ago` : `${months}mos ago`;
//     } else if (days > 0) {
//         return days === 1 ? `${days}d ago` : `${days}d ago`;
//     } else if (hours > 0) {
//         return hours === 1 ? `${hours}h ago` : `${hours}h ago`;
//     } else {
//         return minutes <= 1 ? 'Just now' : `${minutes}m ago`;
//     }
// }

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

export default TopicLists