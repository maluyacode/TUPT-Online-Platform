import React from 'react';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardTitle
} from 'mdb-react-ui-kit';

export default function Verification() {
    return (
        <>
            <MDBContainer>
                <MDBCard className='mx-auto mt-5' style={{ maxWidth: '500px' }}>
                    <MDBCardBody>
                        <MDBCardTitle className='mb-4'>Verify you Email and Contact No</MDBCardTitle>
                        <form>
                            <MDBInput className='mb-4' type='text' label='Email verification code' />
                            <MDBInput className='mb-4' type='text' label='Contact No verification code' />

                            <MDBRow>

                                <MDBCol>
                                    <MDBBtn type='submit' block>
                                        Resend Code
                                    </MDBBtn>
                                </MDBCol>

                                <MDBCol>
                                    <MDBBtn type='submit' block>
                                        Confirmed
                                    </MDBBtn>
                                </MDBCol>

                            </MDBRow>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer >
        </>
    );
}