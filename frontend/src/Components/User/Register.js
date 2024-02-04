import React from 'react';
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

function Register() {

    const navigate = useNavigate();

    return (
        <>
            <MetaData pageTitle={'Register'}></MetaData>
            <MDBContainer className='p-4 mt-5'>

                <MDBRow>

                    <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                        <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                            Emergency Ba? <br />
                            <span className="text-primary">Bahala ka diyan haha</span>
                        </h1>

                        <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                            quibusdam tempora at cupiditate quis eum maiores libero
                            veritatis? Dicta facilis sint aliquid ipsum atque?
                        </p>

                    </MDBCol>

                    <MDBCol md='6'>

                        <MDBCard className='my-5'>
                            <MDBCardBody className='p-5'>

                                <MDBRow>
                                    <MDBCol col='6' md={6}>
                                        <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text' />
                                    </MDBCol>

                                    <MDBCol col='6' md={6}>
                                        <MDBInput wrapperClass='mb-4' label='Last name' id='form1' type='text' />
                                    </MDBCol>
                                </MDBRow>

                                <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' />
                                <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' />

                                {/* <div className='d-flex justify-content-center mb-4'>
                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                            </div> */}

                                <MDBBtn className='w-100 mb-4' size='md'>sign up</MDBBtn>

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

                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>

                </MDBRow>

            </MDBContainer>
        </>
    );
}

export default Register;