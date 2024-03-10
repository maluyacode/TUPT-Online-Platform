import React, { useState } from 'react'
import colors from '../../data/colors.json'
import { isAuthenticated } from '../../utils/helper'
import filipinoBarwords from 'filipino-badwords-list';
import Filter from 'bad-words';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { hideMessageApi } from '../../api/messagesApi';
import ToastEmmiter from '../Layout/ToastEmmiter';
import Swal from 'sweetalert2';
import MoreVert from '@mui/icons-material/MoreVert';
import { accessChat } from '../../actions/chatActions';
import { socket } from '../../socket';

const RightMessage = ({ message, chatInfo }) => {

    const dispatch = useDispatch()
    const filter = new Filter({ list: filipinoBarwords.array });
    const [loading, setLoading] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => { setAnchorEl(event.currentTarget) };
    const handleClose = () => { setAnchorEl(null) }

    const { selectedChat } = useSelector(state => state.chat);
    const authenticated = isAuthenticated();
    const { content, sender } = message
    const { participants } = chatInfo;
    const indexColor = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
    const avatarColor = colors.hexColors[indexColor];

    const avatar = participants.reduce((accumulator, participant) => {
        if (participant._id === sender) {
            return participant.avatar ? <img
                src={participant.avatar?.url}
                alt="avatar 1"
                style={{ width: "45px", height: "100%", borderRadius: '50%' }}
            /> :
                <div className='d-flex align-content-center justify-content-center' style={{ width: "45px", height: "45px", borderRadius: '50%', backgroundColor: 'lightgreen', marginTop: -5 }}>
                    <span style={{ lineHeight: "45px", fontSize: 18 }}>
                        {participant.firstname.charAt(0)}{participant.lastname.charAt(0)}
                    </span>
                </div>
        }
        return accumulator;
    }, null);

    const hideMessage = async () => {
        setLoading(true)
        const { data } = await hideMessageApi(message._id);
        if (data.success) {
            setLoading(false)
            dispatch(accessChat(selectedChat))

            socket.emit('hide-message',
                JSON.stringify({
                    recipient: selectedChat
                })
            )

        } else {
            setLoading(false)
            ToastEmmiter.error('System error, please try again later', 'top-center')
        }
    }

    const handleHideMessage = () => {
        console.log(message)
        hideMessage()
    }

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
                }}>Hide</MenuItem>
                {/* <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem> */}
            </Menu>

            <div className="d-flex flex-row justify-content-end align-items-start  mb-2 pt-1">
                {!message.deletedAt && (
                    <IconButton onClick={e => {
                        handleClick(e)
                    }}>
                        <MoreVert />
                    </IconButton>
                )}
                <div className='d-flex flex-column align-items-center'>
                    {!message.deletedAt ?
                        <Tooltip title={formatDate(message.createdAt)}>
                            <p
                                className="small text-center p-2 me-3 mb-2 text-white rounded-3 bg-primary"
                                style={{ backgroundColor: "#f5f6f7" }}
                            >
                                {filter.clean(content)}
                            </p>
                        </Tooltip> :
                        <Tooltip title={formatDate(message.createdAt)}>
                            <p
                                className="small p-2 ms-3 mb-2 rounded-3"
                                style={{ borderColor: 'red', borderWidth: 1, borderStyle: 'solid' }}
                            >
                                This message is hidden.
                            </p>
                        </Tooltip>
                    }
                    {/* <p className="small me-4 mb-1 rounded-3 text-muted d-flex justify-content-end">
                        {formatDate(message.createdAt)}
                    </p> */}
                </div>
                {/* {avatar} */}
            </div>
            {/* <div className="divider d-flex align-items-center justify-content-center mb-4">
                <p
                    className="text-center mx-3 mb-0"
                    style={{ color: "#a2aab7" }}
                >
                    Today
                </p>
            </div> */}
        </>
    )
}

function formatDate(createdAt) {
    return `${new Date(createdAt).toLocaleDateString('en-US', { month: '2-digit', day: 'numeric', year: '2-digit', hour: '2-digit', minute: '2-digit' })}`;
}

export default RightMessage