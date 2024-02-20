import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone';
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'

import MetaData from '../Layout/MetaData'
import SideNav from '../Layout/SideNav'
import TopBar from '../Layout/TopBar'
import {
    Autocomplete,
    Box,
    Button,
    TextField,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from '@mui/material'

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

const groupChatData = [
    { label: 'The Brainstormers', image: 'https://via.placeholder.com/150' },
    { label: 'The Collaborators', image: 'https://via.placeholder.com/150' },
    { label: 'The Dream Team', image: 'https://via.placeholder.com/150' },
    { label: 'The Power Group', image: 'https://via.placeholder.com/150' },
    { label: 'The Innovation Hub', image: 'https://via.placeholder.com/150' },
    { label: 'The Creative Collective', image: 'https://via.placeholder.com/150' },
    { label: 'The Visionaries', image: 'https://via.placeholder.com/150' },
    { label: 'The Problem Solvers', image: 'https://via.placeholder.com/150' },
    { label: 'The Strategy Squad', image: 'https://via.placeholder.com/150' },
    { label: 'The Game Changers', image: 'https://via.placeholder.com/150' },
    { label: 'The Think Tank', image: 'https://via.placeholder.com/150' },
    { label: 'The Synergy Squad', image: 'https://via.placeholder.com/150' },
    { label: 'The Motivation Nation', image: 'https://via.placeholder.com/150' },
    { label: 'The Success Squad', image: 'https://via.placeholder.com/150' },
    { label: 'The Idea Exchange', image: 'https://via.placeholder.com/150' },
    { label: 'The Brain Trust', image: 'https://via.placeholder.com/150' },
    { label: 'The Solution Seekers', image: 'https://via.placeholder.com/150' },
    { label: 'The Genius Club', image: 'https://via.placeholder.com/150' },
    { label: 'The Inspiration Station', image: 'https://via.placeholder.com/150' },
    { label: 'The Achievement Alliance', image: 'https://via.placeholder.com/150' }
];

const Post = () => {
    const [files, setFiles] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            console.log(acceptedFiles)
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
            </div>
        </div>
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <>
            <MetaData pageTitle="Post Announcement" />
            <div style={{ display: 'flex', height: '100vh' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <MDBContainer style={{ maxWidth: 1120 }} className='mt-4'>
                        <MDBRow>
                            <MDBCol sm='12' md='6'>
                                <Box sx={{ boxShadow: 5, p: 2 }}>
                                    <Typography variant='h6' mb={2}>Post Announcement</Typography>
                                    <TextField placeholder='Title' size='small' fullWidth sx={{ mb: 2 }}></TextField>
                                    <TextField placeholder='Content' multiline rows={7} size='small' fullWidth sx={{ mb: 2 }}></TextField>
                                    <Box sx={{ border: 1, borderColor: '#C4C4C4', borderStyle: 'dashed', cursor: 'pointer' }}>
                                        <div {...getRootProps({ className: 'dropzone' })} style={{ border: 1, display: 'flex', flexDirection: 'column', paddingBottom: 10 }}>
                                            <input {...getInputProps()} />
                                            <p style={{ color: '#C4C4C4', textAlign: 'center' }} >Drag 'n' drop some files here, or click to select files</p>
                                            <img style={{ margin: 'auto', width: 100 }} src='https://static.vecteezy.com/system/resources/thumbnails/019/859/918/small/computer-and-electronic-device-icon-isolated-on-transparent-background-png.png' />
                                        </div>
                                    </Box>
                                    <aside style={thumbsContainer}>
                                        {thumbs}
                                    </aside>
                                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                        <Button variant='contained' sx={{ mr: 2 }}>Clear</Button>
                                        <Button variant='contained' sx={{ ms: 'auto' }}>Announce</Button>
                                    </Box>
                                </Box>
                            </MDBCol>

                            <MDBCol sm='12' md='6'>
                                <Box sx={{ boxShadow: 5, p: 2 }}>
                                    {/* <Typography variant='subtitle' mb={2} >Post Announcement</Typography> */}
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={groupChatData}
                                        sx={{ mb: 2 }}
                                        fullWidth
                                        renderInput={(params) => <TextField {...params} size='small' mb={2} fullWidth label="Select Group" />}
                                    />
                                    <Typography variant='subtitle' sx={{ mb: 2 }}>Announce to</Typography>
                                    <FormGroup sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <FormControlLabel control={<Checkbox />} label="All Users" />
                                        <FormControlLabel control={<Checkbox />} label="Parent" />
                                        <FormControlLabel control={<Checkbox />} label="Teacher" />
                                        <FormControlLabel control={<Checkbox />} label="Student" />
                                    </FormGroup>
                                </Box>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </main>
            </div>
        </>
    )
}

export default Post