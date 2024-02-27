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

const UserManagement = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        setLoading(true)
        const { data } = await getAllUsers();
        if (data.success) {

            setLoading(false)
            setUsers(getTableData(data.users))

        } else {
            setLoading(false)
            ToastEmmiter.error('System error, please try again later', 'top-center')
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    const handleEdit = (id) => {
        console.log(id)
    }

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
                                        columns={getTableColumns(handleEdit)}
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