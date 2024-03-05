import { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CreatableSelect from 'react-select/creatable';
import { useFormik } from 'formik';
import CollabSchema from '../ValidationSchema/CollabSchema';
import { Badge, Box, Divider, Paper, Typography } from '@mui/material';
import categories from '../../data/categories.json'
import React from 'react';
import Forum from '@mui/icons-material/Forum';
import Draggable from 'react-draggable';
import FileDisplay from '../Generic/FileDisplay';
import { updatePostApi } from '../../api/collabsApi';
import ToastEmmiter from '../Layout/ToastEmmiter';
import Block from '../Layout/Loaders/Block';

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}


const EditPost = ({ open, setOpen, topic, getTopic, getAllTopics }) => {

    const [loading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [imgPreview, setImgPreview] = useState('https://cdn-icons-png.flaticon.com/512/4147/4147103.png')
    const fileInputRef = useRef();

    const [imagesPreview, setImagesPreview] = useState([])
    const [attachmentsPreview, setAttachmentsPreview] = useState([])

    const formik = useFormik({
        initialValues: {
            heading: '',
            body: '',
            images: [],
            attachments: [],
            category: [],
        },
        validateOnChange: true,
        validationSchema: CollabSchema,
        validateOnMount: true,
        onSubmit: async (values) => {
            setOpen(false)
            setLoading(true)
            const { data } = await updatePostApi(topic._id, values);
            if (data.success) {
                ToastEmmiter.success(data.message, 'top-right')
                getTopic();
                setLoading(false)
                formik.setValues({
                    heading: '',
                    body: '',
                    images: '',
                    attachments: [],
                    category: [],
                })

                getAllTopics()
            } else {
                setOpen(false)
                ToastEmmiter.error('Please try again late', 'top-right')
                setLoading(false)
            }
        },
    });

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {

        formik.setValues({
            heading: '',
            body: '',
            images: [],
            attachments: [],
            category: [],
        })

        topic.category?.map((value) => {
            categories.push({
                label: value,
                value: value
            })
        })

        formik.setFieldValue('heading', topic.heading)
        formik.setFieldValue('body', topic.body)
        formik.setFieldValue('category', topic.category?.map((value) => {
            return {
                label: value,
                value: value
            }
        }));
        setImagesPreview(topic.images)
        setAttachmentsPreview(topic.attachments)

    }, [open])

    const fileOnChange = e => {
        const files = e.target.files;
        let attachments = [];
        let images = [];
        let attachmentsPreview = [];
        let imagesPreview = [];

        const encodeFileToBase64 = file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        };

        const processFiles = async () => {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const base64 = await encodeFileToBase64(file);
                if (file.type && file.type.includes('image')) {
                    images.push(file);
                    imagesPreview.push({
                        original_name: file.name,
                        url: base64
                    }); // Store the image Base64 directly
                } else {
                    attachments.push(file);
                    attachmentsPreview.push({
                        original_name: file.name,
                        url: base64
                    }); // Store the attachment Base64 directly
                }
            }
            formik.setFieldValue('images', images);
            formik.setFieldValue('attachments', attachments);
            // Set the state for previews
            setAttachmentsPreview([...attachmentsPreview]);
            setImagesPreview([...imagesPreview]);
        };

        processFiles();
    };

    useEffect(() => {
        if (Object.keys(formik.errors).length === 0) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [formik.values, formik.errors])

    useEffect(() => {
        if (Object.keys(formik.errors).length === 0) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [formik.values, formik.errors])


    return (
        <>
            <Block loading={loading} />
            <Dialog
                maxWidth='md'
                fullWidth
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
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
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">Update Topic</DialogTitle>
                <DialogContent className='d-flex flex-column gap-4 p-3'>
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
                        // defaultValue={formik.values?.category}
                        value={formik.values?.category}
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

                    <Box>

                        <Typography>
                            {formik.values.attachments?.length + formik.values.images?.length > 0 ?
                                "New Attachments" : "Previous Attachments"
                            }
                        </Typography>
                        <Box className='d-flex gap-3'>
                            {imagesPreview?.map((image, i) => (
                                <a key={i} href={image.url} target="_blank" rel="noopener noreferrer">
                                    <img src={image.url} height={150} />
                                </a>
                            ))}
                        </Box>
                        <Box className='d-flex gap-3 mt-3'>
                            {attachmentsPreview?.map((attachment, i) => (
                                <FileDisplay key={i} attachment={attachment} />
                            ))}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions className='pb-4'>
                    <Button onClick={() => setOpen(false)} className='rounded-pill' variant='contained' size='medium'>Cancel</Button>
                    <Button onClick={formik.handleSubmit} disabled={isDisabled} className='rounded-pill' startIcon={<Forum />} variant='contained' size='medium'>Update</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditPost