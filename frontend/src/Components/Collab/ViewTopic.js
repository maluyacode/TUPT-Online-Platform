import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Badge, Box, Button, Chip, Divider, Fade, Icon, IconButton, InputAdornment, MenuItem, Paper, Popper, TextField, Typography } from '@mui/material'
import GroupsIcon from '@mui/icons-material/Groups';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { deleteTopic, fetchSinglePost } from '../../api/collabsApi';
import ToastEmmiter from '../Layout/ToastEmmiter';
import Block from '../Layout/Loaders/Block';
import { colorCoding, profileHead } from '../../utils/avatar';
import FileDisplay from '../Generic/FileDisplay';
import CancelIcon from '@mui/icons-material/Cancel';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { createCommentApi } from '../../api/commentsApi';
import Comments from './Comments';
import { MDBIcon, MDBPopover, MDBPopoverBody, MDBPopoverHeader } from 'mdb-react-ui-kit';
import MenuListComposition from '../Generic/MenuListComposition';
import EditPost from './EditPost';
import Swal from 'sweetalert2'
import { getUser } from '../../utils/helper';

const ViewTopic = ({ setOpenRight, selectedPost, getAllTopics }) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState();
    const [editOpen, setEditOpen] = useState(false);

    const [topic, setTopic] = useState({});
    const [comments, setComments] = useState([]);
    const [replyTo, setReplyTo] = useState(null);
    const [replyToName, setReplyToName] = useState('');
    const [files, setFiles] = useState([]);
    const fileInput = useRef();


    const [toUpload, setToUpload] = useState([]);
    const [textContent, setTextContent] = useState('');

    const groupBox = useRef();
    groupBox?.current?.addEventListener('scroll', () => {
        setOpen(false)
    })

    const getTopic = async () => {
        setLoading(true)
        const { data } = await fetchSinglePost(selectedPost);
        if (data.success) {


            setLoading(false)
            setComments(data.comments)
            setTopic(data.topic);

        } else {
            ToastEmmiter.warning('Error fetching post', 'top-center');
            setLoading(false)
        }
    }

    useEffect(() => {
        getTopic(selectedPost)
    }, [selectedPost])

    const handleFiles = (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const filesData = [];

        // Function to handle completion after reading all files
        const handleCompletion = () => {
            // Update the state with the accumulated file data
            setFiles(prevFiles => [...prevFiles, ...filesData]);
            setToUpload(prevFiles => [...prevFiles, ...files]);
        };

        let processedFilesCount = 0;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = (event) => {
                filesData.push({
                    src: event.target.result,
                    name: file.name,
                    type: file.type,
                });

                // Check if all files have been processed
                processedFilesCount++;
                if (processedFilesCount === files.length) {
                    handleCompletion();
                }
            };

            reader.readAsDataURL(file);
        }
    };


    const removeFile = (name) => {
        const updatedFiles = files.filter(file => file.name !== name);
        const updatedToUpload = toUpload.filter(file => file.name !== name);
        setToUpload(updatedToUpload)
        setFiles(updatedFiles);
    }

    const makeComment = async () => {
        setLoading(true)
        const { data } = await createCommentApi({
            files: toUpload,
            textContent: textContent,
            selectedPost: selectedPost,
            replyTo: replyTo,
        })

        if (data.success) {
            setFiles([])
            setToUpload([])
            setTextContent('')
            setLoading(false)
            getTopic(selectedPost)
            setReplyTo(null)
            ToastEmmiter.success(data.message)
        } else {
            setFiles([])
            setReplyTo(null)
            setToUpload([])
            setTextContent('')
            ToastEmmiter.success('System error, please try again later');
            setLoading(false)
        }
    }

    const deleteMyTopic = async (id) => {
        setLoading(true)
        const { data } = await deleteTopic(selectedPost);
        if (data.success) {
            getAllTopics()
            setLoading(false)
            setOpenRight(false)
            ToastEmmiter.success(data.message)
        } else {
            ToastEmmiter.warning('Error fetching post', 'top-center');
            setLoading(false)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        makeComment();
    }

    const handleEdit = () => {
        setEditOpen(true)
    }

    const handleDelete = () => {
        Swal.fire({
            // title: "Are you sure?",
            text: "Delete this topic?",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMyTopic(selectedPost)
            }
        });
    }

    const menuList = [
        {
            func: [handleEdit],
            icon: <MDBIcon fas icon="edit" />,
            text: 'Edit'
        },
        {
            func: [handleDelete],
            icon: <MDBIcon fas icon="trash" />,
            text: 'Delete'
        }
    ]

    return (
        <>
            <EditPost open={editOpen} setOpen={setEditOpen} topic={topic} getTopic={getTopic} getAllTopics={getAllTopics} />
            <Paper className='p-3'>
                <Block loading={loading} />
                <div >
                    <Box className='d-flex align-items-center'>
                        <Typography>{topic.heading}</Typography>
                        <Box ml={'auto'} className='d-flex'>
                            {getUser()._id === topic?.postedBy?._id && (
                                <MenuListComposition menuList={menuList} buttonOpener={<MoreHorizIcon />} />
                            )}
                            <IconButton onClick={() => setOpenRight(false)} size='small'>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    <Divider sx={{ borderBottom: 2 }} />

                    <Box ref={groupBox} style={{ height: '70vh', overflowY: 'auto' }} className='px-2'>
                        <GroupsIcon sx={{ fontSize: 80 }} />
                        <Typography fontSize={30}>{topic.heading}</Typography>
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
                                    <Typography className='fw-bold' color={colorCoding(topic.postedBy?.role)}>{topic.postedBy?.firstname} {topic.postedBy?.lastname}</Typography>
                                    <small style={{ fontSize: 12 }}>{computeTimeElapsed(topic.createdAt, topic.updatedAt)}</small>
                                </div>
                                <Typography>{topic.body}</Typography>
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
                        <Comments
                            key={loading}
                            comments={comments}
                            open={open}
                            setOpen={setOpen}
                            setReplyTo={setReplyTo}
                            replyTo={replyTo}
                            setReplyToName={setReplyToName}
                            parentRef={groupBox}
                            getTopic={getTopic}
                        />
                    </Box>

                </div>

                <div style={{ position: 'relative' }}>
                    {replyTo || files?.length > 0 ?
                        <Paper style={{
                            position: 'absolute', left: 0, right: 0, zIndex: 1000,
                            top: replyTo && files?.length > 0 ? -220 : files?.length > 0 ? -180 : -30
                        }}>
                            {replyTo ?
                                <Box sx={{ height: 40, p: 1 }} className='d-flex align-items-center justify-content-between'>
                                    <Typography>Replying to: {replyToName}</Typography>
                                    <CancelIcon onClick={() => {
                                        setReplyTo(null)
                                        setReplyToName('')
                                    }} sx={{ fontSize: 25, cursor: 'pointer' }} />
                                </Box>
                                : ""}
                            <Divider sx={{ borderBottom: 2 }} />
                            {files?.length > 0 && (
                                <Box className='d-flex gap-3' sx={{ p: 2, overflowX: 'auto' }}>
                                    {files?.map((file, i) => (
                                        <Fragment key={i}>{
                                            file.type.split('/')[0] === 'image' ?
                                                <Badge badgeContent={
                                                    <CancelIcon onClick={() => removeFile(file.name)} sx={{ fontSize: 25, cursor: 'pointer' }} />
                                                }>
                                                    <Paper className='p-3'>
                                                        <img src={file.src} height={100} alt="Placeholder" />
                                                        <Typography>{file.name.substring(0, 8)}...</Typography>
                                                    </Paper>
                                                </Badge>
                                                :
                                                <Badge badgeContent={
                                                    <CancelIcon onClick={() => removeFile(file.name)} sx={{ fontSize: 25, cursor: 'pointer' }} />
                                                }>
                                                    <Paper className='p-3'>
                                                        <div style={{ width: 83, margin: 'auto' }}>
                                                            <FileIcon extension={fileType(file.name)} {...defaultStyles[fileType(file.name)]} />
                                                        </div>
                                                        <Typography>{file.name.substring(0, 10)}</Typography>
                                                    </Paper>
                                                </Badge>
                                        }</Fragment>
                                    ))}
                                </Box >
                            )}
                        </Paper>
                        : ""}
                    <form onSubmit={handleSubmit}>
                        <TextField fullWidth placeholder='Send comment in Try Forums' className='mt-3' size='small'
                            value={textContent}
                            name='texContent'
                            onChange={e => setTextContent(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <UploadFileIcon onClick={() => fileInput.current.click()} sx={{ fontSize: 30, cursor: 'pointer' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <input multiple onChange={handleFiles} ref={fileInput} type='file' style={{ display: 'none' }} />
                    </form>
                </div>

            </Paper>
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
export default ViewTopic