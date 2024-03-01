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

import RegisterSchema from '../ValidationSchema/TeacherFormSchema'
import { useFormik } from 'formik'
import ErrorMessage from '../Layout/ErrorMessage';
import registerAPI from '../../api/registerAPI';
import Block from '../Layout/Loaders/Block';
import ToastEmmiter from '../Layout/ToastEmmiter';

import departments from '../../data/departments.json'

const TeacherForm = () => {

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
            department: ''
        },
        validateOnChange: false,
        validationSchema: RegisterSchema,
        validateOnMount: true,
        onSubmit: async (values) => {
            setLoading(true)
            const response = await registerAPI(values)
            if (response) {
                setLoading(false)
                ToastEmmiter.info('Please verify your email and contact number', 'top-center')
                navigate('/verification');
            } else {
                setLoading(false)
                ToastEmmiter.error('Error occured, please try again later', 'top-center')
            }
        },
    });

    useEffect(() => {
        formik.setFieldValue('role', 'teacher')
    }, [])

    return (
        <>
            <MetaData pageTitle='Teacher Registration' />
            <Block loading={loading} />
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

                <Select className="basic-single" classNamePrefix="sad" placeholder="Department" label="select" isClearable={true}
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
                <ErrorMessage formik={formik} name='department' />

                <MDBInput label='Contact No. (e.g 09863568721)' id='phone'
                    name='contact_number'
                    value={formik.values.contact_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <ErrorMessage formik={formik} name='contact_number' />

                <MDBInput label='TUP Mail' type='email'
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
        </>
    )
}

export default TeacherForm