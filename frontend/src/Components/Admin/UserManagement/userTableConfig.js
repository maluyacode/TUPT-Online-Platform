import { Button, ButtonGroup } from "@mui/material";
import { Visibility, EditNote, Delete } from "@mui/icons-material"
import { createTheme } from '@mui/material/styles';
import { profileHead } from '../../../utils/avatar'

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
        },
        {
            name: 'actions',
            label: 'Actions',
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <ButtonGroup variant="text" aria-label="text button group">
                            <Button size='small' onClick={() => console.log(value)}><Visibility /></Button>
                            <Button size='small' onClick={() => handleEdit(value)}><EditNote /></Button>
                            <Button size='small' onClick={() => handleDelete(value)} ><Delete /></Button>
                        </ButtonGroup>
                    )
                }
            }
        }
    ];

    return userColumns
}


export const getTableOptions = (navigate) => {
    const options = {
        filterType: 'multiselect',
        rowsPerPage: 3,
        onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => {

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
            actions: user._id,
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