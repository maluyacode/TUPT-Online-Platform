import React, { useEffect, useState } from 'react'
import { Box, Divider, Typography } from '@mui/material';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCol, MDBRow } from 'mdb-react-ui-kit';

import {
    useNavigate
} from 'react-router-dom'

import ToastEmmiter from '../Layout/ToastEmmiter';

import { getAllTeachers } from '../../api/usersAPI';
import { profileHead } from '../../utils/avatar'

const TeachersList = () => {
    const navigate = useNavigate();

    const [teachers, setTeachers] = useState([]);

    const getTeachers = async () => {
        const { data } = await getAllTeachers();
        setTeachers(data.users);
    }

    useEffect(() => {
        getTeachers()
    }, [])

    return (
        <>
            <Typography variant='h5' sx={{ position: 'sticky', top: 0 }}>Teachers</Typography>
            <Divider sx={{ my: 1.5, borderBottom: 3, position: 'sticky', top: '48px' }} />
            <Box sx={{ boxShadow: 5, py: 2, px: 3, overflowY: 'scroll', maxHeight: '81vh' }}>
                {teachers.map((teacher, i) => (
                    <MDBCard key={`teacher${i}`} onClick={() => navigate('/categorize-announcements/sampleId')} style={{ cursor: 'pointer', }} className='mb-2'>
                        <MDBRow className='g-0'>
                            <MDBCol xs={'2'} sm='2' md='4' className='d-flex justify-content-center align-items-center'>
                                {/* <MDBCardImage style={{ height: 50, width: 50, objectFit: 'cover', borderRadius: '50%' }} src={teacher.image} fluid /> */}
                                {profileHead(teacher)}
                            </MDBCol>
                            <MDBCol xs={'10'} sm='10' md={'8'}>
                                <MDBCardBody className='ps-0'>
                                    {/* <MDBCardTitle>Popsicles Madriaga</MDBCardTitle> */}
                                    <MDBCardText>
                                        {teacher.firstname} {teacher.lastname}
                                    </MDBCardText>
                                    {/* <MDBCardText>
                                        <small className='text-muted'>Last updated 3 mins ago</small>
                                    </MDBCardText> */}
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                ))}
            </Box>
        </>
    )
}

export default TeachersList