import React, { useEffect, useState } from 'react'

import SideNav from '../../Layout/SideNav'
import TopBar from '../../Layout/TopBar'
import Block from '../../Layout/Loaders/Block'
import ToastEmmiter from '../../Layout/ToastEmmiter'
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom'
import { Box, Button, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import axios from 'axios'
import { Delete, DisabledByDefault, Edit, EditNote } from '@mui/icons-material'
import Swal from 'sweetalert2'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const VideoTutorialsList = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [tutorials, settutorials] = useState([]);

    const getVideoTutorials = async () => {

        setLoading(true)
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/video-tutorial/get-all`, {
                withCredentials: true,
            })
            settutorials(data.videoTutorials)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            ToastEmmiter.error('Error occured');
            console.log(err);
        }
    }

    const disable = async (id, status) => {
        setLoading(true)
        try {

            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/video-tutorial/disable/${id}?status=${status}`, {}, {
                withCredentials: true,
            })
            getVideoTutorials();
            setLoading(false)
        } catch (err) {
            setLoading(false)
            ToastEmmiter.error('Error occured');
            console.log(err);
        }
    }

    const handleDisable = (id, status) => {
        Swal.fire({
            // title: "Are you sure?",
            text: status === 'enable' ? "This content will be visible to users." : "This content will no longer be visible to users.",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                disable(id, status)
            }
        });
    }


    const deleteItem = async (id) => {
        setLoading(true)
        try {

            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/video-tutorial/delete/${id}`, {
                withCredentials: true,
            })
            ToastEmmiter.success(data.message, 'top-right');
            getVideoTutorials();
            setLoading(false)
        } catch (err) {
            setLoading(false)
            ToastEmmiter.error('Error occured');
            console.log(err);
        }
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Once you proceed with this action, it cannot be undone! By proceeding, this content will no longer be available anymore.",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteItem(id)
            }
        });
    }

    useEffect(() => {
        getVideoTutorials()
    }, [])


    return (
        <>
            <Block loading={loading} />
            <div style={{ display: 'flex', height: '100vh' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <MDBContainer fluid className='gap-3'>
                        <MDBRow className='mt-3'>
                            <MDBCol>
                                <Button onClick={() => navigate('/admin/create-video-tutorial')} variant='contained'>Add New Tutorial</Button>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className='mt-3'>
                            {tutorials?.map(tutorial => (
                                <MDBCol key={tutorial._id} sm={12} md={6} lg={4}>
                                    <Paper className='p-2 px-4 pb-3' sx={{ backgroundColor: tutorial.isDisabled ? '#D37676' : '#DCFFB7' }}>
                                        <Box className='d-flex justify-content-between align-items-center'>
                                            <Typography className='fw-bold' fontSize={20}>{tutorial.title}</Typography>
                                            <div>
                                                <Tooltip title='Edit'>
                                                    <IconButton onClick={() => navigate(`/admin/edit-video-tutorial/${tutorial._id}`)} size='small'>
                                                        <EditNote fontSize='medium' />
                                                    </IconButton>
                                                </Tooltip>
                                                {!tutorial.isDisabled ?
                                                    <Tooltip title='Disable'>
                                                        <IconButton onClick={() => handleDisable(tutorial._id, 'disable')}>
                                                            <RemoveCircleOutlineIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    :
                                                    <Tooltip title='Enable'>
                                                        <IconButton onClick={() => handleDisable(tutorial._id, 'enable')}>
                                                            <RemoveCircleOutlineIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                }
                                                <Tooltip title='Delete'>
                                                    <IconButton onClick={() => handleDelete(tutorial._id)} size='small'>
                                                        <Delete fontSize='small' />
                                                    </IconButton>
                                                </Tooltip>

                                            </div>
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
                </main>
            </div >
        </>
    )
}

export default VideoTutorialsList