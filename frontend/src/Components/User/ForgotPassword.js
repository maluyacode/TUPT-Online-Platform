import { MDBInput } from 'mdb-react-ui-kit'
import React from 'react'
import MetaData from '../Layout/MetaData'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {

    const navigate = useNavigate();

    return (
        <>
            <MetaData pageTitle={'Forgot Passwod'}></MetaData>
            <div className='container'>
                <div className="card text-center mx-auto pt-5" style={{ maxWidth: '700px' }}>
                    <div className="card-header h5 text-white bg-primary">Password Reset</div>
                    <div className="card-body px-5">
                        <p className="card-text py-2">
                            Enter your email address and we'll send you an email with instructions to reset your password.
                        </p>
                        <div className="form-outline">
                            <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' />
                        </div>
                        <a href="#" className="btn btn-primary w-100">Reset password</a>
                        <div className="d-flex justify-content-between mt-4">
                            <a className="" href="" onClick={e => {
                                e.preventDefault();
                                navigate('/login')
                            }} >Login</a>
                            <a className="" href="" onClick={e => {
                                e.preventDefault();
                                navigate('/register')
                            }}>Register</a>
                        </div>
                    </div>
                </div >
            </div>
        </>
    )
}

export default ForgotPassword