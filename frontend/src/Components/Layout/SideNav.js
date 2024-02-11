import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu, } from 'react-pro-sidebar';
import { MDBNavbarBrand, MDBIcon } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const SideNav = () => {
    const navigate = useNavigate();
    const { isSideBarCollapse } = useSelector(state => state.ui)

    return (
        <Sidebar
            collapsed={isSideBarCollapse}
            collapsedWidth='63px'
            width='300px'
            backgroundColor='#F6F9FC'>
            <Menu>
                <MDBNavbarBrand href='#' className='d-flex justify-content-start px-3' style={{ height: 75 }}>
                    <img
                        src='./tupt-logo.png'
                        height='30'
                        alt=''
                        loading='lazy'
                        style={{ marginRight: '16px' }}
                    />
                    <div style={{ fontWeight: 500, fontSize: '18px' }}>TUPT PLATFORM</div>
                </MDBNavbarBrand>
                <div className='' style={{ marginLeft: -7 }}>
                    <MenuItem icon={<MDBIcon fas icon="home" />} onClick={() => navigate('/')}> Home </MenuItem>
                    <MenuItem icon={<MDBIcon fab icon="rocketchat" />} onClick={() => navigate('/tupt-chat')}> Chats </MenuItem>
                    <MenuItem icon={<MDBIcon fas icon="bullhorn" />}> Announcements </MenuItem>
                    <MenuItem icon={<MDBIcon far icon="comments" />}> Colab </MenuItem>
                    <MenuItem icon={<MDBIcon fas icon="info-circle" />}> Help </MenuItem>
                    {/* <SubMenu label="Charts">
                        <MenuItem> Chats </MenuItem>
                        <MenuItem> Line charts </MenuItem>
                    </SubMenu> */}
                </div>
            </Menu>
        </Sidebar>
    )
}

export default SideNav