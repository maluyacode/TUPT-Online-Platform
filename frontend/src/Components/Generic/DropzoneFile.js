import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material';
import { useDropzone } from 'react-dropzone';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};


const DropzoneFile = ({ setImages }) => {

    const [files, setFiles] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            // console.log(acceptedFiles)
            setImages(acceptedFiles)
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
            </div>
        </div>
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <>
            <Box sx={{ border: 1, borderColor: '#C4C4C4', borderStyle: 'dashed', cursor: 'pointer' }}>
                <div {...getRootProps({ className: 'dropzone' })} style={{ border: 1, display: 'flex', flexDirection: 'column', paddingBottom: 10 }}>
                    <input {...getInputProps()} />
                    <p style={{ color: '#C4C4C4', textAlign: 'center' }} >Drag 'n' drop some files here, or click to select files</p>
                    <img style={{ margin: 'auto', width: 100 }} src='https://static.vecteezy.com/system/resources/thumbnails/019/859/918/small/computer-and-electronic-device-icon-isolated-on-transparent-background-png.png' />
                </div>
            </Box>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </>

    )
}

export default DropzoneFile