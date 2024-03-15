import React, { useEffect, useRef, useState } from 'react'
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import { Badge, Box, Button, Divider, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import CreatableSelect from 'react-select/creatable';

import SearchIcon from '@mui/icons-material/Search';
import ForumIcon from '@mui/icons-material/Forum';

import MetaData from '../Layout/MetaData'
import Block from '../Layout/Loaders/Block'
import SideNav from '../Layout/SideNav';
import TopBar from '../Layout/TopBar';
import { useFormik } from 'formik';
import CollabSchema from '../ValidationSchema/CollabSchema';

import categories from '../../data/categories.json'
import { createPost } from '../../api/collabsApi';
import { fetchAllPost } from '../../api/collabsApi';
import ToastEmmiter from '../Layout/ToastEmmiter';
import TopicLists from './TopicLists';
import ViewTopic from './ViewTopic';


const Collab = () => {

    const [success, setSuccess] = useState(false)

    const [loading, setLoading] = useState(false);
    const [imgPreview, setImgPreview] = useState('https://cdn-icons-png.flaticon.com/512/4147/4147103.png')
    const fileInputRef = useRef();
    const [isDisabled, setIsDisabled] = useState(true);
    const [keyword, setKeyWord] = useState();
    const [fetchStatus, setFetchStatus] = useState('all');

    const [openRight, setOpenRight] = useState(false); // view post in right side
    const [selectedPost, setSelectedPost] = useState('');

    const [status, setStatus] = useState('searching') // searching or posting

    const [topics, setTopics] = useState([]);
    const [filteredTopics, setFilteredTopics] = useState();

    const getAllTopics = async () => {
        setLoading(true)
        const { data } = await fetchAllPost(fetchStatus);
        if (data.success) {
            setLoading(false)
            setTopics(data.topics)
            setFilteredTopics(data.topics)
        } else {
            ToastEmmiter.warning('System error, please try again later', 'top-center');
            setLoading(false)
        }
    }

    const formik = useFormik({
        initialValues: {
            heading: '',
            body: '',
            images: '',
            attachments: [],
            category: [],
        },
        validateOnChange: false,
        validationSchema: CollabSchema,
        validateOnMount: true,
        onSubmit: async (values) => {
            setLoading(true)
            const { data } = await createPost(values);
            if (data.success) {
                ToastEmmiter.success(data.message, 'top-right')
                setLoading(false)
                setStatus('searching')
                setSuccess(true)
                formik.setValues({
                    heading: '',
                    body: '',
                    images: '',
                    attachments: [],
                    category: [],
                })
                setSuccess(false)

                getAllTopics()
            } else {
                setSuccess(false)
                setLoading(false)
            }
        },
    });

    const fileOnChange = e => {
        const files = e.target.files;
        let attachments = [];
        let images = [];

        for (let i = 0; i < files.length; i++) {
            if (files[i].type && files[i].type.includes('image')) {
                images.push(files[i]);
            } else {
                attachments.push(files[i]);
            }
        }

        formik.setFieldValue('images', images);
        formik.setFieldValue('attachments', attachments);

    }

    useEffect(() => {
        if (Object.keys(formik.errors).length === 0) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [formik.values, formik.errors])

    useEffect(() => {
        getAllTopics()
    }, [`${success}`, fetchStatus])

    useEffect(() => {
        const regex = new RegExp(keyword, 'i');
        const filteredTopics = topics.filter(topic => regex.test(topic.heading)
            // || regex.test(user.lastname)
        );
        setFilteredTopics(filteredTopics);
    }, [keyword])

    const viewTopic = (id) => {
        setSelectedPost(id)
        setOpenRight(true);
    }

    return (
        <>
            <MetaData pageTitle="Collab" />
            <Block loading={loading} />
            <div style={{ display: 'flex' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <MDBContainer fluid
                    // style={{ maxWidth: '1500px', }}
                    >
                        <MDBRow className='pt-3 d-flex flex-column flex-md-row-reverse justify-content-center'>

                            {openRight ?
                                <MDBCol md={6} >
                                    <ViewTopic setOpenRight={setOpenRight} selectedPost={selectedPost} setSuccess={setSuccess} getAllTopics={getAllTopics} />
                                </MDBCol>
                                : ""}

                            <MDBCol md={openRight ? 6 : 10}>

                                {status === 'searching' ?
                                    <Box className='d-flex gap-3'>

                                        <Button className='rounded-pill' size='small' variant={fetchStatus === 'all' ? 'contained' : 'outlined'} onClick={() => {
                                            setFetchStatus('all')
                                        }}>All</Button>
                                        <Button className='rounded-pill' size='small' variant={fetchStatus === 'mine' ? 'contained' : 'outlined'} onClick={() => {
                                            setFetchStatus('mine')
                                        }}>Mine</Button>

                                        <TextField
                                            onChange={e => setKeyWord(e.target.value)}
                                            fullWidth
                                            size='small'
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <Button className='rounded-pill' onClick={() => setStatus('posting')} startIcon={<ForumIcon />} variant='contained' size='small'>Post</Button>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />

                                    </Box>
                                    : ""}

                                {status === 'posting' ?
                                    <Paper className='d-flex flex-column gap-3 p-3'>
                                        <TextField
                                            name='heading'
                                            value={formik.values.heading}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            fullWidth
                                            size='small'
                                            variant='outlined'
                                            placeholder='Heading'
                                        />

                                        <CreatableSelect name='category' placeholder='Category' isMulti options={categories}
                                            value={categories.find(option => option.value === formik.values.course)}
                                            onChange={(selected) => {
                                                formik.setFieldValue('category', selected);
                                            }}
                                        />

                                        <Box className='d-flex gap-4'>

                                            <TextField
                                                name='body'
                                                value={formik.values.body}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                fullWidth
                                                size='small'
                                                multiline
                                                rows={4}
                                                variant='outlined'
                                                placeholder='Body'
                                            />
                                            <Badge badgeContent={formik.values.attachments?.length + formik.values.images?.length} color='primary' anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}>
                                                <Paper onClick={() => fileInputRef.current.click()} style={{ cursor: 'pointer' }} className='ps-2 d-flex justify-content-center align-content-center'>
                                                    <img src={imgPreview} width={100} />
                                                </Paper>
                                            </Badge>
                                            <input multiple name='images' ref={fileInputRef} type='file' style={{ display: 'none' }}
                                                onChange={fileOnChange}
                                            />

                                        </Box>

                                        <Divider sx={{ borderBottom: 2, my: 1 }} />

                                        <Box className='d-flex justify-content-end gap-3'>
                                            <Button onClick={() => setStatus('searching')} className='rounded-pill' variant='contained' size='medium'>Cancel</Button>
                                            <Button onClick={formik.handleSubmit} disabled={isDisabled} className='rounded-pill' startIcon={<ForumIcon />} variant='contained' size='medium'>Post</Button>
                                        </Box>
                                    </Paper>
                                    : ""}
                                {topics.length <= 0 && (
                                    <Box className='p-5'>
                                        <Typography fontSize={20} fontStyle={'oblique'} textAlign={'center'}>Nothing to show</Typography>
                                    </Box>
                                )}
                                <TopicLists
                                    topics={topics}
                                    filteredTopics={filteredTopics}
                                    key={`${success}asdasd`}
                                    keyword={keyword}
                                    viewTopic={viewTopic}
                                    success={success} />
                            </MDBCol>

                        </MDBRow>

                    </MDBContainer>

                </main >

            </div >
        </>
    )
}



export default Collab