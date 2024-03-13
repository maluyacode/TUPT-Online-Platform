import { Box, Button, ButtonGroup, Chip, Paper } from "@mui/material";
import { Visibility, EditNote, Delete } from "@mui/icons-material"
import { createTheme } from '@mui/material/styles';
import { profileHead } from '../../../utils/avatar'
import ChatIcon from '@mui/icons-material/Chat';
import EmailIcon from '@mui/icons-material/Email';
import { FileIcon, defaultStyles } from 'react-file-icon';

export const getTableColumns = (handleView, handleDelete) => {
    const userColumns = [
        {
            name: "id",
            label: "ID",
            options: {
                filter: false,
                display: false
            }
        },
        // {
        //     name: "images",
        //     label: "Image",
        //     options: {
        //         filter: false,
        //         customBodyRender: (images, tableMeta, updateValue) => {
        //             return (
        //                 <>
        //                     <img src={images && images[0]?.url || 'https://i0.wp.com/thinkfirstcommunication.com/wp-content/uploads/2022/05/placeholder-1-1.png?fit=1200%2C800&ssl=1'}
        //                         style={{
        //                             width: '80px', height: '80px', objectFit: 'cover', borderColor: 'black', borderWidth: '1px', borderStyle: 'solid'
        //                         }} />
        //                 </>
        //             )
        //         }
        //     }
        // },
        {
            name: "title",
            label: "Title"
        },
        {
            name: "content",
            label: "Content",
            options: {
                filter: false
            }
        },
        {
            name: "createdBy",
            label: "Posted By"
        },
        {
            name: "groupViewers",
            label: "Group Viewers"
        },
        // {
        //     name: "canViewBy",
        //     label: "Role Viewers"
        // },
        // {
        //     name: "attachments",
        //     label: "Attachments",
        //     options: {
        //         filter: false,
        //         customBodyRender: (value, tableMeta, updateValue) => {
        //             return (
        //                 <>
        //                     {value?.map(attachment => {
        //                         const fileName = attachment.original_name;
        //                         const parts = fileName.split('.');
        //                         const fileExtension = parts[parts.length - 1];
        //                         return (
        //                             <>
        //                                 <Paper component={'a'} href={attachment.url} target='_blank' className='d-flex gap-1 mb-2' sx={{ width: 'fit-content', p: 0.3, backgroundColor: '#EEEDEB', cursor: 'pointer' }}>
        //                                     <div style={{ width: 25 }}>
        //                                         <FileIcon extension={fileExtension} {...defaultStyles[fileExtension]} />
        //                                     </div>
        //                                     <span className='text-decoration-underline mt-1' style={{ fontSize: 12 }}>{attachment.original_name.substring(0, 10)}...</span>
        //                                 </Paper>
        //                             </>
        //                         )
        //                     })}
        //                 </>
        //             )
        //         }
        //     }
        // },
        {
            name: "createdAt",
            label: "Posted On",
            options: {
                customBodyRender: (data, tableMeta, updateValue) => {
                    return formatDate(data)
                }
            }
        },
        {
            name: "updatedAt",
            label: "Last Update",
            options: {
                display: false,
                customBodyRender: (data, tableMeta, updateValue) => {
                    return formatDate(data)
                }
            }
        },
        {
            name: "deletedAt",
            label: "Archived At",
            options: {
                display: false,
                customBodyRender: (data, tableMeta, updateValue) => {
                    return formatDate(data)
                }
            }
        },
        {
            name: "forceDeletedAt",
            label: "Deleted At",
            options: {
                display: false,
                customBodyRender: (data, tableMeta, updateValue) => {
                    return formatDate(data)
                }
            }
        },
        {
            name: "status",
            labal: "Status",
            options: {
                customBodyRender: (value) => {
                    if (value === 'Active') {
                        return <Chip label={value} sx={{ backgroundColor: '#C5EBAA', width: '80%' }} />
                    } else if (value === 'Archived') {
                        return <Chip label={value} sx={{ backgroundColor: '#F9E897', width: '80%' }} />
                    } else {
                        return <Chip label={value} sx={{ backgroundColor: '#FF6868', width: '80%' }} />
                    }
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
                            <Button size='small' onClick={() => handleView(value)}><Visibility /></Button>
                            {/* <Button size='small' onClick={() => handleEdit(value)}><EditNote /></Button> */}
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
        rowsPerPage: 6,
        responsive: "vertical",
        selectableRows: false,
        // onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => {

        // },
        // customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
        //     console.log(displayData)
        //     const users = selectedRows.data.map(item => {
        //         return {
        //             _id: displayData.at(item.index).data[0],
        //             fullname: `${displayData.at(item.index).data[2]} ${displayData.at(item.index).data[3]}`,
        //             email: displayData.at(item.index).data[4],
        //             phone: displayData.at(item.index).data[5],
        //         }
        //     });

        //     return (
        //         <Box className='px-4'>
        //             <Button onClick={() => sendEmail(users)} startIcon={<EmailIcon />} variant="contained" size='small' className="me-2">Email</Button>
        //             <Button onClick={() => sendMessage(users)} startIcon={<ChatIcon />} variant="contained" size='small'>Send SMS</Button>
        //         </Box>
        //     )
        // },
        // customToolbar: () => {
        //     return (
        //         <Button onClick={() => navigate('/admin/create-announcement')} size='small' variant='contained' sx={{ marginLeft: '20px' }}>New Announcement</Button>
        //     )
        // },
    }
    return options
}

export const getTableData = (announcements) => {

    const formattedData = announcements.map(announcement => {
        return {
            id: announcement._id,
            images: announcement.images,
            title: announcement.title,
            content: announcement.content.substring(0, 20) + '.....',
            createdBy: `${announcement.createdBy.firstname} ${announcement.createdBy.lastname}`,
            groupViewers: announcement.groupViewers?.groupName ? announcement.groupViewers?.groupName : "For everyone",
            canViewBy: announcement.canViewBy.join(', ').toUpperCase(),
            attachments: announcement.attachments,
            createdAt: announcement.createdAt,
            updatedAt: announcement.updatedAt,
            deletedAt: announcement.deletedAt || 'Active',
            forceDeletedAt: announcement.forceDeletedAt || 'Active',
            status: (announcement.forceDeletedAt && announcement.deletedAt) ? 'Disabled' : (announcement.deletedAt && !announcement.forceDeletedAt) ? "Archived" : "Active",
            actions: announcement._id,
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

function formatDate(date) {

    if (date === 'Active') {
        return 'Currently Active'
    }

    return `${new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;

}