import { MDBInput } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import MetaData from '../Layout/MetaData'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ToastEmmiter from '../Layout/ToastEmmiter'
import Block from '../Layout/Loaders/Block'

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const forgotPassword = async (e) => {

        e.preventDefault()
        setLoading(true)
        try {

            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/user/forgot-password`, { email: e.target.email.value }, {
                withCredentials: true
            });

            if (data.success) {
                ToastEmmiter.success(data.message)
                setLoading(false)
                navigate('/login')
            }

        } catch ({ response: { data } }) {
            setLoading(false)
            ToastEmmiter.error(data.message);
            console.log(data)
        }
    }

    return (
        <>
            <Block loading={loading} />
            <MetaData pageTitle={'Forgot Passwod'}></MetaData>
            <div className='container'>
                <div className="card text-center mx-auto pt-5" style={{ maxWidth: '700px' }}>
                    <div className="card-header h5 text-white bg-primary">Password Reset</div>
                    <div className="card-body px-5">
                        <p className="card-text py-2">
                            Enter your email address and we'll send you an email with instructions to reset your password.
                        </p>
                        <form onSubmit={forgotPassword}>
                            <div className="form-outline">
                                <MDBInput name='email' wrapperClass='mb-4' label='Email' id='form1' type='email' />
                            </div>
                            <button type='submit' className="btn btn-primary w-100">Reset password</button>
                        </form>
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