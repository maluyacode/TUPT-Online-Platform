import React, { useEffect, useState } from 'react'

import SideNav from '../../Layout/SideNav'
import TopBar from '../../Layout/TopBar'
import Block from '../../Layout/Loaders/Block'
import ToastEmmiter from '../../Layout/ToastEmmiter'
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios'

const EditTutorial = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [videoPreview, setVideoPreview] = useState(null);
    const [tutorial, setTutorial] = useState({});
    const [title, setTitle] = useState('');

    const { id } = useParams()

    const onChange = (e) => {
        setLoading(true);
        if (e.target.name === 'video') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setLoading(false);
                    setVideoPreview(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setLoading(false);
        }
    };

    const getSingleTutorial = async () => {
        setLoading(true)
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/video-tutorial/get-single/${id}`, {
                withCredentials: true,
            })
            setTutorial(data.videoTutorial)
            setVideoPreview(data.videoTutorial.video.url)
            setTitle(data.videoTutorial.title)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            ToastEmmiter.error('Error occured');
            console.log(err);
        }
    }

    const update = async (formData) => {
        setLoading(true)
        try {

            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/video-tutorial/update/${id}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            ToastEmmiter.success(data.message, 'top-right');
            navigate('/admin/list-video-tutorial')
            setLoading(false)
        } catch (err) {
            setLoading(false)
            ToastEmmiter.error('Error occured');
            console.log(err);
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        const formData = new FormData(e.target);
        update(formData)
    }

    useEffect(() => {
        getSingleTutorial()
    }, [])

    console.log(videoPreview)

    return (
        <>
            <Block loading={loading} />
            <div style={{ display: 'flex', height: '100vh' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <MDBContainer fluid>
                        <MDBRow className='mt-3 '>
                            <MDBCol style={{ maxWidth: 700 }} className='mx-auto'>

                                <Paper onSubmit={handleSubmit} component={'form'} className='p-3 d-flex flex-column gap-3'>
                                    <Typography variant='h6'>Edit Tutorial</Typography>
                                    <TextField label='Title' size='medium' type='text' required
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        fullWidth
                                        name='title'
                                    />
                                    <TextField label='Upload New Video' type='file' size='medium' required fullWidth
                                        name='video'
                                        onChange={onChange}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                    {videoPreview ?
                                        <video key={videoPreview} id="videoPlayer" width="400" controls style={{ width: '100%' }}>
                                            <source src={videoPreview} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                        :
                                        <Box sx={{ width: 644, height: 362.250, borderWidth: 1, borderColor: 'black', borderStyle: 'solid' }} className='d-flex justify-content-center align-items-center'>
                                            <Typography>Preview will display here</Typography>
                                        </Box>
                                    }
                                    <Box className='d-flex flex-row justify-content-end gap-2'>
                                        <Button type='button' onClick={() => navigate('/admin/list-video-tutorial')} variant='contained'>Cancel</Button>
                                        <Button type='submit' variant='contained'>Update</Button>
                                    </Box>
                                </Paper>

                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </main>
            </div>
        </>
    )
}

export default EditTutorial