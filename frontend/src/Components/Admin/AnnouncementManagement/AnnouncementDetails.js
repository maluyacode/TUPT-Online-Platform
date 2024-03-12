import React, { Fragment, useEffect, useState } from 'react'
import Block from '../../Layout/Loaders/Block';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Paper, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { getAnnouncement } from '../../../api/announcementsAPI';
import ToastEmmiter from '../../Layout/ToastEmmiter';

import filipinoBarwords from 'filipino-badwords-list';
import Filter from 'bad-words';
import { MDBCard, MDBCardBody, MDBCardFooter, MDBCardHeader, MDBCardText, MDBCarousel, MDBCarouselItem, MDBIcon } from 'mdb-react-ui-kit';
import { FileIcon, defaultStyles } from 'react-file-icon';

const AnnouncementDetails = ({ setOpen, open, announcementId }) => {

    const [loading, setLoading] = useState(false);
    const [announcement, setAnnouncement] = useState({})

    console.log(announcement)

    const descriptionElementRef = React.useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const getSingleAnnouncement = async () => {
        const { data } = await getAnnouncement(announcementId);
        console.log(data)
        if (data.success) {
            setAnnouncement(data.announcement)
        } else {
            ToastEmmiter.error('Error occured');
        }
    }

    useEffect(() => {
        if (announcementId) {
            getSingleAnnouncement()
        }
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log(announcement)

    return (
        <React.Fragment>
            <Block loading={loading} />
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                scroll={'paper'}
                fullWidth
                maxWidth={'md'}
            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
                <pre>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        {filterText(announcement.title)}
                    </DialogTitle>
                </pre>
                <DialogContent dividers id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}>

                    <MDBCard border='primary' background='white' shadow='0' className='mb-3' style={{ minHeight: 200 }}>
                        <MDBCardHeader background='transparent' border='primary' className='d-flex flex-row justify-content-center'>
                            <Typography variant='h5' color={'primary'} >
                                <MDBIcon fas icon="bullhorn" size='xl' color={'danger'} />
                                <span className='fw-bold ms-2'>{announcement.title}</span>
                            </Typography>
                        </MDBCardHeader>
                        <MDBCardBody style={{ overflowY: 'auto', minHeight: 200 }}>
                            {announcement.images?.length > 0 ?
                                <MDBCarousel dark
                                    showControls={announcement.images?.length > 1}
                                    showIndicators
                                    className='mb-3'
                                    fade
                                >
                                    {announcement.images?.map((image, i) => (
                                        <MDBCarouselItem itemId={i + 1} className='d-flex flex-row justify-content-center mb-3'>
                                            <img src={image.url} height={250} className='d-block w-75' alt='...' />
                                        </MDBCarouselItem>
                                    ))}

                                </MDBCarousel> : ""
                            }
                            {/* <div className='d-flex flex-row justify-content-center mb-3'>
                                    <MDBCardImage width={250} src='https://via.placeholder.com/150' />
                                </div> */}

                            <MDBCardText className='text-center' >
                                <pre style={{ overflowX: 'hidden', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                                    <Typography dangerouslySetInnerHTML={{ __html: filterText(announcement.content) }}>
                                        {/* {} */}
                                    </Typography>
                                </pre>
                            </MDBCardText>
                            {announcement.attachments?.length > 0 ?
                                <>
                                    <Typography className='fw-bold my-2 mt-4'>Attachments</Typography>
                                    <Box className='d-flex flex-wrap gap-3'>
                                        {announcement.attachments?.map(attachment => {
                                            const fileName = attachment.original_name;
                                            const parts = fileName.split('.');
                                            const fileExtension = parts[parts.length - 1];
                                            return (
                                                <Fragment key={attachment._id}>
                                                    <Paper component={'a'} href={attachment.url} target='_blank' className='d-flex gap-1' sx={{ width: 'fit-content', p: 1, backgroundColor: '#EEEDEB', cursor: 'pointer' }}>
                                                        <div style={{ width: 25 }}>
                                                            <FileIcon extension={fileExtension} {...defaultStyles[fileExtension]} />
                                                        </div>
                                                        <span className='text-decoration-underline mt-1'>{attachment.original_name}</span>
                                                    </Paper>
                                                </Fragment>
                                            )
                                        })}
                                    </Box>
                                </> : ""
                            }

                        </MDBCardBody>
                        <MDBCardFooter background='transparent' border='primary' className='d-flex flex-row justify-content-between'>
                            <div>
                                <MDBIcon fas icon="calendar-alt" size='lg' />
                                <span className='ms-2'>{formatDate(announcement.createdAt, announcement.updatedAt)}</span>
                            </div>
                            <div>
                                <MDBIcon fas icon="users" size='lg' />
                                <span className='ms-2'>{announcement.groupViewers ? announcement?.groupViewers?.groupName : "For Everyone"}</span>
                            </div>
                            <div>
                                <MDBIcon fas icon="user" size='lg' />
                                <span className='ms-2'>{announcement?.createdBy?.firstname} {announcement?.createdBy?.lastname}</span>
                            </div>
                        </MDBCardFooter>
                    </MDBCard>

                </DialogContent>
                {/* <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions> */}
            </Dialog>
        </React.Fragment >
    )
}

const filterText = (text) => {
    try {
        const filter = new Filter({ list: filipinoBarwords.array });
        if (typeof text === 'string') {
            return replaceLinks(filter.clean(text));
        } else {
            return replaceLinks(text);
        }
    } catch (error) {
        console.error('Error filtering text:', error);
        return replaceLinks(text);
    }
}

function replaceLinks(text) {
    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    console.log(text)
    // Replace URLs with anchor tags
    return text?.replace(urlRegex, function (url) {
        return `<a href="${url}" target="_blank">${url}</a>`;
    });
}

function formatDate(createdAt, updatedAt) {

    let texIndication = ''

    if (createdAt !== updatedAt) {
        texIndication = 'Reannounced'
    }
    return `${texIndication} ${new Date(updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
}

export default AnnouncementDetails