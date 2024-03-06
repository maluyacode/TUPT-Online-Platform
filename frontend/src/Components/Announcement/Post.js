import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone';
import { MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdb-react-ui-kit'
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
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import DropzoneFile from '../Generic/DropzoneFile';
import MetaData from '../Layout/MetaData'
import SideNav from '../Layout/SideNav'
import TopBar from '../Layout/TopBar'
import PostSchema from '../ValidationSchema/PostSchema';
import ErrorMessage from '../Layout/ErrorMessage';
import Block from '../Layout/Loaders/Block';

import { getUser } from '../../utils/helper';
import ToastEmmiter from '../Layout/ToastEmmiter';
import { socket } from '../../socket';

const Post = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const [ownedGroups, setOwnedGroups] = useState([]);

    const getOwnedGroups = async () => {

        try {
            setLoading(true);

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/group/get-all?owner=${getUser()._id}`, {
                withCredentials: true,
            })
            data.groups.unshift({
                groupName: 'Announce to all people',
                _id: 'all'
            })
            setOwnedGroups(data.groups)
            setLoading(false)

        } catch (err) {
            console.log(err)

        }
    }

    const pushNotifyAnnouncement = (data) => {

        socket.emit('new-announcement', JSON.stringify({
            teacher: getUser(),
            announcement: data.announcement,
            group: data.announcement.groupViewers,
        }))

    }

    const makeAnnouncement = async (formData) => {
        setLoading(true)
        try {

            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/announcement/create`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            ToastEmmiter.success(data.message, 'top-right');
            navigate('/announcements')
            setLoading(false)

            pushNotifyAnnouncement(data)

        } catch (err) {
            setLoading(false)
            ToastEmmiter.error('Error occured');
            console.log(err);
        }
    }

    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            images: '',
            files: '',
            groupViewers: '',
            canViewBy: []
        },
        validateOnChange: true,
        validationSchema: PostSchema,
        validateOnMount: true,
        onSubmit: async (values) => {
            const formData = new FormData;
            formData.append('title', values.title)
            formData.append('content', values.content)
            formData.append('groupViewers', values.groupViewers._id)
            formData.append('canViewBy', JSON.stringify(values.canViewBy))
            for (let i = 0; i < values.images.length; i++) {
                formData.append('images', values.images[i]);
            }
            for (let i = 0; i < values.files.length; i++) {
                formData.append('files', values.files[i]);
            }
            makeAnnouncement(formData);
        },
    });

    const handleViewers = e => {
        formik.setFieldTouched('canViewBy', true)
        if (e.target.checked) {
            formik.setFieldValue('canViewBy', [...formik.values.canViewBy, e.target.value]);
        } else {
            formik.setFieldValue('canViewBy', formik.values.canViewBy.filter((item) => item !== e.target.value));
        }
    }

    useEffect(() => {
        getOwnedGroups();
    }, [])

    return (
        <>
            <Block loading={loading} />
            <MetaData pageTitle="Post Announcement" />
            <div style={{ display: 'flex', height: '100vh' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <MDBContainer style={{ maxWidth: 1120 }} className='mt-4'>
                        <form onSubmit={formik.handleSubmit}>
                            <MDBRow>
                                <MDBCol sm='12' md='6'>
                                    <Box sx={{ boxShadow: 5, p: 2 }}>
                                        <Typography variant='h6' mb={2}>Post Announcement</Typography>

                                        <TextField placeholder='Title' size='small' fullWidth
                                            name='title'
                                            value={formik.values.title}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <ErrorMessage formik={formik} name='title' />

                                        <TextField placeholder='Content' multiline rows={7} size='small' fullWidth
                                            name='content'
                                            value={formik.values.content}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <ErrorMessage formik={formik} name='content' />

                                        <label className='w-100 d-flex justify-content-between' htmlFor='imageInput' style={{ overflowX: 'hidden', border: '1px solid black', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
                                            <input
                                                type='file'
                                                id='imageInput'
                                                multiple
                                                style={{ display: 'none' }}
                                                accept='image/*'
                                                name='images'
                                                onChange={(e) => {
                                                    formik.setFieldTouched('images', true);
                                                    formik.setFieldValue('images', e.target.files)
                                                }}
                                            />
                                            <div className='d-flex justify-content-between gap-2' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}>
                                                <AddPhotoAlternateIcon /> <span>{fileMessage('images', formik)} </span>
                                            </div>
                                        </label>
                                        <ErrorMessage formik={formik} name='images' />

                                        <label className='w-100 d-flex justify-content-between' htmlFor='fileInput' style={{ overflowX: 'hidden', border: '1px solid black', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
                                            <input
                                                type='file'
                                                id='fileInput'
                                                multiple
                                                accept='.pdf'
                                                style={{ display: 'none' }}
                                                name='files'
                                                onChange={(e) => {
                                                    formik.setFieldTouched('files', true);
                                                    formik.setFieldValue('files', e.target.files)
                                                }}
                                            />
                                            <div className='d-flex justify-content-between gap-2' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}>
                                                <UploadFileIcon /> <span> {fileMessage('files', formik)} </span>
                                            </div>
                                        </label>
                                        <ErrorMessage formik={formik} name='files' />

                                        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                            <Button variant='contained' sx={{ mr: 2 }}>Clear</Button>
                                            <Button variant='contained' sx={{ ms: 'auto' }} type='submit'>Announce</Button>
                                        </Box>
                                    </Box>
                                </MDBCol>

                                <MDBCol sm='12' md='6'>
                                    <Box sx={{ boxShadow: 5, p: 2 }}>
                                        {/* <Typography variant='subtitle' mb={2} >Post Announcement</Typography> */}
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={ownedGroups}
                                            getOptionLabel={(option) => option.groupName}
                                            isOptionEqualToValue={(option, value) => option._id === value._id}
                                            name='groupViewers'
                                            onChange={(event, newValue) => {
                                                formik.setFieldTouched('groupViewers', true);
                                                if (!newValue) {
                                                    formik.setFieldValue('groupViewers', '');
                                                    return
                                                }
                                                // console.log(newValue)
                                                formik.setFieldValue('groupViewers', newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} size='small' fullWidth label="Select Group" />}
                                        />
                                        <ErrorMessage formik={formik} name='groupViewers' />
                                        <Typography variant='subtitle' sx={{ mb: 2 }}>Announce to</Typography>
                                        <FormGroup sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <FormControlLabel onChange={handleViewers} name='canViewBy' value={'parent'} control={<Checkbox />} label="Parent" />
                                            <FormControlLabel onChange={handleViewers} name='canViewBy' value={'teacher'} control={<Checkbox />} label="Teacher" />
                                            <FormControlLabel onChange={handleViewers} name='canViewBy' value={'student'} control={<Checkbox />} label="Student" />
                                        </FormGroup>
                                        <ErrorMessage formik={formik} name='canViewBy' />
                                    </Box>
                                </MDBCol>
                            </MDBRow>
                        </form>
                    </MDBContainer>
                </main>
            </div >
        </>
    )
}

const fileMessage = (field, formik) => {
    if (formik.errors[field]) {
        return formik.values[field] ? `${formik.values[field].length} file${formik.values[field].length > 1 ? 's' : ''}  uploaded` : `Upload one or more ${field}`
    }
    return formik.values[field] ? `${formik.values[field].length} ${formik.values[field].length > 1 ? field : field.slice(0, -1)}  uploaded` : `Upload one or more ${field}`
}

export default Post