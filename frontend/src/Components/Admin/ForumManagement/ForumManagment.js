import React, { useEffect, useState } from 'react'
import SideNav from '../../Layout/SideNav'
import TopBar from '../../Layout/TopBar'
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom'
import { destroyTopic, fetchAllPost } from '../../../api/collabsApi'
import Swal from 'sweetalert2'
import ToastEmmiter from '../../Layout/ToastEmmiter'
import Block from '../../Layout/Loaders/Block'
import { getMuiTheme, getTableColumns, getTableData, getTableOptions } from './forumTableConfig'
import { ThemeProvider } from '@mui/material'
import MUIDataTable from 'mui-datatables'

const ForumManagment = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [options, setOptions] = useState({});

    const handleEdit = (id) => {
        navigate(`/admin/edit-announcement/${id}`)
    }

    const forceDelete = async (id) => {
        setLoading(true)
        const { data } = await destroyTopic(id);
        if (data.success) {
            getAllTopics()
            setLoading(false)
            ToastEmmiter.success(data.message)
        } else {
            ToastEmmiter.warning('Error fetching post', 'top-center');
            setLoading(false)
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
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                forceDelete(id)
            }
        });
    }

    const getAllTopics = async () => {
        setLoading(true)
        const fetchStatus = 'all'
        const fetchArchived = 'none'
        const { data } = await fetchAllPost(fetchStatus, fetchArchived);
        if (data.success) {

            setLoading(false)
            setData(getTableData(data.topics))
            setColumns(getTableColumns(handleEdit, handleDelete))
            setOptions(getTableOptions(navigate));

        } else {
            setLoading(false)
            ToastEmmiter.error('System error, please try again later', 'top-center')
        }
    }

    useEffect(() => {
        getAllTopics()
    }, [])
    console.log(columns)

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
                                        title={"List of Topics"}
                                        data={data}
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

export default ForumManagment