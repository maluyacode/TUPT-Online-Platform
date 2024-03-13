import { Box, Button, ButtonGroup } from "@mui/material";
import { Visibility, EditNote, Delete } from "@mui/icons-material"
import { createTheme } from '@mui/material/styles';
import { profileHead } from '../../../utils/avatar'
import ChatIcon from '@mui/icons-material/Chat';
import EmailIcon from '@mui/icons-material/Email';
import { Typography } from "@mui/material";
import { Chip } from "@mui/material";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';

export const getTableColumns = (handleEdit, handleDelete) => {
    const userColumns = [
        {
            name: "id",
            label: "ID",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: "images",
            label: "Profile",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            {profileHead(value, 80, 80)}
                        </>
                    )
                }
            }
        },
        {
            name: "firstname",
            label: "First Name"
        },
        {
            name: "lastname",
            label: "Last Name"
        },
        {
            name: "email",
            label: "Email"
        },
        {
            name: "phone",
            label: "Phone"
        },
        {
            name: "role",
            label: "Role",
            options: {
                customBodyRender: (value) => {
                    return <Typography textTransform={'capitalize'}>{value}</Typography>
                }
            }
        },
        {
            name: "status",
            label: "Status",
            options: {
                customBodyRender: (value) => {
                    return <Chip label={value} sx={{ backgroundColor: value === 'Active' ? '#C5E898' : '#E78895', width: '80%' }} />
                }
            }
        },
        {
            name: "deletedAt",
            label: "Deleted At",
            options: {
                display: false,
                customBodyRender: (value) => {
                    return value ? new Date(value).toLocaleDateString('en-PH') : "Nothing show"
                }
            }
        },
        {
            name: 'actions',
            label: 'Actions',
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <ButtonGroup variant="text" aria-label="text button group">
                            <Button size='small' onClick={() => console.log(value._id)}><Visibility /></Button>
                            <Button size='small' onClick={() => handleEdit(value._id)}><EditNote /></Button>
                            {value.deletedAt ?
                                <Button onClick={() => handleDelete(value._id, 'restore')}>
                                    <RestoreFromTrashIcon />
                                </Button>
                                :
                                <Button size='small' onClick={() => handleDelete(value._id)} ><Delete /></Button>
                            }
                        </ButtonGroup>
                    )
                }
            }
        }
    ];

    return userColumns
}


export const getTableOptions = (navigate, sendEmail, sendMessage) => {
    const options = {
        filterType: 'multiselect',
        rowsPerPage: 3,
        responsive: "standard",
        onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => {

        },
        customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
            console.log(displayData)
            const users = selectedRows.data.map(item => {
                return {
                    _id: displayData.at(item.index).data[0],
                    fullname: `${displayData.at(item.index).data[2]} ${displayData.at(item.index).data[3]}`,
                    email: displayData.at(item.index).data[4],
                    phone: displayData.at(item.index).data[5],
                }
            });

            return (
                <Box className='px-4'>
                    <Button onClick={() => sendEmail(users)} startIcon={<EmailIcon />} variant="contained" size='small' className="me-2">Email</Button>
                    <Button onClick={() => sendMessage(users)} startIcon={<ChatIcon />} variant="contained" size='small'>Send SMS</Button>
                </Box>
            )
        },
        customToolbar: () => {
            return (
                <Button onClick={() => navigate('/admin/create-user')} size='small' variant='contained' sx={{ marginLeft: '20px' }}>Add New User</Button>
            )
        },
    }
    return options
}

export const getTableData = (users) => {

    const formattedData = users.map(user => {
        return {
            id: user._id,
            images: user,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.contact_number,
            role: user.role,
            status: user.deletedAt ? "Disabled" : "Active",
            deletedAt: user.deletedAt,
            actions: user,
        }
    })
    return formattedData
}

export const getMuiTheme = createTheme({
    components: {
        MUIDataTable: {
            styleOverrides: {
                root: {
                    '& table': {
                        borderCollapse: 'collapse',
                        '& td, & th': {
                            borderRight: '1px solid #ddd', // Vertical border color
                        },
                        '& td:last-child, & th:last-child': {
                            borderRight: 'none', // Remove border for last column
                        },
                    },
                },
            },
        },
    },
});