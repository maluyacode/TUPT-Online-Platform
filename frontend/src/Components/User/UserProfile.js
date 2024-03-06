import React, { useEffect, useRef, useState } from 'react'
import { MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdb-react-ui-kit'

import TopBar from '../Layout/TopBar'
import SideNav from '../Layout/SideNav'
import MetaData from '../Layout/MetaData'
import { Avatar, Badge, Box, Button, Divider, IconButton, Paper, TextField, Typography } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SaveIcon from '@mui/icons-material/Save';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import EditProfileSchema from '../ValidationSchema/EditProfileSchema'
import { useFormik } from 'formik'
import ErrorMessage from '../Layout/ErrorMessage';
import { profileHead } from '../../utils/avatar'

import { getUser } from '../../utils/helper'
import { updateProfile } from '../../api/usersAPI'
import Block from '../Layout/Loaders/Block'
import ToastEmmiter from '../Layout/ToastEmmiter'
import ConnectedParents from './ConnectedParents'
import PendingRequest from './PendingRequest'

const specify = <span className='fst-italic fw-lighter' style={{ fontSize: 12 }}>Not specified</span>

const UserProfile = () => {
    const [loading, setLoading] = useState(false);

    const avatar = useRef(null)
    const [avatarPreview, setAvatarPreview] = useState('');
    const [isButtonDisable, setButtonDisable] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenPending, setOpenPending] = useState(false)

    const toggleOpen = () => {
        setIsOpen(!isOpen)
        setOpenPending(false)
    };
    const toggleOpenPending = () => {
        setOpenPending(!isOpenPending)
        setIsOpen(false)
    };

    const formik = useFormik({
        initialValues: {
            firstname: getUser().firstname,
            lastname: getUser().lastname,
            email: getUser().email,
            contact_number: getUser().contact_number,
            avatar: '',
            role: getUser().role,
            // joinedDate: '',
            birthdate: getUser().birthdate,
            facebookLink: getUser().facebookLink ? getUser().facebookLink : '',
            instagramLink: getUser().instagramLink ? getUser().instagramLink : '',
            houseNo: getUser().houseNo ? getUser().houseNo : '',
            street: getUser().street ? getUser().street : '',
            baranggay: getUser().baranggay ? getUser().baranggay : '',
            city: getUser().city ? getUser().city : '',
        },
        validateOnChange: false,
        validationSchema: EditProfileSchema,
        validateOnMount: true,
        onSubmit: async (values) => {
            setLoading(true);
            const { data } = await updateProfile(values, getUser()._id);
            console.log(data);
            if (data.success) {
                ToastEmmiter.success(data.message, 'top-right');
                setLoading(false);
                setButtonDisable(false)
            } else {
                ToastEmmiter.error('Error occured', 'top-right');
                setLoading(false);
                setButtonDisable(false)
            }
        },
    });

    const handleInputChange = () => {
        setButtonDisable(false);
    };

    const handleAvatar = e => {
        avatar.current.click();
    }

    const handleAvatarChange = (e) => {
        const files = Array.from(e.target.files)
        formik.setFieldValue('avatar', e.target.files);
        setAvatarPreview('');
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    handleInputChange()
                }
            }
            reader.readAsDataURL(file)
        })
    };

    const handleCancel = () => {
        window.location.reload()
    }

    const getFullAddress = () => {
        return `${formik.values.houseNo} ${formik.values.street} ${formik.values.baranggay} ${formik.values.city}`
    }

    return (
        <>
            <Block loading={loading} />
            <MetaData pageTitle="Profile" />
            <div style={{ display: 'flex' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <Box className='py-3 mt-2 d-flex position-sticky' sx={{ px: '7%', top: '0', boxShadow: 0, zIndex: 3, width: '100%', backgroundColor: 'rgb(255, 255, 255)' }}>
                        <Typography variant='h5' className='me-auto'>User Profile</Typography>
                        <Button onClick={handleCancel} variant='outlined' size='small' className='me-2' disabled={isButtonDisable}>Cancel</Button>
                        <Button onClick={formik.handleSubmit} variant='outlined' size='small' startIcon={<SaveIcon />} disabled={isButtonDisable}>Save</Button>
                    </Box>
                    <MDBContainer fluid className='pb-3 px-3' style={{ maxWidth: '1280px', height: 'fit-content' }}>

                        <MDBRow className='mb-2 mt-4'>
                            <MDBCol>
                                <Paper className='py-2 pb-4 px-0' sx={{ boxShadow: 1 }}>
                                    <Typography className='px-5 mb-2' variant='h6'>Basic Info</Typography>
                                    <Divider sx={{ borderBottom: 2 }} />
                                    <Box className='mt-5 mb-4 px-5 d-flex gap-4'>
                                        <Box className='pt-1'>
                                            {avatarPreview ?
                                                <Badge onClick={handleAvatar} badgeContent={
                                                    <IconButton size='small' sx={{ mt: -3, ml: -3 }}>
                                                        <AddPhotoAlternateIcon />
                                                    </IconButton>
                                                } anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}>
                                                    <Avatar sx={{ width: 75, height: 75, mt: -0.5 }} src={avatarPreview} />
                                                </Badge> :

                                                <Badge onClick={handleAvatar} badgeContent={
                                                    <IconButton size='small' sx={{ mt: -3, ml: -3 }}>
                                                        <AddPhotoAlternateIcon />
                                                    </IconButton>
                                                } anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}>
                                                    {profileHead(getUser(), '75px', '75px', 30)}
                                                </Badge>
                                            }
                                            <input accept='image/*' onChange={handleAvatarChange} ref={avatar} type='file' style={{ display: 'none' }} />
                                        </Box>
                                        <Box>
                                            <Typography className='fw-bold mb-2'>{getUser().firstname} {getUser().lastname}</Typography>
                                            <Typography className='text-dark-emphasis mb-3'>ID: {getUser()._id}</Typography>
                                            <Button size='small' variant='outlined' startIcon={<LockIcon />}>Change Password</Button>
                                        </Box>
                                    </Box>
                                    <MDBRow className='mx-5'>
                                        <MDBCol md={'6'}>
                                            <TextField size='small' variant='filled' label='First name' fullWidth
                                                onKeyDown={handleInputChange}
                                                name='firstname'
                                                value={formik.values.firstname}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            <ErrorMessage formik={formik} name={'firstname'} />
                                        </MDBCol>
                                        <MDBCol md={'6'}>
                                            <TextField size='small' variant='filled' label='Last name' fullWidth
                                                onKeyDown={handleInputChange}
                                                name='lastname'
                                                value={formik.values.lastname}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            <ErrorMessage formik={formik} name={'lastname'} />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow className='mx-5'>
                                        <MDBCol md={'4'} className='mb-3'>
                                            <TextField sx={{ textTransform: 'capitalize' }} size='small' variant='filled' label='Role' fullWidth
                                                value={formik.values.role.charAt(0).toUpperCase() + formik.values.role.slice(1)}

                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </MDBCol>
                                        <MDBCol md={'4'} className='mb-3'>
                                            <TextField size='small' variant='filled' label='Joined Date' fullWidth
                                                value={new Date(getUser().createdAt).toISOString().split('T')[0]}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </MDBCol>
                                        <MDBCol md={'4'} className='mb-3'>
                                            <TextField onKeyDown={handleInputChange}
                                                type='date'
                                                size='small'
                                                variant='filled'
                                                label='Birth Date'
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                name='birthdate'
                                                value={formik.values.birthdate ? new Date(formik.values.birthdate).toISOString().split('T')[0] : ''}
                                                onChange={(e) => {
                                                    if (!e.target.value) {

                                                    }
                                                    formik.setFieldValue('birthdate', e.target.value)
                                                    handleInputChange()
                                                }}
                                                onBlur={formik.handleBlur}
                                            />
                                            {!formik.values.birthdate ? specify : ""}
                                        </MDBCol>
                                    </MDBRow>
                                </Paper>
                            </MDBCol>
                        </MDBRow>
                        {getUser().role === 'student' && (
                            <MDBRow className='mb-2'>
                                <MDBCol>
                                    <Paper>
                                        <Button onClick={toggleOpen}>Connected Parents</Button>
                                        <Button onClick={toggleOpenPending}>Pending Request</Button>
                                        <ConnectedParents open={isOpen} loading={loading} setLoading={setLoading} />
                                        <PendingRequest open={isOpenPending} loading={loading} setLoading={setLoading} />
                                    </Paper>
                                </MDBCol>
                            </MDBRow>
                        )}
                        <MDBRow>
                            <MDBCol md={'6'} className='mb-4'>
                                <Paper className='py-2 pb-3 px-0' sx={{ boxShadow: 1 }}>
                                    <Typography className='px-5 mb-2' variant='h6'>Contacts</Typography>
                                    <Divider sx={{ borderBottom: 2 }} />
                                    <Box className='mt-5 mb-4 px-5 d-flex gap-4'>
                                        <Box>
                                            <MDBIcon fas icon="phone-square-alt" size='4x' />
                                        </Box>
                                        <Box>
                                            <Typography className='fw-bold mb-2'>{getUser().contact_number}</Typography>
                                            <Typography className='text-dark-emphasis mb-3'>
                                                {getUser().email}
                                                <IconButton size='small'>
                                                    <ContentCopyIcon fontSize='small' />
                                                </IconButton>
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <MDBRow className='mx-4'>
                                        <MDBCol className='d-flex flex-column'>
                                            <Box>
                                                <TextField onKeyDown={handleInputChange} size='small' variant='filled' label='Phone' fullWidth
                                                    name='contact_number'
                                                    value={formik.values.contact_number}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                <ErrorMessage formik={formik} name={'contact_number'} />
                                            </Box>
                                            <Box>
                                                <TextField onKeyDown={handleInputChange} size='small' variant='filled' label='Email' fullWidth type='email'
                                                    name='email'
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                <ErrorMessage formik={formik} name={'email'} />
                                            </Box>
                                            <Box className='mb-3'>
                                                <TextField onKeyDown={handleInputChange} size='small' variant='filled' label='Facebook link' fullWidth
                                                    value={formik.values.facebookLink}
                                                    name='facebookLink'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {!formik.values.facebookLink ? specify : ""}
                                            </Box>
                                            <Box className='mb-3'>
                                                <TextField onKeyDown={handleInputChange} size='small' variant='filled' label='Instagram link' fullWidth
                                                    value={formik.values.instagramLink}
                                                    name='instagramLink'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {!formik.values.instagramLink ? specify : ""}
                                            </Box>
                                        </MDBCol>
                                    </MDBRow>
                                </Paper>
                            </MDBCol>
                            <MDBCol md={'6'}>
                                <Paper className='py-2 pb-3 px-0' sx={{ boxShadow: 1 }}>
                                    <Typography className='px-5 mb-2' variant='h6'>Address</Typography>
                                    <Divider sx={{ borderBottom: 2 }} />
                                    <Box className='mt-5 px-5 d-flex gap-4' sx={{ mb: 6.6 }}>
                                        <Box>
                                            <MDBIcon fas icon="map-marked-alt" size='3x' />
                                        </Box>
                                        <Box>
                                            <Typography className='fw-bold mb-2'>{getFullAddress()}</Typography>
                                        </Box>
                                    </Box>
                                    <MDBRow className='mx-4'>
                                        <MDBCol className='d-flex flex-column gap-3'>
                                            <Box>
                                                <TextField onKeyDown={handleInputChange} size='small' variant='filled' label='House No / BLK / LOT' fullWidth
                                                    value={formik.values.houseNo}
                                                    name='houseNo'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {!formik.values.houseNo ? specify : ""}
                                            </Box>
                                            <Box>
                                                <TextField onKeyDown={handleInputChange} size='small' variant='filled' label='Street / Sitio' fullWidth
                                                    value={formik.values.street}
                                                    name='street'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {!formik.values.street ? specify : ""}
                                            </Box>
                                            <Box>
                                                <TextField onKeyDown={handleInputChange} size='small' variant='filled' label='Baranggay' fullWidth
                                                    value={formik.values.baranggay}
                                                    name='baranggay'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {!formik.values.baranggay ? specify : ""}
                                            </Box>
                                            <Box>
                                                <TextField onKeyDown={handleInputChange} size='small' variant='filled' label='City' fullWidth
                                                    value={formik.values.city}
                                                    name='city'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {!formik.values.city ? specify : ""}
                                            </Box>
                                        </MDBCol>
                                    </MDBRow>
                                </Paper>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>

                </main >

            </div >
        </>
    )
}


export default UserProfile