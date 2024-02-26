import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
}
    from 'mdb-react-ui-kit';
import { useFormik } from 'formik'

import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../Layout/MetaData';
import ErrorMessage from '../Layout/ErrorMessage';
import Block from '../Layout/Loaders/Block';
import ToastEmmiter from '../Layout/ToastEmmiter';

import LoginSchema from '../ValidationSchema/LoginSchema'
import loginAPI from '../../api/loginAPI';
import Gallery from '../Static/Gallery';

function Login() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validateOnChange: false,
        validationSchema: LoginSchema,
        validateOnMount: true,
        onSubmit: async (values) => {
            console.log(values)
            setLoading(true)
            const { data: { success, message, user } } = await loginAPI(values);

            if (success) {
                setLoading(false)
                if (user.role === 'admin') {
                    navigate('/admin/dashboard');
                    ToastEmmiter.success('Welcome back admin!', 'top-right');
                } else {
                    ToastEmmiter.success('You are login', 'top-center');
                    navigate('/');
                }
            } else {
                setLoading(false)
                ToastEmmiter.error(message, 'top-center');
            }
        },
    });

    return (
        <>
            <Block loading={loading} />
            <MetaData pageTitle={'Login'}></MetaData>

            <MDBContainer className="my-5 gradient-form" style={loading ? { pointerEvents: 'none', opacity: 0.5 } : {}}>
                <MDBRow className='shadow-5'>

                    <MDBCol col='6' className="mb-0" md={6}>
                        <div className="d-flex flex-column mx-auto pt-5" style={{ maxWidth: '500px' }}>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="text-center">
                                    <img src="./tupt-logo.png"
                                        style={{ width: '100px' }} alt="logo" />
                                    <h4 className="mt-1 mb-5 pb-1">TUPT Online Commucation Platform</h4>
                                </div>

                                <p>Please login to your account</p>


                                <MDBInput label='Email address' type='email'
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

                                <div className="text-center pt-1 mb-5 pb-1">
                                    <MDBBtn className="mb-4 w-100 " type='submit'>Sign in</MDBBtn>
                                    <a className="text-muted" href="" onClick={(e) => {
                                        e.preventDefault()
                                        navigate('/forgot-password')
                                    }}>Forgot password?</a>
                                </div>

                                <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                    <p className="mb-0">Don't have an account?</p>
                                    <MDBBtn onClick={() => navigate('/register')} outline className='mx-2' color='info'>
                                        Sign Up
                                    </MDBBtn>
                                </div>
                            </form>
                        </div>

                    </MDBCol>

                    <MDBCol col='6' className="d-flex flex-column justify-content-center mx-auto" md={6}>
                        {/* <div className="d-flex flex-column justify-content-center h-100 mb-4">

                            <div className="px-3 py-4 p-md-5 mx-md-4">
                                <h4 class="mb-4">We are more than just a company</h4>
                                <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>

                        </div> */}
                        <Gallery />
                    </MDBCol>

                </MDBRow>

            </MDBContainer >
        </>
    );
}

export default Login;