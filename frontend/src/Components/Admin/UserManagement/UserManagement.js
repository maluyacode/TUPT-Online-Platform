import React, { useEffect, useState } from 'react'
import { MDBBtn, MDBCol, MDBContainer, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle, MDBRow } from 'mdb-react-ui-kit'
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from '@mui/material/styles';

import SideNav from '../../Layout/SideNav'
import TopBar from '../../Layout/TopBar'
import Block from '../../Layout/Loaders/Block'
import ToastEmmiter from '../../Layout/ToastEmmiter'

import { useNavigate } from "react-router-dom";

import { getMuiTheme, getTableColumns, getTableData, getTableOptions } from './userTableConfig'
import { getUser } from '../../../utils/helper'
import { getAllUsers, sendEmailToUsers, sendSMSToUsers } from '../../../api/usersAPI'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Box, Chip, TextField, Typography } from '@mui/material';

const UserManagement = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [centredModal, setCentredModal] = useState(false);
    const [messageModal, setMessageModal] = useState(false)

    const [users, setUsers] = useState([]);
    const [columns, setColumns] = useState([]);
    const [options, setOptions] = useState({});
    const [selectedUsers, setSelectedUsers] = useState([]);

    const toggleOpen = () => {
        if (centredModal) {
            setCentredModal(false)
        } else {
            setCentredModal(true)
        }
    };

    const toggleSMS = () => {
        if (messageModal) {
            setMessageModal(false)
        } else {
            setMessageModal(true)
        }
    }

    const handleEdit = (id) => {
        navigate(`/admin/edit-user/${id}`)
    }

    const deleteUser = async (id, value) => {
        setLoading(true)
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/user/delete/${id}?action=${value}`, {
                withCredentials: true
            });
            setLoading(false)
            ToastEmmiter.success(data.message, 'top-center')
            getUsers();
        } catch ({ response }) {
            setLoading(false)
            ToastEmmiter.error('System error, try again later', 'top-center')
            console.log(response);
            return response
        }
    }

    const handleDelete = (id, value = 'delete') => {
        Swal.fire({
            // title: "Are you sure?",
            text: value === 'restore' ? "Would you like to restore this account?" : "Would you like to disable this account?",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(id, value)
            }
        });
    }


    const sendMessage = (users) => {
        setSelectedUsers(users)
        setMessageModal(true)
    }

    const sendEmail = (users) => {
        setSelectedUsers(users)
        setCentredModal(true)
    }

    const goSendEmail = async (e) => {

        e.preventDefault();
        setLoading(true)
        const formData = new FormData(e.target)
        formData.append('users', JSON.stringify(selectedUsers))
        // formData.set('body', JSON.stringify(e.target.body.value))
        const { data } = await sendEmailToUsers(formData);
        if (data.success) {
            setLoading(false)
            ToastEmmiter.success(data.message, 'top-center')
            getUsers();
            toggleOpen()
            e.target.reset()
        } else {
            setLoading(false)
            ToastEmmiter.error('System error, try again later', 'top-center');
        }

    }

    const goSendSms = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData(e.target)
        formData.append('users', JSON.stringify(selectedUsers))
        const { data } = await sendSMSToUsers(formData);
        if (data.success) {
            setLoading(false)
            ToastEmmiter.success(data.message, 'top-center')
            getUsers();
            toggleSMS()
            e.target.reset()
        } else {
            setLoading(false)
            ToastEmmiter.error('System error, try again later', 'top-center');
        }
    }


    const getUsers = async () => {
        setLoading(true)
        const { data } = await getAllUsers();
        if (data.success) {

            setLoading(false)
            setUsers(getTableData(data.users))
            setColumns(getTableColumns(handleEdit, handleDelete))
            setOptions(getTableOptions(navigate, sendEmail, sendMessage));

        } else {
            setLoading(false)
            ToastEmmiter.error('System error, please try again later', 'top-center')
        }
    }

    const deselect = (user) => {
        setSelectedUsers(selectedUsers.filter(tempUser => tempUser._id !== user._id));
    }

    useEffect(() => {
        getUsers();
    }, [])

    const onChange = (e) => {
        console.log(JSON.stringify(e.target.value))
    }


    return (
        <>
            {/* Email */}
            <MDBModal tabIndex='-1' open={centredModal} setOpen={setCentredModal}>
                <MDBModalDialog centered>
                    <form onSubmit={goSendEmail}>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Send Email Alert</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' type='button' onClick={toggleOpen}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>

                                <Box className='mb-4'>
                                    {selectedUsers?.map((user, i) => (
                                        <Chip key={i} label={`${user.fullname}`} onDelete={() => deselect(user)} sx={{ mx: 0.3, my: 0.3 }} />
                                    ))}
                                </Box>

                                <TextField name='subject' size='small' className='mb-4' label='Subject' fullWidth />
                                <TextField onChange={onChange} name='body' size='small' className='mb-4' rows={10} multiline label='Body' fullWidth />
                                <TextField name='attachments' size='small' type='file' className='mb-4' label='Attachments' fullWidth InputLabelProps={{ shrink: true }} inputProps={{
                                    multiple: true
                                }} />
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn type='button' color='secondary' onClick={() => {
                                    setCentredModal(false);
                                    setSelectedUsers([])
                                }}>
                                    Cancel
                                </MDBBtn>
                                <MDBBtn type='submit'>Send</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </form>
                </MDBModalDialog>
            </MDBModal>
            {/* Email */}

            {/* SMS */}
            <MDBModal tabIndex='-1' open={messageModal}
                setOpen={setMessageModal}
            >
                <MDBModalDialog centered>
                    <form onSubmit={goSendSms}>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Send SMS Alert</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' type='button' onClick={toggleSMS}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>

                                <Box className='mb-4'>
                                    {selectedUsers?.map((user, i) => (
                                        <Chip key={i} label={`${user.fullname}`} onDelete={() => deselect(user)} sx={{ mx: 0.3, my: 0.3 }} />
                                    ))}
                                </Box>

                                {/* <Typography variant='h5'>Message</Typography> */}
                                <TextField onChange={onChange} name='message' size='small' className='mb-4' rows={10} multiline label='Message' fullWidth />
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn type='button' color='secondary' onClick={() => {
                                    toggleSMS()
                                    setSelectedUsers([])
                                }}>
                                    Cancel
                                </MDBBtn>
                                <MDBBtn type='submit'>Send</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </form>
                </MDBModalDialog>
            </MDBModal>
            {/* SMS */}

            <Block loading={loading} />
            <div style={{ display: 'flex', height: '100vh' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <MDBContainer fluid>
                        <MDBRow className='mt-3 '>
                            <MDBCol sm={12}>

                                <ThemeProvider theme={getMuiTheme}>
                                    <MUIDataTable
                                        title={"Users List"}
                                        data={users}
                                        columns={columns}
                                        options={options}
                                    />
                                </ThemeProvider>

                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </main>
            </div>
        </>
    )
}

export default UserManagement