import React, { useEffect, useState } from 'react'
import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit'
import { Divider, FormControl, InputLabel, MenuItem, Paper, Select as MUISelect, TextField, Typography, Autocomplete, Box } from '@mui/material'
import { useFormik } from 'formik'

import Block from '../../Layout/Loaders/Block'
import SideNav from '../../Layout/SideNav'
import TopBar from '../../Layout/TopBar'
import RegisterSchema from '../../ValidationSchema/RegisterSchema'
import ErrorMessage from '../../Layout/ErrorMessage'
import ToastEmmiter from '../../Layout/ToastEmmiter'
import Select from 'react-select';

import registerAPI from '../../../api/registerAPI'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


import courses from '../../../data/courses.json'
import departments from '../../../data/departments.json'
import { profileHead } from '../../../utils/avatar'

const CreateUser = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [students, setStudents] = useState([]);

    const getStudents = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/user/get-users-free-access?role=student`, {
                withCredentials: true
            });

            setStudents(data.users)

        } catch (err) {
            ToastEmmiter.error('Cannot fetch required details, please try again later');
            console.log(err);
        }
    }

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
            avatar: '',
            course: '',
            department: '',
            iCareFor: '',
        },
        validateOnChange: false,
        validationSchema: RegisterSchema,
        validateOnBlur: true,
        onSubmit: async (values) => {
            // setLoading(true)

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

            if (values.role === 'student') {
                formData.append('course', values.course)
            }

            if (values.role === 'teacher') {
                formData.append('department', values.department)
            }

            if (values.role === 'parent') {
                formData.append('iCareFor', JSON.stringify(values.iCareFor))
            }

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

    useEffect(() => {
        getStudents();
    }, [])

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
                                            <TextField placeholder='First name' type='text'
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
                                            <TextField placeholder='Last name' type='text'
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

                                    <FormControl fullWidth size='small' required>
                                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                        <MUISelect
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
                                        </MUISelect>
                                    </FormControl>
                                    <ErrorMessage formik={formik} name='role' />

                                    {formik.values.role === '' ? "" : ""}

                                    {formik.values.role === 'student' ? <>
                                        <Select className="basic-single mb-4" classNamePrefix="sad" placeholder="Course" label="select" isClearable={true}
                                            name="course"
                                            value={courses.find(option => option.value === formik.values.course)}
                                            onChange={(selected) => {
                                                formik.setFieldValue('course', selected ? selected.value : null);
                                            }}
                                            onBlur={() => {
                                                formik.setFieldTouched('course', true);
                                            }}
                                            options={courses}
                                            styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    textAlign: 'left',
                                                }),
                                            }}
                                        />
                                    </> : ""}

                                    {formik.values.role === 'teacher' ? <>
                                        <Select className="basic-single mb-4" classNamePrefix="sad" placeholder="Department" label="select" isClearable={true}
                                            name="department"
                                            value={departments.find(option => option.value === formik.values.department)}
                                            onChange={(selected) => {
                                                formik.setFieldValue('department', selected ? selected.value : null);
                                            }}
                                            onBlur={() => {
                                                formik.setFieldTouched('department', true);
                                            }}
                                            options={departments}
                                            styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    textAlign: 'left',
                                                }),
                                            }}
                                        />
                                    </> : ""}

                                    {formik.values.role === 'parent' ? <>
                                        <Autocomplete
                                            className='mb-4'
                                            freeSolo
                                            options={students}
                                            multiple
                                            fullWidth
                                            onChange={(e, value) => {

                                                formik.setFieldValue('iCareFor', value ?
                                                    value.map(user => user._id)
                                                    : [])

                                            }}
                                            renderInput={(params) =>
                                                <TextField fullWidth {...params} label="Select your TUPT Student" size='small'
                                                    name='iCareFor'
                                                    value={formik.values.iCareFor}
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                />}
                                            getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
                                            renderOption={(props, value) => {
                                                return (
                                                    <Box {...props} display="flex" gap={2} alignItems="center" key={value._id}
                                                        sx={{
                                                            padding: '10px',
                                                            borderBottom: '1px solid #ccc',
                                                            '&:hover': {
                                                                backgroundColor: '#f5f5f5',
                                                            },
                                                            cursor: 'pointer'
                                                        }}
                                                        value={value.id}
                                                    >
                                                        {profileHead(value)}
                                                        <div>
                                                            <Typography variant='subtitle2' sx={{ color: 'black', textAlign: 'left' }}>
                                                                {value.firstname} {value.lastname}
                                                            </Typography>
                                                            <Typography variant='body2' sx={{ color: 'black', textAlign: 'left', fontSize: '10px' }}>
                                                                {value.email}
                                                            </Typography>
                                                        </div>
                                                    </Box>
                                                )
                                            }}
                                        />
                                    </> : ""}

                                    <TextField placeholder='Phone' type='tel'
                                        required
                                        fullWidth
                                        size='small'
                                        name='contact_number'
                                        value={formik.values.contact_number}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <ErrorMessage formik={formik} name='contact_number' />

                                    <TextField placeholder='Email' type='email'
                                        required
                                        fullWidth
                                        size='small'
                                        name='email'
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <ErrorMessage formik={formik} name='email' />

                                    <TextField placeholder='Password' type='password'
                                        required
                                        fullWidth
                                        size='small'
                                        name='password'
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <ErrorMessage formik={formik} name='password' />

                                    <MDBBtn onClick={formik.handleSubmit} className='w-100' size='md'>Create User</MDBBtn>
                                </Paper>
                            </MDBCol>
                            <MDBCol sm={6}>
                                <Paper className='p-3 py-5 px-4'>

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