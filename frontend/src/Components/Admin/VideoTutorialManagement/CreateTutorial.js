import React, { useState } from 'react'

import SideNav from '../../Layout/SideNav'
import TopBar from '../../Layout/TopBar'
import Block from '../../Layout/Loaders/Block'
import ToastEmmiter from '../../Layout/ToastEmmiter'
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios'

const CreateTutorial = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [videoPreview, setVideoPreview] = useState(null);




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

    const create = async (formData) => {
        setLoading(true)
        try {

            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/video-tutorial/create`, formData, {
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
        create(formData)
    }

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
                                    <Typography variant='h6'>Add New Tutorial</Typography>
                                    <TextField label='Title' size='medium' type='text' required fullWidth
                                        name='title'
                                    />
                                    <TextField label='Upload Video' type='file' size='medium' required fullWidth
                                        name='video'
                                        onChange={onChange}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                    {videoPreview ?
                                        <video id="videoPlayer" width="400" controls style={{ width: '100%' }}>
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
                                        <Button type='submit' variant='contained'>Create</Button>
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

export default CreateTutorial