import React, { useEffect, useState } from 'react'
import { MDBBtn, MDBCol, MDBContainer, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle, MDBRow } from 'mdb-react-ui-kit'
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from '@mui/material/styles';

import SideNav from '../../Layout/SideNav'
import TopBar from '../../Layout/TopBar'
import Block from '../../Layout/Loaders/Block'
import ToastEmmiter from '../../Layout/ToastEmmiter'

import { useNavigate } from "react-router-dom";

import { getMuiTheme, getTableColumns, getTableData, getTableOptions } from './announcementTableConfig'
import { getUser } from '../../../utils/helper'
import { getAllUsers, sendEmailToUsers, sendSMSToUsers } from '../../../api/usersAPI'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Box, Chip, TextField, Typography } from '@mui/material';
import { getAnnouncements } from '../../../api/announcementsAPI';
import AnnouncementDetails from './AnnouncementDetails';

const AnnouncementManagement = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [announcements, setAnnouncements] = useState([]);
    const [columns, setColumns] = useState([]);
    const [options, setOptions] = useState({});
    const [selectedUsers, setSelectedUsers] = useState([]);

    const [open, setOpen] = useState(false);
    const [announcementId, seAnnouncementId] = useState('');

    const handleView = (id) => {
        seAnnouncementId(id);
        setOpen(true)
    }

    const deleteAnnouncement = async (id) => {
        setLoading(true)
        try {

            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/announcement/delete/${id}`, {
                withCredentials: true,
            })

            setLoading(false)
            ToastEmmiter.success(data.message, 'top-right')
            getAllAnnouncements()

        } catch (err) {
            setLoading(false)
            console.log(err)
            ToastEmmiter.error('Error occured', 'top-right')
        }
    }

    const handleDelete = (id) => {
        Swal.fire({
            // title: "Are you sure?",
            text: "Once you proceed with this action, it cannot be undone! By proceeding, this content will no longer be visible to users.",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmed"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteAnnouncement(id)
            }
        });
    }

    const getAllAnnouncements = async () => {
        setLoading(true)
        const { data } = await getAnnouncements();
        if (data.success) {
            console.log(data.announcements)
            setLoading(false)
            setAnnouncements(getTableData(data.announcements))
            setColumns(getTableColumns(handleView, handleDelete))
            setOptions(getTableOptions(navigate));

        } else {
            setLoading(false)
            ToastEmmiter.error('System error, please try again later', 'top-center')
        }
    }

    useEffect(() => {
        getAllAnnouncements()
    }, [])

    return (
        <>
            <AnnouncementDetails key={announcementId} setOpen={setOpen} open={open} announcementId={announcementId} />
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
                                        title={"Announcements List"}
                                        data={announcements}
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

export default AnnouncementManagement