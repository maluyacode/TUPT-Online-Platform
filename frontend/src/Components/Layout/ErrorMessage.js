import React from 'react'

const ErrorMessage = ({ formik, name }) => {
    // console.log(formik.touched[name])
    return (
        <div className='d-flex justify-content-start' style={{ fontSize: '0.8rem' }}>
            <p className='form-text text-danger mx-1'>
                {formik.touched[name] ? formik.errors[name] : ""}
            </p>
        </div>
    )
}

export default ErrorMessage