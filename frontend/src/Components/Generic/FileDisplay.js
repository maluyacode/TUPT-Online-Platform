import { Paper } from '@mui/material'
import React from 'react'
import { FileIcon, defaultStyles } from 'react-file-icon'

const FileDisplay = ({ attachment }) => {

    const fileName = attachment.original_name;
    const parts = fileName.split('.');
    const fileExtension = parts[parts.length - 1];

    return (
        <Paper component={'a'} href={attachment.url} target='_blank' className='d-flex' sx={{ width: 'fit-content', p: 1, backgroundColor: '#EEEDEB', cursor: 'pointer' }}>
            <div style={{ width: 25 }}>
                <FileIcon extension={fileExtension} {...defaultStyles[fileExtension]} />
            </div>
            <span className='text-decoration-underline mt-1'>{attachment.original_name}</span>
        </Paper>
    )
}

export default FileDisplay