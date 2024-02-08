import React from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
}
    from 'mdb-react-ui-kit';

import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../Layout/MetaData';

function Login() {

    const navigate = useNavigate();

    return (
        <>
            <MetaData pageTitle={'Login'}></MetaData>
            <MDBContainer className="my-5 gradient-form">

                <MDBRow className='shadow-5 '>

                    <MDBCol col='6' className="mb-5" md={6}>
                        <div className="d-flex flex-column mx-auto" style={{ maxWidth: '500px' }}>

                            <div className="text-center">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                    style={{ width: '185px' }} alt="logo" />
                                <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                            </div>

                            <p>Please login to your account</p>


                            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' />
                            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' />


                            <div className="text-center pt-1 mb-5 pb-1">
                                <MDBBtn className="mb-4 w-100 ">Sign in</MDBBtn>
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

                        </div>

                    </MDBCol>

                    <MDBCol col='6' className="mb-5" md={6}>
                        <div className="d-flex flex-column justify-content-center h-100 mb-4">

                            <div className="px-3 py-4 p-md-5 mx-md-4">
                                <h4 class="mb-4">We are more than just a company</h4>
                                <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>

                        </div>

                    </MDBCol>

                </MDBRow>

            </MDBContainer>
        </>
    );
}

export default Login;