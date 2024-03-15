import { Box, Button, ButtonGroup, Chip, Paper, Tooltip, Typography } from "@mui/material";
import { Visibility, EditNote, Delete, Archive } from "@mui/icons-material"
import { createTheme } from '@mui/material/styles';
import { profileHead } from '../../../utils/avatar'
import ChatIcon from '@mui/icons-material/Chat';
import EmailIcon from '@mui/icons-material/Email';
import { FileIcon, defaultStyles } from 'react-file-icon';

export const getTableColumns = (handleView, handleDelete) => {
    const columns = [
        {
            name: "id",
            label: "ID",
            options: {
                filter: false,
                display: false,
                sort: true,
            }
        },
        {
            name: "heading",
            label: "Heading",
        },
        {
            name: "body",
            label: "Body",
        },
        {
            name: "postedBy",
            label: "Posted By"
        },
        {
            name: "comments",
            label: "Comments",
            options: {
                customBodyRender: (value) => {
                    return <Typography textAlign={'center'}>{value}</Typography>
                }
            }
        },
        // {
        //     name: "images",
        //     label: "Images",
        //     options: {
        //         sort: false,
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
        // {
        //     name: "attachments",
        //     label: "Attachments",
        //     options: {
        //         sort: false,
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
            label: "Status",
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
                        <ButtonGroup variant="text" aria-label="text button group" className="d-flex justify-content-center">
                            <Tooltip title='View Details'>
                                <Button size='small' onClick={() => handleView(value._id)}><Visibility /></Button>
                            </Tooltip>
                            {!value.forceDeletedAt && (
                                <Tooltip title='Delete'>
                                    <Button size='small' onClick={() => handleDelete(value._id)} ><Delete /></Button>
                                </Tooltip>
                            )}
                            {/* <Button size='small' onClick={() => handleEdit(value)}><EditNote /></Button> */}
                        </ButtonGroup>
                    )
                }
            }
        }
    ];

    return columns
}


export const getTableOptions = (navigate) => {
    const options = {
        filterType: 'multiselect',
        rowsPerPage: 6,
        responsive: "standard",
        selectableRows: false
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

export const getTableData = (datas) => {

    const formatedData = datas.map(data => {
        return {
            id: data._id,
            images: data.images,
            heading: data.heading,
            body: data.body.substring(0, 20) + '.....',
            postedBy: `${data.postedBy?.firstname || 'Deleted'} ${data.postedBy?.lastname || 'User'}`,
            comments: data.commentCount,
            attachments: data.attachments,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            deletedAt: data.deletedAt || 'Active',
            forceDeletedAt: data.forceDeletedAt || 'Active',
            status: (data.forceDeletedAt && data.deletedAt) ? 'Disabled' : (data.deletedAt && !data.forceDeletedAt) ? "Archived" : "Active",
            actions: data,
        }
    })
    return formatedData
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