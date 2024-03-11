import React, { useState } from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import { useNavigate } from 'react-router-dom';

import { closeSideBar, openSideBar } from '../../actions/uiActions'
import { getUser } from '../../utils/helper';
import { profileHead } from '../../utils/avatar';
import { logout } from '../../api/usersAPI';
import ToastEmmiter from '../Layout/ToastEmmiter'
import Block from '../Layout/Loaders/Block'

export default function TopBar() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { isSideBarCollapse } = useSelector(state => state.ui);

    const handleSideBar = e => {
        e.preventDefault();
        if (isSideBarCollapse) {
            dispatch(closeSideBar())
        } else {
            dispatch(openSideBar())
        }
    }

    const handleLogout = async () => {
        console.log("ASDsad")
        setLoading(true)
        const { data } = await logout();
        if (data.success) {
            setLoading(false)
            ToastEmmiter.success(data.message, 'top-center')
            navigate('/login')
        } else {
            setLoading(false)
        }
    }

    return (
        <>
            <Block loading={loading} />
            <MDBNavbar light bgColor='light' style={{ zIndex: 4, }}>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='' onClick={handleSideBar} >
                        <MDBIcon fas icon="bars" />
                    </MDBNavbarBrand>
                    <MDBNavbarItem style={{ listStyle: 'none' }}>
                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <React.Fragment>
                                    <MDBNavbarLink variant="contained" {...bindTrigger(popupState)}>
                                        {profileHead(getUser())}
                                    </MDBNavbarLink>
                                    <Menu {...bindMenu(popupState)}>
                                        <MenuItem onClick={() => {
                                            popupState.close()
                                            navigate('/profile')
                                        }}
                                        >Profile</MenuItem>
                                        {getUser().role === 'teacher' && (
                                            <MenuItem onClick={() => {
                                                popupState.close()
                                                navigate('/archived-announcements')
                                            }} >Archived Announcements</MenuItem>
                                        )}
                                        <MenuItem onClick={() => {
                                            navigate('/archived-posts')
                                            popupState.close()
                                        }}>Archived Posts</MenuItem>
                                        <MenuItem onClick={() => {
                                            popupState.close()
                                            handleLogout()
                                        }}>Logout</MenuItem>
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>
                        {/* <MDBNavbarLink href='#'>
                            {profileHead(getUser())}
                        </MDBNavbarLink> */}
                    </MDBNavbarItem>
                </MDBContainer>
            </MDBNavbar>
        </>
    );
}