import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdb-react-ui-kit'
import MoreVertIcon from '@mui/icons-material/MoreVert';

import SideNav from '../../Layout/SideNav'
import TopBar from '../../Layout/TopBar'
import Block from '../../Layout/Loaders/Block'
import { Badge, Box, Button, Chip, Divider, IconButton, Menu, MenuItem, Paper, Typography } from '@mui/material'
import { colorCoding, profileHead } from '../../../utils/avatar'
import { fetchConversataion } from '../../../api/chatsApi';
import ToastEmmiter from '../../Layout/ToastEmmiter';

import filipinoBarwords from 'filipino-badwords-list';
import Filter from 'bad-words';
import Swal from 'sweetalert2';
import { hideMessageApi } from '../../../api/messagesApi';

import { socket } from '../../../socket'

const ChatHistory = () => {

    const filter = new Filter({ list: filipinoBarwords.array });
    const [loading, setLoading] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => { setAnchorEl(event.currentTarget) };
    const handleClose = () => { setAnchorEl(null) }

    const { id } = useParams()
    const [chat, setChat] = useState({});
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState('');

    const scrollableContainerRef = useRef(null);

    const getConversation = async () => {
        setLoading(true)
        const { data } = await fetchConversataion(id);
        if (data.success) {
            console.log(data)
            setLoading(false)
            setChat(data.chat);
            setMessages(data.messages);
        } else {
            setLoading(false)
            ToastEmmiter.error('System error, please try again later', 'top-center')
        }
    }

    const hideMessage = async () => {
        setLoading(true)
        const { data } = await hideMessageApi(selectedMessage._id);
        if (data.success) {
            setLoading(false)
            ToastEmmiter.success(data.message);
            getConversation()
        } else {
            setLoading(false)
            ToastEmmiter.error('System error, please try again later', 'top-center')
        }
    }

    const handleHideMessage = () => {
        Swal.fire({
            // title: "Are you sure?",
            html: `
                <div>
                    <Typography>Are you sure you want to hide this?</Typography>
                    <br/>
                    <Typography>"${selectedMessage.content}"</Typography>
                </div>
            `,
            // icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmed",
        }).then((result) => {
            if (result.isConfirmed) {
                hideMessage()
            }
        });
    }

    useEffect(() => {
        getConversation()
    }, [])

    useEffect(() => {
        if (scrollableContainerRef.current) {
            // Scroll to the bottom when messages change
            scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {

        socket.on('push-to-admin', (data) => {
            getConversation();
        })

        return () => {
            socket.off('push-to-admin');
            // socket.off('show-hidden-message');
        };

    }, [socket])


    return (
        <>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {
                    handleClose()
                    handleHideMessage()
                }}>Hide to User</MenuItem>
                {/* <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem> */}
            </Menu>
            <Block loading={loading} />
            <div style={{ display: 'flex', height: '100vh' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <MDBContainer style={{ height: '90%' }}>
                        <MDBRow className='pt-3'>
                            {chat?.participants?.map(user => (
                                <MDBCol lg={3}>
                                    <Paper className='d-flex align-items-center p-2 gap-1'>
                                        {profileHead(user, 60, 60, 20, '10px')}
                                        <Box>
                                            <Typography>{user.firstname} {user.lastname}</Typography>
                                            <Chip label={user.role} size='small' sx={{ textTransform: 'capitalize', backgroundColor: colorCoding(user.role) }} />
                                        </Box>
                                    </Paper>
                                </MDBCol>
                            ))}
                        </MDBRow>
                        <Divider sx={{ my: 2, borderBottom: 2 }} />
                        <Box ref={scrollableContainerRef} sx={{ overflowY: 'auto', overflowX: 'hidden', height: '80%' }}>
                            {messages?.map(message => (
                                <>
                                    <MDBRow className='mb-1'>
                                        <Box className='d-flex align-items-center justify-content-start'>
                                            <Box width={70}>
                                                {profileHead(message.sender, 60, 60,)}
                                            </Box>
                                            {message.content === filter.clean(message.content) ?
                                                <Paper className='p-2' sx={{ backgroundColor: colorCoding(message.sender?.role) }}>
                                                    <Typography>{message.content}</Typography>
                                                </Paper> :
                                                <Badge badgeContent={<MDBIcon fas icon="flag" color='danger' />}>
                                                    <Paper className='p-2' sx={{ backgroundColor: colorCoding(message.sender?.role) }}>
                                                        <Typography>{message.content}</Typography>
                                                    </Paper>
                                                </Badge>
                                            }
                                            <IconButton aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={e => {
                                                    handleClick(e)
                                                    setSelectedMessage(message)
                                                }}>
                                                <MoreVertIcon />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ ml: '70px' }}>
                                            <Typography fontSize={12}>{formatDate(message.createdAt)} <i>{message.deletedAt ? "This message is hidden to users" : ""}</i></Typography>
                                        </Box>
                                    </MDBRow >
                                    <Divider sx={{ mb: 0.8, borderBottom: 1 }} />
                                </>
                            ))}
                        </Box>
                    </MDBContainer>
                </main>
            </div >
        </>
    )
}

function formatDate(createdAt) {
    return `${new Date(createdAt).toLocaleDateString('en-US', { month: '2-digit', day: 'numeric', year: '2-digit', hour: '2-digit', minute: '2-digit' })}`;
}


export default ChatHistory