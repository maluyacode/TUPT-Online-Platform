import React, { useEffect, useState } from 'react'
import { MDBCollapse, MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom';
import { getSingleUser } from '../../api/usersAPI';
import ToastEmmiter from '../Layout/ToastEmmiter';
import { getUser } from '../../utils/helper';
import { Facebook, Instagram, Phone } from '@mui/icons-material';
import { profileHead } from '../../utils/avatar';
import { Typography } from '@mui/material';

const ConnectedParents = ({ open, loading, setLoading }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState([]);


    const getProfile = async () => {
        setLoading(true)
        const { data } = await getSingleUser(getUser()._id);
        if (data.success) {

            console.log(data)
            setLoading(false)
            setUser(data.connectedParents)
        } else {
            setLoading(false)
            ToastEmmiter.error('System error, try again later', 'top-right');
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <MDBCollapse open={open} className='px-3'>
            <MDBContainer>
                <MDBRow className="justify-content-start">
                    {user?.length <= 0 ? <>
                        <Typography className='py-4 pb-5 text-center'>Nothing to show</Typography>
                    </> : ""}
                    {user?.map(parent => (
                        <MDBCol md="4" className="p-3">
                            <MDBCard style={{ borderRadius: '15px' }}>
                                <MDBCardBody className="p-4">
                                    <div className="d-flex text-black">
                                        <div className="flex-shrink-0">
                                            {/* <MDBCardImage
                                                style={{ width: '110px', borderRadius: '10px' }}
                                                src={parent.avatar.}
                                                alt='Generic placeholder image'
                                                fluid /> */}
                                            {profileHead(parent, 110, 110, 30, 10)}
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <MDBCardTitle>{parent.firstname} {parent.lastname}</MDBCardTitle>
                                            <MDBCardText>Verified</MDBCardText>
                                            <div className="d-flex pt-0">
                                                <MDBBtn outline className="me-1 flex-grow-1">Message</MDBBtn>
                                                <MDBBtn className="flex-grow-1 me-1">Remove</MDBBtn>
                                                {/* <MDBBtn className="flex-grow-1">Profile</MDBBtn> */}
                                            </div>
                                        </div>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ))}
                </MDBRow>
            </MDBContainer>

        </MDBCollapse>
    )
}

export default ConnectedParents