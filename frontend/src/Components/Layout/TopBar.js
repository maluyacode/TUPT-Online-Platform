import React from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBIcon
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';

import { closeSideBar, openSideBar } from '../../actions/uiActions'

export default function TopBar() {

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
            <MDBNavbar light bgColor='light'>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='' onClick={handleSideBar} >
                        <MDBIcon fas icon="bars" />
                    </MDBNavbarBrand>
                </MDBContainer>
            </MDBNavbar>
        </>
    );
}