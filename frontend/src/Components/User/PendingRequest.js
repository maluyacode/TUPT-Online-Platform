import React, { useEffect, useState } from 'react'
import { MDBCollapse, MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom';
import { getSingleUser } from '../../api/usersAPI';
import ToastEmmiter from '../Layout/ToastEmmiter';
import { getUser } from '../../utils/helper';
import { Facebook, Instagram, Phone } from '@mui/icons-material';
import { profileHead } from '../../utils/avatar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Typography } from '@mui/material';

const PendingRequest = ({ open, loading, setLoading }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState([]);


    const getProfile = async () => {
        setLoading(true)
        const { data } = await getSingleUser(getUser()._id);
        if (data.success) {

            console.log(data)
            setLoading(false)
            setUser(data.pendingParents)
        } else {
            setLoading(false)
            ToastEmmiter.error('System error, try again later', 'top-right');
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    const accept = async (id) => {
        setLoading(true)
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/user/accept-as-parent/${id}`, {
                withCredentials: true
            })
            ToastEmmiter.success(data.message, 'top-center');
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.log(err);
            ToastEmmiter.error('System error, please try again later', 'top-center');
        }
    }

    const handleAccept = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                accept(id)
            }
        });

    }

    const reject = async (id) => {
        setLoading(true)
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/user/reject-as-parent/${id}`, {
                withCredentials: true
            })
            ToastEmmiter.success(data.message, 'top-center');
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.log(err);
            ToastEmmiter.error('System error, please try again later', 'top-center');
        }
    }

    const hanleReject = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this! This account will be possibly deleted if monitored by the admin that it doesn't connected on student account",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                reject(id)
            }
        });
    }


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
                                                <MDBBtn onClick={() => handleAccept(parent._id)} outline className="me-1 flex-grow-1">Accept</MDBBtn>
                                                <MDBBtn onClick={() => hanleReject(parent._id)} className="flex-grow-1  me-1">Reject</MDBBtn>
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

export default PendingRequest