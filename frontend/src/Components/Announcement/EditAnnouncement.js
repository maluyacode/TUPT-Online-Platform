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
    IconButton,
    Dialog,
    DialogContent,
    DialogActions,
    Paper,
} from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import DropzoneFile from '../Generic/DropzoneFile';
import MetaData from '../Layout/MetaData'
import SideNav from '../Layout/SideNav'
import TopBar from '../Layout/TopBar'
import PostSchema from '../ValidationSchema/PostSchema';
import ErrorMessage from '../Layout/ErrorMessage';
import Block from '../Layout/Loaders/Block';

import { getUser } from '../../utils/helper';
import ToastEmmiter from '../Layout/ToastEmmiter';
import { getOwnedGroups } from '../../api/groupsAPI';
import { getSingleAnnouncement, updateAnnouncement } from '../../api/announcementsAPI';
import { FileIcon, defaultStyles } from 'react-file-icon';

const EditAnnouncement = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const { id } = useParams();
    const [open, setOpen] = React.useState(false);

    const [ownedGroups, setOwnedGroups] = useState([]);
    const [announcement, setAnnouncement] = useState([]);
    const [toView, setToView] = useState('');

    const getMyGroups = async () => {
        setOwnedGroups(await getOwnedGroups());
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
            setLoading(true)
            const { data } = await updateAnnouncement(values, id);
            if (data.success) {
                setLoading(false)
                ToastEmmiter.success(data.message, 'top-right')
                navigate('/teachers-post');
            } else {
                ToastEmmiter.warning('System error, please try again later', 'top-right')
                setLoading(false)
            }
        },
    });

    const getAnnouncement = async () => {
        setLoading(true)
        const { data } = await getSingleAnnouncement(id);
        if (data.success) {     

            setLoading(false)
            setAnnouncement(data.announcement)

            const { announcement } = data;

            formik.setFieldValue('title', announcement.title)
            formik.setFieldValue('content', announcement.content)
            if (!announcement.groupViewers) {
                announcement.groupViewers = {
                    groupName: 'Announce to all people',
                    _id: 'all'
                }
            }
            formik.setFieldValue('groupViewers', announcement.groupViewers)
            formik.setFieldValue('canViewBy', announcement.canViewBy)

        } else {
            setLoading(false)
            ToastEmmiter.warning('System error, please try again later');
        }
    }

    const handleViewers = e => {
        formik.setFieldTouched('canViewBy', true)
        if (e.target.checked) {
            formik.setFieldValue('canViewBy', [...formik.values.canViewBy, e.target.value]);
        } else {
            formik.setFieldValue('canViewBy', formik.values.canViewBy.filter((item) => item !== e.target.value));
        }
    }


    const handleClickOpen = (whatToView) => {
        setToView(whatToView)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getAnnouncement()
        getMyGroups()
    }, [])

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
            // PaperProps={{
            //     component: 'form',
            //     onSubmit: (event) => {
            //         event.preventDefault();
            //         const formData = new FormData(event.currentTarget);
            //         const formJson = Object.fromEntries(formData.entries());
            //         const email = formJson.email;
            //         console.log(email);
            //         handleClose();
            //     },
            // }}
            >
                {/* <DialogTitle>Subscribe</DialogTitle> */}
                <DialogContent sx={{ p: 5 }}>
                    {toView === 'images' ?
                        <>
                            <Typography className='fw-bold my-2 mt-4'>Images</Typography>
                            {announcement.images?.map(image => (
                                <img src={image.url} style={{ m: 3, width: 500 }} />
                            ))}</> :
                        <>{announcement.attachments?.length > 0 ?
                            <>
                                <Typography className='fw-bold my-2 mt-4'>Attachments</Typography>
                                <Box className='d-flex flex-wrap gap-3'>
                                    {announcement.attachments?.map(attachment => {
                                        const fileName = attachment.original_name;
                                        const parts = fileName.split('.');
                                        const fileExtension = parts[parts.length - 1];
                                        return (
                                            <>
                                                <Paper component={'a'} href={attachment.url} target='_blank' className='d-flex gap-1' sx={{ width: 'fit-content', p: 1, backgroundColor: '#EEEDEB', cursor: 'pointer' }}>
                                                    <div style={{ width: 25 }}>
                                                        <FileIcon extension={fileExtension} {...defaultStyles[fileExtension]} />
                                                    </div>
                                                    <span className='text-decoration-underline mt-1'>{attachment.original_name}</span>
                                                </Paper>
                                            </>
                                        )
                                    })}
                                </Box>
                            </> : "Nothing to show"
                        }</>
                    }


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Back</Button>
                </DialogActions>
            </Dialog>
            <Block loading={loading} />
            <MetaData pageTitle="Announcements" />
            <div style={{ display: 'flex', minHeight: '100vh' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <MDBContainer fluid style={{ maxWidth: 1120 }} className='mt-4'>
                        <form onSubmit={formik.handleSubmit}>
                            <MDBRow>
                                <MDBCol sm='12' md='6'>
                                    <Box sx={{ boxShadow: 5, p: 2 }}>
                                        <Typography variant='h6' mb={2}>Edit Announcement</Typography>

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
                                        <Box className='d-flex justify-content-between'>
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
                                            <IconButton onClick={() => handleClickOpen('images')}>
                                                <VisibilityIcon fontSize='medium' />
                                            </IconButton>
                                        </Box>
                                        <ErrorMessage formik={formik} name='images' />
                                        <Box className='d-flex justify-content-between'>
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
                                            <IconButton onClick={() => handleClickOpen('files')}>
                                                <VisibilityIcon fontSize='medium' />
                                            </IconButton>
                                        </Box>
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
                                            getOptionLabel={(option) => (option && typeof option.groupName === 'string') ? option.groupName : ''}
                                            isOptionEqualToValue={(option, value) => option._id === value._id}
                                            name='groupViewers'
                                            value={formik.values.groupViewers} // Ensure value is always defined
                                            onChange={(event, newValue) => {
                                                formik.setFieldTouched('groupViewers', true);
                                                if (!newValue) {
                                                    formik.setFieldValue('groupViewers', '');
                                                    return;
                                                }
                                                formik.setFieldValue('groupViewers', newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} size='small' fullWidth label="Select Group" />}
                                        />

                                        <ErrorMessage formik={formik} name='groupViewers' />
                                        <Typography variant='subtitle' sx={{ mb: 2 }}>Announce to</Typography>
                                        <FormGroup sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <FormControlLabel checked={formik.values.canViewBy.includes('parent')} onChange={handleViewers} name='canViewBy' value={'parent'} control={<Checkbox />} label="Parent" />
                                            <FormControlLabel checked={formik.values.canViewBy.includes('teacher')} onChange={handleViewers} name='canViewBy' value={'teacher'} control={<Checkbox />} label="Teacher" />
                                            <FormControlLabel checked={formik.values.canViewBy.includes('student')} onChange={handleViewers} name='canViewBy' value={'student'} control={<Checkbox checked={formik.values.canViewBy.includes('student')} />} label="Student" />
                                        </FormGroup>
                                        <ErrorMessage formik={formik} name='canViewBy' />
                                    </Box>
                                </MDBCol>
                            </MDBRow>
                        </form>
                    </MDBContainer>

                </main >

            </div>
        </>
    )
}

const fileMessage = (field, formik) => {
    if (formik.errors[field]) {
        return formik.values[field] ? `${formik.values[field].length} file${formik.values[field].length > 1 ? 's' : ''}  uploaded` : `Upload one or more ${field}`
    }
    return formik.values[field] ? `${formik.values[field].length} ${formik.values[field].length > 1 ? field : field.slice(0, -1)}  uploaded` : `Upload one or more ${field}`
}

export default EditAnnouncement