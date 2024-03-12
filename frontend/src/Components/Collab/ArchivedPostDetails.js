import React, { Fragment, useEffect, useState } from 'react'

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import MetaData from '../Layout/MetaData';
import Block from '../Layout/Loaders/Block';
import SideNav from '../Layout/SideNav';
import TopBar from '../Layout/TopBar';
import { MDBContainer } from 'mdb-react-ui-kit';
import { fetchSinglePost } from '../../api/collabsApi';
import ToastEmmiter from '../Layout/ToastEmmiter';
import { Delete, Group, MoreHoriz, Shortcut } from '@mui/icons-material';
import { Badge, Box, Chip, Divider } from '@mui/material';
import { colorCoding, profileHead } from '../../utils/avatar';
import FileDisplay from '../Generic/FileDisplay';

import filipinoBarwords from 'filipino-badwords-list';
import Filter from 'bad-words';
import Swal from 'sweetalert2';
import { deleteCommentApi } from '../../api/commentsApi';
import { getUser } from '../../utils/helper';
import { filterText } from '../../utils/filterText';

const ArchivedPostDetails = ({ setOpen, open, selectedPostId }) => {

    const [loading, setLoading] = useState(false);
    const [topic, setTopic] = useState({})
    const [comments, setComments] = useState([]);

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);


    const getTopic = async () => {
        setLoading(true)
        const { data } = await fetchSinglePost(selectedPostId);
        if (data.success) {
            console.log(data)
            setLoading(false)
            setComments(data.comments)
            setTopic(data.topic);

        } else {
            ToastEmmiter.warning('Error fetching post', 'top-center');
            setLoading(false)
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (selectedPostId) {
            getTopic();
        }
    }, [selectedPostId])

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

    const handleDelete = (id) => {
        if (window.confirm("Once you proceed with this action, it cannot be undone! By proceeding, this content will no longer be visible to users.")) {
            deleteComment(id)
        } else {

        }

    }

    return (
        <React.Fragment>
            <Block loading={loading} />
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                scroll={'paper'}
                fullWidth
                maxWidth={'md'}
            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {filterText(topic.heading)}
                </DialogTitle>
                <DialogContent dividers id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}>

                    <Typography fontSize={30}>{filterText(topic.heading)}</Typography>
                    <div className='my-2 mb-3'>
                        {topic?.category?.map((name, i) => (
                            <Chip key={i} className='mx-1' label={name} />
                        ))}
                    </div>

                    {/* Profile and Comment */}
                    <Box className='d-flex flex-row gap-2'>

                        <div className='mt-2'>
                            {profileHead(topic?.postedBy)}
                        </div>

                        <div className='mt-1'>
                            <div className='d-flex gap-2'>
                                <Typography className='fw-bold' color={colorCoding(topic.postedBy?.role)}>{topic.postedBy?.firstname || "User not available"} {topic.postedBy?.lastname}</Typography>
                                <small style={{ fontSize: 12 }}>{computeTimeElapsed(topic.createdAt, topic.updatedAt)}</small>
                            </div>
                            <pre>
                                <Typography>
                                    {filterText(topic.body)}
                                </Typography>
                            </pre>
                            {topic?.images?.map((image, i) => (
                                <Fragment key={i}>
                                    <a href={image.url} target="_blank" rel="noopener noreferrer">
                                        <img height={200} className='mt-2' src={image.url} alt="Description of the image" />
                                    </a>
                                    <br />
                                </Fragment>
                            ))}

                            {topic?.attachments?.map((attachment, i) => (
                                <Fragment key={i}>
                                    <div className='mt-2'>
                                        <FileDisplay attachment={attachment} />
                                    </div>
                                </Fragment>
                            ))}
                        </div>

                    </Box>
                    {/* Profile and Comment */}

                    <Divider sx={{ borderBottom: 8, my: 3, mb: 1 }} />
                    {comments?.length <= 0 && (
                        <Typography>No comments available</Typography>
                    )}
                    {comments?.map((comment, i) => (
                        <Fragment key={i}>
                            {comment.repliedTo && (
                                <Box className='d-flex gap-2 align-items-center' sx={{ cursor: 'pointer' }}>
                                    <Shortcut />
                                    <Typography fontSize={13}>{comment.repliedTo?.commentedBy?.firstname || "User not available"} {comment.repliedTo?.commentedBy?.lastname}: </Typography>
                                    <Typography fontSize={13}>{filterText(comment.repliedTo?.textContent).trim().substring(0, 10)}...</Typography>
                                </Box>
                            )}
                            <Box id={comment._id} key={i} className='d-flex flex-row gap-2 pb-3 px-2 for-background' >

                                <div className='mt-2'>
                                    {profileHead(comment?.commentedBy)}
                                </div>

                                <div className='' style={{ width: '90%' }}>
                                    <div className='d-flex gap-2 align-items-center'>
                                        <Typography className='fw-bold' color={colorCoding(comment.commentedBy?.role)}>{comment.commentedBy?.firstname || "User not available"} {comment.commentedBy?.lastname}</Typography>
                                        <small style={{ fontSize: 12 }}>{computeTimeElapsed(comment.createdAt, comment.updatedAt)}</small>
                                        {getUser().role === 'admin' && (
                                            <>
                                                {!comment.deletedAt ?

                                                    <IconButton size='small'
                                                        onClick={() => handleDelete(comment._id)}
                                                    >
                                                        <Delete fontSize='small' />
                                                    </IconButton>
                                                    : <Typography color={'red'}><i>No longer available to user</i></Typography>
                                                }
                                            </>
                                        )}
                                    </div>
                                    <div className='overflow-hidden' >
                                        <Typography sx={{ wordWrap: 'break-word', }}>{filterText(comment.textContent)}</Typography>
                                    </div>
                                    {comment?.images?.map((image, i) => (
                                        <div key={i} >
                                            <a href={image.url} target="_blank" rel="noopener noreferrer">
                                                <img height={200} className='mt-2' src={image.url} alt="Description of the image" />
                                            </a>
                                            <br />
                                        </div>
                                    ))}

                                    {comment?.attachments?.map((attachment, i) => (
                                        <Fragment key={i}>
                                            <div className='mt-2 d-flex align-items-center gap-1'>
                                                <FileDisplay attachment={attachment} />
                                            </div>
                                        </Fragment>
                                    ))}
                                </div>

                            </Box >
                            <Divider sx={{ borderBottom: 2, mb: 1 }} />
                        </Fragment>
                    ))}

                </DialogContent>
                {/* <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions> */}
            </Dialog>
        </React.Fragment >
    )
}

// const filterText = (text) => {
//     try {
//         const filter = new Filter({ list: filipinoBarwords.array });
//         if (typeof text === 'string') {
//             return filter.clean(text);
//         } else {
//             return text;
//         }
//     } catch (error) {
//         console.error('Error filtering text:', error);
//         return text;
//     }
// }

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

export default ArchivedPostDetails