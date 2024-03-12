import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBCardTitle
}
    from 'mdb-react-ui-kit';

import MetaData from '../Layout/MetaData';
import axios from 'axios';
import ToastEmmiter from '../Layout/ToastEmmiter';
import { useNavigate, useParams } from 'react-router-dom';
import Block from '../Layout/Loaders/Block';

function ChangePassword() {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { token } = useParams()

    const resetPassword = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {

            const formData = new FormData(e.target);

            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/user/reset-password/${token}`, formData, {
                withCredentials: true
            });

            if (data.success) {
                ToastEmmiter.success(data.message)
                setLoading(false)
                navigate('/login')
            }
            setLoading(false)

        } catch ({ response: { data } }) {
            setLoading(false)
            ToastEmmiter.error(data.message);
            console.log(data)
        }
    }

    return (
        <>
            <Block loading={loading} />
            <MetaData pageTitle={'Change Password'}></MetaData>
            <MDBContainer className='my-5'>
                <MDBCard className='mx-auto mt-5' style={{ maxWidth: '900px' }}>
                    <MDBRow className='g-0 d-flex align-items-center'>

                        <MDBCol md='4'>
                            <MDBCardImage src='https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg' alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
                        </MDBCol>

                        <MDBCol md='8'>

                            <MDBCardBody>
                                <form onSubmit={resetPassword}>

                                    <MDBCardTitle className='mb-5'>Change Password</MDBCardTitle>
                                    <MDBInput name='password' size='lg' wrapperClass='mb-4' label='New Password' id='form1' type='password' />
                                    <MDBInput name='confirmPassword' size='lg' wrapperClass='mb-4' label='Confirm Password' id='form2' type='password' />

                                    <MDBBtn type='submit' className="mb-4 w-100">Confirm</MDBBtn>
                                </form>

                            </MDBCardBody>

                        </MDBCol>

                    </MDBRow>

                </MDBCard>
            </MDBContainer>
        </>
    );
}

export default ChangePassword;