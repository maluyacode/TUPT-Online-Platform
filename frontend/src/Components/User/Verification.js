import React, { useState, useEffect } from 'react';
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
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import VerificationSchema from '../ValidationSchema/VerificationSchema';
import ErrorMessage from '../Layout/ErrorMessage';
import ToastEmmiter from '../Layout/ToastEmmiter';
import MetaData from '../Layout/MetaData';

import verifyAPI from '../../api/verifyAPI'
import reSendCode from '../../api/reSendCode';

export default function Verification() {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            contactCode: '',
            emailCode: '',
        },
        validateOnChange: true,
        validationSchema: VerificationSchema,
        validateOnMount: true,
        // validateOnBlur: false,
        onSubmit: async (values) => {
            const { data: { success, message } } = await verifyAPI(values);
            if (success) {
                ToastEmmiter.success('Your account is verified', 'top-center');
                navigate('/');
            } else {
                ToastEmmiter.error(message, 'top-center');
            }
        },
    });

    const initialCountdown = parseInt(localStorage.getItem('countdown')) || 30;
    const [countdown, setCountdown] = useState(initialCountdown);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            setIsButtonDisabled(false); // Enable the button when countdown reaches 0
        }
    }, [countdown]);

    useEffect(() => {
        localStorage.setItem('countdown', countdown.toString());
    }, [countdown]);

    const handleClick = async () => {
        const { data: { success, message } } = await reSendCode();
        if (success) {
            ToastEmmiter.success(message);
        } else {
            ToastEmmiter.error(message);
        }
    };

    return (
        <>
            <MetaData pageTitle={'Verification'}></MetaData>
            <MDBContainer>
                <MDBCard className='mx-auto mt-5' style={{ maxWidth: '500px' }}>
                    <MDBCardBody>
                        <MDBCardTitle className='mb-4'>Verify you Email and Contact No</MDBCardTitle>

                        <form onSubmit={formik.handleSubmit}>

                            <MDBInput type='text' label='Email verification code'
                                name='emailCode'
                                value={formik.values.emailCode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <ErrorMessage formik={formik} name='emailCode' />

                            <MDBInput type='text' label='Contact No verification code'
                                name='contactCode'
                                value={formik.values.contactCode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <ErrorMessage formik={formik} name='contactCode' />

                            <MDBRow>

                                <MDBCol>
                                    <MDBBtn type='button' block onClick={handleClick} disabled={isButtonDisabled}>
                                        {isButtonDisabled ? `Resend code (${countdown})` : 'Resend Code'}
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