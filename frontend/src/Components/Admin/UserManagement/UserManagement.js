import React, { useEffect, useState } from 'react'
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from '@mui/material/styles';

import SideNav from '../../Layout/SideNav'
import TopBar from '../../Layout/TopBar'
import Block from '../../Layout/Loaders/Block'
import ToastEmmiter from '../../Layout/ToastEmmiter'

import { useNavigate } from "react-router-dom";

import { getMuiTheme, getTableColumns, getTableData, getTableOptions } from './userTableConfig'
import { getUser } from '../../../utils/helper'
import { getAllUsers } from '../../../api/usersAPI'
import axios from 'axios';
import Swal from 'sweetalert2';

const UserManagement = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [columns, setColumns] = useState([]);

    const handleEdit = (id) => {
        navigate(`/admin/edit-user/${id}`)
    }

    const deleteUser = async (id) => {
        setLoading(true)
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/user/delete/${id}`, {
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

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(id)
            }
        });
    }

    const getUsers = async () => {
        setLoading(true)
        const { data } = await getAllUsers();
        if (data.success) {

            setLoading(false)
            setUsers(getTableData(data.users))
            setColumns(getTableColumns(handleEdit, handleDelete))

        } else {
            setLoading(false)
            ToastEmmiter.error('System error, please try again later', 'top-center')
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <>
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
                                        title={"Employee List"}
                                        data={users}
                                        columns={columns}
                                        options={getTableOptions(navigate)}
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