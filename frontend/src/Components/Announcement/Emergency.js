import React from 'react'
import MetaData from '../Layout/MetaData'
import SideNav from '../Layout/SideNav'
import TopBar from '../Layout/TopBar'
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import { Box, Button, TextField, Typography } from '@mui/material'
import Swal from 'sweetalert2'

const Emergency = () => {

    const handleAlert = () => {
        Swal.fire({
            // title: "Are you sure?",
            text: "This system will send SMS and email notifications to all platform users in case of a genuine emergency. - Ygot",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Cancel",
            cancelButtonText: "Alert!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Alert!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <>
            <MetaData pageTitle="Announcements" />
            <div style={{ display: 'flex', height: '100vh' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <MDBContainer style={{ maxWidth: 1000 }} className='mt-4'>
                        <MDBRow>
                            <MDBCol>
                                <Box sx={{ boxShadow: 5, p: 2 }}>
                                    <Typography variant='h6' mb={2}>Emergency Dali!</Typography>
                                    <TextField placeholder='Message' multiline rows={12} size='small' fullWidth sx={{ mb: 2 }}></TextField>
                                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                        <Button variant='contained' sx={{ mr: 2 }}>Clear</Button>
                                        <Button variant='contained' sx={{ ms: 'auto' }} color='error' onClick={handleAlert}>Alert</Button>
                                    </Box>
                                </Box>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </main>
            </div>
        </>
    )
}


export default Emergency