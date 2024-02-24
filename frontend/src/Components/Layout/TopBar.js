import React from 'react';
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

export default function TopBar() {
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

    return (
        <>
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
                                        <MenuItem onClick={popupState.close}>My account</MenuItem>
                                        <MenuItem onClick={popupState.close}>Logout</MenuItem>
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