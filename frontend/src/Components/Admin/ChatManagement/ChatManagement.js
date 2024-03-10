import React, { useEffect, useState } from 'react'
import { MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTooltip } from 'mdb-react-ui-kit'
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';

import SideNav from '../../Layout/SideNav'
import TopBar from '../../Layout/TopBar'
import Block from '../../Layout/Loaders/Block'
import ToastEmmiter from '../../Layout/ToastEmmiter'

import { useNavigate } from 'react-router-dom';

import { fetchAllChats } from '../../../api/chatsApi'
import { Box, Button, IconButton, Paper, TextField, Tooltip, Typography } from '@mui/material'
import { profileHead } from '../../../utils/avatar'

const placement = [
    "top",
    "bottom-start",
    "left",
    "right",
]

const ChatManagement = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [allChats, setAllChats] = useState([]);
    const [filteredChats, setFilteredChats] = useState([])
    const [openToolTip, setOpenToolTip] = useState(false);

    const getAllChats = async () => {
        setLoading(true)
        const { data } = await fetchAllChats();
        if (data.success) {
            console.log(data)
            setLoading(false)
            setAllChats(data.chats);
            setFilteredChats(data.chats);
        } else {
            setLoading(false)
            ToastEmmiter.error('System error, please try again later', 'top-center')
        }
    }

    useEffect(() => {
        getAllChats();
    }, [])

    const handleSearch = e => {
        const keyword = e.target.value;

        const regex = new RegExp(keyword, 'i');

        const filteredChats = allChats.filter(chat =>
            chat.participants.some(participant =>
                regex.test(`${participant.firstname} ${participant.lastname}`)
            )
        );
        setOpenToolTip(true);
        setTimeout(() => {
            setOpenToolTip(false)
        }, 5000)
        setFilteredChats(filteredChats);
    }

    return (
        <>
            <Block loading={loading} />
            <div style={{ display: 'flex', height: '100vh' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <MDBContainer fluid style={{ height: '90%' }}>
                        <MDBRow className='mt-3'>
                            <MDBCol xs={12} sm={12}>
                                <TextField onChange={handleSearch} label='Search chats by user name' size='small' fullWidth />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className='mt-3 py-2' style={{ height: '90%', overflowY: 'auto' }}>
                            {filteredChats?.map(chat => (
                                <MDBCol lg={3} md={4} sm={6} className='mb-3'>
                                    <Paper sx={{ p: 2, }}>
                                        <Box className='d-flex gap-2 align-items-center py-2 overflow-x-scroll'>
                                            {chat?.participants?.map((user, i) => (
                                                <>
                                                    <Tooltip key={'parent' + user._id} open={openToolTip} title={`${user.firstname} ${user.lastname}`} placement={placement[i]}>
                                                        <div>
                                                        </div>
                                                    </Tooltip>
                                                    <Tooltip key={'child' + user._id} title={`${user.firstname} ${user.lastname}`} placement='top'>
                                                        {profileHead(user, 50, 50, 20, '50%')}
                                                    </Tooltip>
                                                </>
                                            ))}
                                        </Box>
                                        <div className='d-flex align-content-end justify-content-between'>
                                            <div>
                                                <Tooltip title='Date Started' placement='left'>
                                                    <Box className='d-flex align-items-center gap-1 px-1 mb-2'>
                                                        <MDBIcon far icon="calendar-alt" size='xl' />
                                                        <Typography>{formatDate(chat.createdAt)}</Typography>
                                                    </Box>
                                                </Tooltip>
                                                <Box className='d-flex align-items-center gap-1 px-1' sx={{ ml: -0.3 }}>
                                                    {chat.lastMessage ?
                                                        <>
                                                            <Tooltip title='Last Message' placement='left'>
                                                                {/* <img width={25} height={25} style={{ borderRadius: '50%' }} src='https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1' /> */}
                                                                {profileHead(chat?.lastMessage?.sender, 25, 25, 10, '50%')}
                                                            </Tooltip>
                                                            <Typography>{chat?.lastMessage?.content?.substring(0, 10)}...</Typography>
                                                        </>
                                                        :
                                                        <Typography>No message yet</Typography>
                                                    }
                                                </Box>
                                            </div>
                                            <div className='d-flex align-items-end'>
                                                <Tooltip title='View Chat History'>
                                                    <IconButton onClick={() => navigate(`/admin/chat-history/${chat._id}`)}>
                                                        <ManageHistoryIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </Paper>
                                </MDBCol>
                            ))}
                        </MDBRow>
                    </MDBContainer>
                </main>
            </div>
        </>
    )
}

function formatDate(createdAt) {
    return `${new Date(createdAt).toLocaleDateString('en-US', { month: '2-digit', day: 'numeric', year: '2-digit' })}`;
}

export default ChatManagement