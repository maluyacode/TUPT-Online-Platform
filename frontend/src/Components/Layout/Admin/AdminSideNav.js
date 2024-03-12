import { MDBIcon, MDBNavbarBrand } from 'mdb-react-ui-kit';
import React from 'react'
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ChatIcon from '@mui/icons-material/Chat';
import WorkspacesIcon from '@mui/icons-material/Workspaces';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminSideNav = () => {

    const navigate = useNavigate();
    const { isSideBarCollapse } = useSelector(state => state.ui)

    return (
        <>
            <Sidebar
                collapsed={isSideBarCollapse}
                collapsedWidth='63px'
                width='300px'
                backgroundColor='#F6F9FC'>
                <Menu>
                    <MDBNavbarBrand href='#' className='d-flex justify-content-start px-3' style={{ height: 75 }}>
                        <img
                            src='/tupt-logo.png'
                            height='30'
                            alt=''
                            loading='lazy'
                            style={{ marginRight: '16px' }}
                        />
                        <div style={{ fontWeight: 500, fontSize: '18px' }}>ADMIN PANEL</div>
                    </MDBNavbarBrand>
                    <div className='' style={{ marginLeft: -7 }}>

                        <MenuItem onClick={() => navigate('/admin/dashboard')} icon={<MDBIcon fas icon="dashboard" />} > Dashboard </MenuItem>
                        <MenuItem onClick={() => navigate('/admin/chat-management')} icon={<ChatIcon />} > Chat Management </MenuItem>
                        <MenuItem onClick={() => navigate('/admin/announcement-management')} icon={<MDBIcon fas icon="bullhorn" />} > Announcement Management </MenuItem>
                        <MenuItem onClick={() => navigate('/admin/forum-management')} icon={<WorkspacesIcon />} > Forum Management </MenuItem>
                        <MenuItem onClick={() => navigate('/admin/user-management')} icon={<ManageAccountsIcon />} > User Management </MenuItem>
                        <MenuItem onClick={() => navigate('/admin/list-video-tutorial')} icon={<MDBIcon fas icon="chalkboard-teacher" />} > Video Tutorials </MenuItem>

                        {/* <SubMenu onClick={() => navigate('/announcements')} icon={<MDBIcon fas icon="bullhorn" />} label='Announcements'>
                            <MenuItem onClick={() => navigate('/teachers-post')} icon={<ViewListIcon />}> My Posts </MenuItem>
                            <MenuItem onClick={() => navigate('/post-announcement')} icon={<CampaignIcon />}>Post</MenuItem>
                            <MenuItem onClick={() => navigate('/post-emergency')} icon={<ReportProblemIcon />}> Emergency </MenuItem>
                        </SubMenu> */}

                    </div>
                </Menu>
            </Sidebar>
        </>
    )
}

export default AdminSideNav