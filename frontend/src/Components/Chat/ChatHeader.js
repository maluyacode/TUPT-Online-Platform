import React from 'react'
import { MDBBadge } from 'mdb-react-ui-kit'

const ChatHeader = ({ user }) => {
    return (
        <div className='d-flex align-items-center'>
            {/* <img
                src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
            /> */}
            <div className='d-flex flex-column align-items-center'>
                <p className='fw-bold mb-0 text-center'>{user?.firstname} {user?.lastname}</p>
                <MDBBadge pill className='text-capitalize ' light color={
                    user?.role === 'student' ? 'warning' :
                        user?.role === 'parent' ? 'primary' :
                            'success'
                } >
                    {user?.role}
                </MDBBadge>
            </div>
        </div>
    )
}

export default ChatHeader