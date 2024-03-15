import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { closeProfile } from '../../actions/uiActions';
import { Box, Chip, IconButton, Typography } from '@mui/material';
import { colorCoding, profileHead } from '../../utils/avatar';
import { Close } from '@mui/icons-material';

import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
    MDBTypography
} from 'mdb-react-ui-kit';

const ViewUser = () => {

    const [open, setOpen] = React.useState(false);
    const { openProfile, user } = useSelector(state => state.ui)
    const address = `${user?.user?.houseNo || ""} ${user?.user?.street || ""} ${user?.user?.baranggay || ""} ${user?.user?.city || ""}`
    const dispatch = useDispatch();
    console.log(address)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        dispatch(closeProfile());
    };

    console.log(user)

    return (
        <React.Fragment>
            <Dialog
                open={openProfile}
                onClose={handleClose}
                fullWidth
                maxWidth='md'
            >
                <IconButton onClick={handleClose} aria-label="close"
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}>
                    <Close />
                </IconButton>
                <DialogTitle>
                    <Typography>
                        Profile
                        {/* {user?.user?.firstname} {user?.user?.lastname} */}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <section style={{ backgroundColor: '#eee' }}>
                        <MDBContainer className="py-2">
                            <MDBRow>
                                <MDBCol lg="4">
                                    <MDBCard className="mb-4">
                                        <MDBCardBody className="text-center">
                                            <div className='d-flex justify-content-center'>
                                                {profileHead(user?.user, 150, 150, 60, '50%')}
                                            </div>
                                            {/* <p className="text-muted mb-1">{user?.user?.firstname} {user?.user?.lastname}</p> */}
                                            <p className="text-muted mb-4 text-capitalize">{user?.user?.role}</p>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol lg="8">
                                    <MDBCard className="mb-4">
                                        <MDBCardBody>
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Full Name</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBCardText className="text-muted">{user?.user?.firstname} {user?.user?.lastname}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Email</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBCardText className="text-muted">{user?.user?.email}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Phone</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBCardText className="text-muted">{user?.user?.contact_number}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Address</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBCardText className="text-muted">{address === '' ? 'Not Specified' : address}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                {user?.connectedParents?.map(user => (
                                    <MDBCol xs={12}>
                                        <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                                            <MDBRow className="g-0">
                                                <MDBCol md="4" className="gradient-custom text-center text-white"
                                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                                    <div className="mt-3 d-flex justify-content-center" style={{ width: '100%' }}>
                                                        {profileHead(user, 70, 70, 30, '50%')}
                                                    </div>
                                                    <MDBTypography color='black' tag="h5">{user?.firstname} {user?.lastname}</MDBTypography>
                                                    <MDBCardText className='text-dark text-capitalize'>{user?.role}</MDBCardText>
                                                </MDBCol>
                                                <MDBCol md="8">
                                                    <MDBCardBody className="p-4">
                                                        <MDBTypography tag="h6">Information</MDBTypography>
                                                        <hr className="mt-0 mb-4" />
                                                        <MDBRow className="pt-1">
                                                            <MDBCol size="6" className="mb-3">
                                                                <MDBTypography tag="h6">Email</MDBTypography>
                                                                <MDBCardText className="text-muted">{user?.email}</MDBCardText>
                                                            </MDBCol>
                                                            <MDBCol size="6" className="mb-3">
                                                                <MDBTypography tag="h6">Phone</MDBTypography>
                                                                <MDBCardText className="text-muted">{user?.contact_number}</MDBCardText>
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </MDBCardBody>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCard>
                                    </MDBCol>
                                ))}
                            </MDBRow>
                        </MDBContainer>
                    </section>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

export default ViewUser