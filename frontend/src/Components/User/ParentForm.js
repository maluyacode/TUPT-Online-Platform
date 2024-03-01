import React, { useEffect, useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBIcon
}
    from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../Layout/MetaData';
import Select from 'react-select';

import RegisterSchema from '../ValidationSchema/ParentFormSchema'
import { useFormik } from 'formik'
import ErrorMessage from '../Layout/ErrorMessage';
import registerAPI from '../../api/registerAPI';
import Block from '../Layout/Loaders/Block';
import ToastEmmiter from '../Layout/ToastEmmiter';
import axios from 'axios';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { profileHead } from '../../utils/avatar';

const ParentForm = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);

    const formik = useFormik({
        initialValues: {
            firstname: '',
            student: '',
            lastname: '',
            email: '',
            contact_number: '',
            role: '',
            password: '',
        },
        validateOnChange: false,
        validationSchema: RegisterSchema,
        validateOnMount: true,
        onSubmit: async (values) => {
            setLoading(true)

            values.iCareFor = {
                user: values.student
            }

            const response = await registerAPI(values)
            if (response) {
                ToastEmmiter.info('Please verify your email and contact number', 'top-center')
                navigate('/verification');
            } else {
                ToastEmmiter.error('Error occured, please try again later', 'top-center')
            }
        },
    });

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

    useEffect(() => {
        getStudents();
    }, [])

    console.log(formik.errors)

    useEffect(() => {
        formik.setFieldValue('role', 'parent')
    }, [])

    return (
        <form onSubmit={formik.handleSubmit}>
            <MDBRow>
                <MDBCol col='6' md={6}>
                    <MDBInput label='First name' type='text'
                        name='firstname'
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <ErrorMessage formik={formik} name='firstname' />
                </MDBCol>

                <MDBCol col='6' md={6}>
                    <MDBInput label='Last name' type='text'
                        name='lastname'
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <ErrorMessage formik={formik} name='lastname' />
                </MDBCol>
            </MDBRow>

            <Autocomplete
                freeSolo
                options={students}
                multiple
                fullWidth
                onChange={(e, value) => {

                    formik.setFieldValue('student', value ?
                        value.map(user => user._id)
                        : [])

                }}
                renderInput={(params) =>
                    <TextField fullWidth {...params} label="Select your TUPT Student" size='small'
                        name='student'
                        value={formik.values.student}
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
            <ErrorMessage formik={formik} name='student' />

            <MDBInput label='Contact No. (e.g 09863568721)' id='phone'
                name='contact_number'
                value={formik.values.contact_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <ErrorMessage formik={formik} name='contact_number' />

            <MDBInput label='Email' type='email'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <ErrorMessage formik={formik} name='email' />

            <MDBInput label='Password' type='password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <ErrorMessage formik={formik} name='password' />


            <MDBBtn className='w-100 mb-4' size='md' type='submit'>sign up</MDBBtn>

            <div className="text-center">

                <p>Already have an account?</p>
                <MDBBtn onClick={() => navigate('/login')} className='mb-4 bg-info' size='md'>sign in</MDBBtn>

            </div>
        </form>
    )
}

export default ParentForm