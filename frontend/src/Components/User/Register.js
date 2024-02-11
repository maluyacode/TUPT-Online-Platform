import React, { useState } from 'react';
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

import RegisterSchema from '../ValidationSchema/RegisterSchema'
import { useFormik } from 'formik'
import ErrorMessage from '../Layout/ErrorMessage';
import registerAPI from '../../api/registerAPI';
import Block from '../Layout/Loaders/Block';
import ToastEmmiter from '../Layout/ToastEmmiter';

const role = [
    { value: 'student', label: 'Student', color: '#FF8B00' },
    { value: 'parent', label: 'Parent', color: '#FF8B00' },
    { value: 'teacher', label: 'Teacher', color: '#FF8B00' }
]

const disabledBackground = { pointerEvents: 'none', opacity: 0.5 }

function Register() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            contact_number: '',
            role: '',
            password: ''
        },
        validateOnChange: false,
        validationSchema: RegisterSchema,
        validateOnMount: true,
        onSubmit: async (values) => {
            setLoading(true)
            const response = await registerAPI(values)
            if (response) {
                ToastEmmiter.info('Please verify your email and contact number', 'top-center')
                navigate('/verification');
            } else {
                ToastEmmiter.error('Error occured, please try again later', 'top-center')
            }
        },
    });



    return (
        <>
            <Block loading={loading} />
            <MetaData pageTitle={'Register'}></MetaData>

            <MDBContainer className='p-4 mt-2' style={loading ? disabledBackground : {}}>

                <MDBRow>

                    <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                        <h1 className="my-5 mb-2 display-3 fw-bold ls-tight px-3">
                            Welcome to <span className="text-danger">TUPT</span><br />
                            <span className="text-primary">Online Platform</span>
                        </h1>

                        <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                            The TUPT Online Platform incorporates various features designed to enhance communication and collaboration among parents, students, and teachers. Firstly, it gauges students' openness about their academic performance, aiding parents in understanding their children better. The platform also assesses the ease of teacher-student-parent communication, ensuring efficient and effective information exchange. Security measures are implemented to safeguard user credentials, fostering a secure environment for confidential conversations. Additionally, there are short tutorials to assist parents unfamiliar with navigating the platform. The announcement tab keeps parents informed about school events, while a collaborative forum addresses inquiries. Real-time notifications alert users to new posts or messages, promoting timely and responsive interactions within the educational community.
                        </p>

                    </MDBCol>

                    <MDBCol md='6'>

                        <MDBCard className='my-5'>
                            <MDBCardBody className='p-5'>
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

                                    <MDBInput label='Contact No. (e.g 09863568721)' type='tel'
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

                                    <Select className="basic-single" classNamePrefix="sad" placeholder="Role" label="select" isClearable={true}
                                        name="role"
                                        value={role.find(option => option.value === formik.values.role)}
                                        onChange={(selected) => {
                                            formik.setFieldValue('role', selected ? selected.value : null);
                                        }}
                                        onBlur={() => {
                                            formik.setFieldTouched('role', true);
                                        }}
                                        options={role}
                                        styles={{
                                            control: (provided, state) => ({
                                                ...provided,
                                                textAlign: 'left',
                                            }),
                                        }}
                                    />
                                    <ErrorMessage formik={formik} name='role' />

                                    {/* <div className='d-flex justify-content-center mb-4'>
                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                            </div> */}

                                    <MDBBtn className='w-100 mb-4' size='md' type='submit'>sign up</MDBBtn>

                                    <div className="text-center">

                                        <p>Already have an account?</p>
                                        <MDBBtn onClick={() => navigate('/login')} className='mb-4 bg-info' size='md'>sign in</MDBBtn>
                                        {/* <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                    <MDBIcon fab icon='facebook-f' size="sm" />
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='twitter' size="sm" />
                                </MDBBtn>
                                
                                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='google' size="sm" />
                                </MDBBtn>
                                
                                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                    <MDBIcon fab icon='github' size="sm" />
                                </MDBBtn> */}

                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>

                </MDBRow>

            </MDBContainer>
        </>
    );
}

export default Register;