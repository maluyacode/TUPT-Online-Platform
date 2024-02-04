import React from 'react';
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

function ChangePassword() {
    return (
        <>
            <MetaData pageTitle={'Change Password'}></MetaData>
            <MDBContainer className='my-5'>
                <MDBCard className='mx-auto mt-5' style={{ maxWidth: '900px' }}>
                    <MDBRow className='g-0 d-flex align-items-center'>

                        <MDBCol md='4'>
                            <MDBCardImage src='https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg' alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
                        </MDBCol>

                        <MDBCol md='8'>

                            <MDBCardBody>
                                <MDBCardTitle className='mb-5'>Change Password</MDBCardTitle>
                                <MDBInput wrapperClass='mb-4' label='New Password' id='form1' type='password' />
                                <MDBInput wrapperClass='mb-4' label='Confirm Password' id='form2' type='password' />

                                <MDBBtn className="mb-4 w-100">Confirm</MDBBtn>

                            </MDBCardBody>

                        </MDBCol>

                    </MDBRow>

                </MDBCard>
            </MDBContainer>
        </>
    );
}

export default ChangePassword;