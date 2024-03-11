import { Badge, Box, Button, ClickAwayListener, Divider, Fade, IconButton, Paper, Popper, TextField, Typography } from '@mui/material'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { colorCoding, profileHead } from '../../utils/avatar'
import FileDisplay from '../Generic/FileDisplay'
import MoreHoriz from '@mui/icons-material/MoreHoriz'
import Swal from 'sweetalert2'
import { MDBIcon } from 'mdb-react-ui-kit'
import ShortcutIcon from '@mui/icons-material/Shortcut';
import ToastEmmiter from '../Layout/ToastEmmiter'
import Block from '../Layout/Loaders/Block'
import { deleteCommentApi, deleteCommentedFileApi, editCommentApi } from '../../api/commentsApi'
import { getUser } from '../../utils/helper'

import filipinoBarwords from 'filipino-badwords-list';
import Filter from 'bad-words';

const Comments = ({ comments, open, setOpen, setReplyTo, replyTo, setReplyToName, parentRef, getTopic }) => {

    const filter = new Filter({ list: filipinoBarwords.array });

    const [loading, setLoading] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [placement, setPlacement] = React.useState();
    const [prevButtonId, setPrevButtonId] = useState();
    const [name, setName] = useState('')
    const [isEditing, setIsEditing] = useState(false);

    const [initialText, setInitialText] = useState('');
    const [textContent, setTextContent] = useState('');

    const [commentedById, setCommentedById] = useState('');

    const handleClick = (newPlacement) => (event) => {

        const newButtonId = event.currentTarget.getAttribute('data-id');
        const name = event.currentTarget.getAttribute('data-name');
        const textContent = event.currentTarget.getAttribute('data-text-content');
        const commentedby = event.currentTarget.getAttribute('data-commentedby');

        setCommentedById(commentedby)
        setIsEditing(false)
        setName(name);
        setInitialText(textContent)

        if (open && prevButtonId === newButtonId) {
            setPrevButtonId(newButtonId)
            setOpen(false)
        } else {
            setPrevButtonId(newButtonId)
            setOpen(true)
        }
        setAnchorEl(event.currentTarget);
        // setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    window.addEventListener('scroll', () => {
        setOpen(false)
    })


    const editComment = async (e) => {
        e.preventDefault();
        setLoading(true)
        const { data } = await editCommentApi(prevButtonId, { textContent: e.target.textContent.value });
        if (data.success) {
            ToastEmmiter.success(data.message)
            setLoading(false)
            getTopic()
        } else {
            ToastEmmiter.warning('System error, please try again later', 'top-center');
            setLoading(false)
        }
    }


    const deleteComment = async (id) => {
        setLoading(true)
        const { data } = await deleteCommentApi(id);
        if (data.success) {
            ToastEmmiter.success(data.message)
            setLoading(false)
            getTopic()
        } else {
            ToastEmmiter.warning('System error, please try again later', 'top-center');
            setLoading(false)
        }
    }


    const handleReply = () => {
        setReplyToName(name)
        changingBackground(prevButtonId)
        setOpen(false)
        setReplyTo(prevButtonId)
    }

    const handleEdit = () => {
        changingBackground(prevButtonId)
        setOpen(false)
        setTextContent(initialText);
        setIsEditing(true);
        // console.log(textContent)
        // editComment(prevButtonId)
    }

    const handleDelete = () => {
        changingBackground(prevButtonId)
        setOpen(false)
        Swal.fire({
            // title: "Are you sure?",
            text: "Delete this comment?",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteComment(prevButtonId)
            }
            removeBackground();
        });
    }

    const changingBackground = (id) => {
        const elements = document.getElementsByClassName('for-background');
        for (const element of elements) {
            element.style.backgroundColor = '';
        }
        document.getElementById(`${id}`).style.backgroundColor = '#E6E9EC';
    }

    const removeBackground = () => {
        const elements = document.getElementsByClassName('for-background');
        for (const element of elements) {
            element.style.backgroundColor = '';
        }
    }

    useEffect(() => {
        if (!replyTo) {
            removeBackground()
        }
    }, [replyTo])

    const viewRepliedComment = (id) => {
        console.log(id)
        // const parentElement = parentRef.current;
        // const childElement = parentElement.querySelector(`[id="${id}"]`);

        // const parentHeight = parentElement.getBoundingClientRect().bottom
        // const childHeight = childElement.getBoundingClientRect().bottom
        // console.log(childHeight)
        // // console.log(parentHeight)
        // const top = childHeight - parentHeight
        // // console.log(top)
        // parentElement.scrollTo(0, childHeight);
    }

    const deleteFile = async (publicId) => {
        setLoading(true)
        const { data } = await deleteCommentedFileApi(prevButtonId, publicId);
        if (data.success) {
            ToastEmmiter.success(data.message)
            setLoading(false)
            getTopic()
        } else {
            ToastEmmiter.warning('System error, please try again later', 'top-center');
            setLoading(false)
        }
    }

    const handleDeleteFile = (publicId) => {
        Swal.fire({
            // title: "Are you sure?",
            text: "Delete this attachment?",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteFile(publicId)
            }
            removeBackground();
        });
    }

    console.log(commentedById)

    return (
        <>
            <Block loading={loading} />

            <Popper
                sx={{ zIndex: 1200 }}
                open={open}
                anchorEl={anchorEl}
                placement={placement}
                transition
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={() => setOpen(false)}>
                        <Fade {...TransitionProps} timeout={100}>
                            <Paper className='d-flex flex-row' sx={{ p: 1 }}>
                                <Button onClick={handleReply} size='large'>
                                    <MDBIcon fas icon="reply" />
                                </Button>
                                {getUser()._id === commentedById && (
                                    <>
                                        <Button onClick={handleEdit} size='large'>
                                            <MDBIcon fas icon="edit" />
                                        </Button>
                                        <Button onClick={handleDelete} size='large'>
                                            <MDBIcon fas icon="trash-alt" />
                                        </Button>
                                    </>
                                )}
                            </Paper>
                        </Fade>
                    </ClickAwayListener>
                )}
            </Popper>
            {comments?.map((comment, i) => (
                <Fragment key={i}>
                    {comment.repliedTo && (
                        <Box onClick={() => viewRepliedComment(comment._id)} className='d-flex gap-2 align-items-center' sx={{ cursor: 'pointer' }}>
                            <ShortcutIcon />
                            <Typography fontSize={13}>{comment.repliedTo?.commentedBy.firstname} {comment.repliedTo?.commentedBy.lastname}: </Typography>
                            <Typography fontSize={13}>{filterText(comment.repliedTo?.textContent).trim().substring(0, 10)}...</Typography>
                        </Box>
                    )}
                    <Box id={comment._id} key={i} className='d-flex flex-row gap-2 pb-3 px-2 for-background' >

                        <div className='mt-2'>
                            {profileHead(comment?.commentedBy)}
                        </div>

                        <div className='' style={{ width: '90%' }}>
                            <div className='d-flex gap-2 align-items-center'>
                                <Typography className='fw-bold' color={colorCoding(comment.commentedBy?.role)}>{comment.commentedBy?.firstname} {comment.commentedBy?.lastname}</Typography>
                                <small style={{ fontSize: 12 }}>{computeTimeElapsed(comment.createdAt, comment.updatedAt)}</small>
                                <IconButton size='small' key={comment._id + i}
                                    data-id={comment._id}
                                    data-commentedby={comment.commentedBy?._id}
                                    data-name={`${comment.commentedBy?.firstname} ${comment.commentedBy?.lastname}`}
                                    data-text-content={comment.textContent}
                                    onClick={handleClick('bottom')} >
                                    <MoreHoriz />
                                </IconButton>
                            </div>
                            <div className='overflow-hidden' >
                                {isEditing && prevButtonId === comment._id ?
                                    <form onSubmit={editComment}>
                                        <TextField autoFocus fullWidth size='small' value={textContent}
                                            name='textContent'
                                            onChange={(e) => setTextContent(e.target.value)}
                                            InputProps={{
                                                endAdornment: (
                                                    <Button size='small' onClick={() => {
                                                        setIsEditing(false)
                                                        setTextContent('')
                                                        setInitialText('')
                                                        removeBackground()
                                                    }}>Cancel</Button>
                                                )
                                            }} />
                                    </form>
                                    :
                                    <Typography sx={{ wordWrap: 'break-word', }}>{filterText(comment.textContent)}</Typography>
                                }
                            </div>
                            {comment?.images?.map((image, i) => (

                                <div key={i} >
                                    <Badge badgeContent={
                                        <>
                                            {isEditing && prevButtonId === comment._id ?
                                                <MDBIcon onClick={() => handleDeleteFile(image.public_id)} fas icon="trash-alt" style={{
                                                    fontSize: 25, cursor: 'pointer', color: 'red',
                                                    marginBottom: -55, marginLeft: -35
                                                }} /> : ""
                                            }
                                        </>
                                    }>
                                        <a href={image.url} target="_blank" rel="noopener noreferrer">
                                            <img height={200} className='mt-2' src={image.url} alt="Description of the image" />
                                        </a>
                                        <br />
                                    </Badge>
                                </div>
                            ))}

                            {comment?.attachments?.map((attachment, i) => (
                                <Fragment key={i}>
                                    <div className='mt-2 d-flex align-items-center gap-1'>
                                        <FileDisplay attachment={attachment} />
                                        {isEditing && prevButtonId === comment._id ?
                                            <MDBIcon onClick={() => handleDeleteFile(attachment.public_id)} fas icon="trash-alt" style={{
                                                fontSize: 25, cursor: 'pointer', color: 'red',
                                            }} />
                                            : ""}
                                    </div>
                                </Fragment>
                            ))}
                        </div>

                    </Box >
                    <Divider sx={{ borderBottom: 2, mb: 1 }} />
                </Fragment>
            ))}
        </>
    )
}

const fileType = (fileName) => {
    const parts = fileName.split('.');
    return parts[parts.length - 1];
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
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

function computeTimeElapsed(createdAt, updatedAt) {
    const now = new Date();
    const createdDate = new Date(updatedAt);
    const elapsedMilliseconds = now - createdDate;

    const minutes = Math.floor(elapsedMilliseconds / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    let textIndication = ''

    if (createdAt !== updatedAt) {
        textIndication = 'Edited';
    }

    if (months > 0) {
        return months === 1 ? `${textIndication} ${months}m ago` : `${textIndication} ${months}mos ago`;
    } else if (days > 0) {
        return days === 1 ? `${textIndication} ${days}d ago` : `${textIndication} ${days}d ago`;
    } else if (hours > 0) {
        return hours === 1 ? `${textIndication} ${hours}h ago` : `${textIndication} ${hours}h ago`;
    } else {
        return minutes <= 1 ? `${textIndication} Just now` : `${textIndication} ${minutes}m ago`;
    }
}

export default Comments