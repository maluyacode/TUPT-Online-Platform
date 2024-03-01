import React, { useState } from 'react'
import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit'
import { Divider, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'

import Block from '../../Layout/Loaders/Block'
import SideNav from '../../Layout/SideNav'
import TopBar from '../../Layout/TopBar'
import RegisterSchema from '../../ValidationSchema/RegisterSchema'
import ErrorMessage from '../../Layout/ErrorMessage'

import registerAPI from '../../../api/registerAPI'
import ToastEmmiter from '../../Layout/ToastEmmiter'
import { useNavigate } from 'react-router-dom'

const CreateUser = () => {

    delete RegisterSchema.fields.course
    delete RegisterSchema.fields.department
    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            contact_number: '',
            role: '',
            password: '',
            birthdate: '',
            facebookLink: '',
            instagramLink: '',
            houseNo: '',
            street: '',
            baranggay: '',
            city: '',
            avatar: ''
        },
        validateOnChange: false,
        validationSchema: RegisterSchema,
        validateOnBlur: true,
        onSubmit: async (values) => {
            setLoading(true)

            const formData = new FormData;
            formData.append('firstname', values.firstname)
            formData.append('lastname', values.lastname)
            formData.append('contact_number', values.contact_number)
            formData.append('email', values.email)
            formData.append('password', values.password)
            formData.append('role', values.role)
            formData.append('birthdate', new Date(values.birthdate))
            formData.append('facebookLink', values.facebookLink)
            formData.append('instagramLink', values.instagramLink)
            formData.append('houseNo', values.houseNo)
            formData.append('street', values.street)
            formData.append('baranggay', values.baranggay)
            formData.append('city', values.city)
            formData.append('whosCreating', 'admin')

            if (values.avatar) {
                formData.append('avatar', values.avatar);
            }

            const { data } = await registerAPI(formData);

            if (data.success) {
                setLoading(false)
                ToastEmmiter.success(data.message, 'top-center');
                navigate('/admin/user-management')
            } else {
                setLoading(false)
                ToastEmmiter.error('System error, try again later', 'top-right');
            }
        },
    });

    return (
        <>
            <Block loading={loading} />
            <div style={{ display: 'flex', minHeight: '100vh', height: 'fit-content' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <MDBContainer fluid className='mt-3'>
                        <Typography className='fs-5'>Create User</Typography>
                        <Divider className='mb-4' sx={{ borderBottom: 3 }} />
                        <MDBRow className='mt-3'>
                            <MDBCol sm={6}>
                                <Paper className='p-3 py-5 px-4'>
                                    <MDBRow>
                                        <MDBCol col='6' md={6}>
                                            <TextField label='First name' type='text'
                                                required
                                                fullWidth
                                                size='small'
                                                name='firstname'
                                                value={formik.values.firstname}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            <ErrorMessage formik={formik} name='firstname' />
                                        </MDBCol>

                                        <MDBCol col='6' md={6}>
                                            <TextField label='Last name' type='text'
                                                required
                                                fullWidth
                                                size='small'
                                                name='lastname'
                                                value={formik.values.lastname}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            <ErrorMessage formik={formik} name='lastname' />
                                        </MDBCol>

                                    </MDBRow>

                                    <TextField label='Phone' type='tel'
                                        required
                                        fullWidth
                                        size='small'
                                        name='contact_number'
                                        value={formik.values.contact_number}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <ErrorMessage formik={formik} name='contact_number' />

                                    <TextField label='Email' type='email'
                                        required
                                        fullWidth
                                        size='small'
                                        name='email'
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <ErrorMessage formik={formik} name='email' />

                                    <TextField label='Password' type='password'
                                        required
                                        fullWidth
                                        size='small'
                                        name='password'
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <ErrorMessage formik={formik} name='password' />

                                    <FormControl fullWidth size='small' required    >
                                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formik.values.role}
                                            label="Age"
                                            onChange={(e) => {
                                                formik.setFieldValue('role', e.target.value)
                                            }}
                                        >
                                            <MenuItem value={'student'}>Student</MenuItem>
                                            <MenuItem value={'parent'}>Parent</MenuItem>
                                            <MenuItem value={'teacher'}>Teacher</MenuItem>
                                            <MenuItem value={'admin'}>Admin</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <ErrorMessage formik={formik} name='role' />
                                    <TextField label='Birthdate' type='date' sx={{ mb: 2.5 }}
                                        fullWidth
                                        size='small'
                                        name='birthdate'
                                        value={formik.values.birthdate}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                    <MDBBtn onClick={formik.handleSubmit} className='w-100' size='md'>Create User</MDBBtn>
                                </Paper>
                            </MDBCol>
                            <MDBCol sm={6}>
                                <Paper className='p-3 py-5 px-4'>

                                    <TextField label='House No' type='text' sx={{ mb: 2.5 }}
                                        fullWidth
                                        size='small'
                                        name='houseNo'
                                        value={formik.values.houseNo}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />

                                    <TextField label='Street' type='text' sx={{ mb: 2.5 }}
                                        fullWidth
                                        size='small'
                                        name='street'
                                        value={formik.values.street}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />

                                    <TextField label='Baranggay' type='text' sx={{ mb: 2.5 }}
                                        fullWidth
                                        size='small'
                                        name='baranggay'
                                        value={formik.values.baranggay}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />

                                    <TextField label='City' type='text' sx={{ mb: 2.5 }}
                                        fullWidth
                                        size='small'
                                        name='city'
                                        value={formik.values.city}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />

                                    <TextField label='Facebook link' type='text' sx={{ mb: 2.5 }}
                                        fullWidth
                                        size='small'
                                        name='facebookLink'
                                        value={formik.values.facebookLink}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />

                                    <TextField label='Instagram link' type='text' sx={{ mb: 2.5 }}
                                        fullWidth
                                        size='small'
                                        name='instagramLink'
                                        value={formik.values.instagramLink}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />

                                    <TextField label='Avatar' type='file'
                                        fullWidth
                                        size='small'
                                        name='avatar'
                                        onChange={e => {
                                            formik.setFieldValue('avatar', e.target.files[0])
                                        }}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />

                                </Paper>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </main>
            </div >
        </>
    )
}

export default CreateUser