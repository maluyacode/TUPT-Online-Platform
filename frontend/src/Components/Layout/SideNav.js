import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu, } from 'react-pro-sidebar';
import { MDBNavbarBrand, MDBIcon } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import CampaignIcon from '@mui/icons-material/Campaign';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ViewListIcon from '@mui/icons-material/ViewList';
import { getUser } from '../../utils/helper';
import AdminSideNav from './Admin/AdminSideNav';
import FlagIcon from '@mui/icons-material/Flag';

const SideNav = () => {
    const navigate = useNavigate();
    const { isSideBarCollapse } = useSelector(state => state.ui)

    return (
        <>
            {getUser().role === 'admin' ?
                < AdminSideNav />
                :

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
                            <div style={{ fontWeight: 500, fontSize: '18px' }}>TUPT PLATFORM</div>
                        </MDBNavbarBrand>
                        <div className='' style={{ marginLeft: -7 }}>
                            <MenuItem onClick={() => navigate('/')} icon={<MDBIcon fas icon="home" />} > Home </MenuItem>
                            <MenuItem onClick={() => navigate('/tupt-chat')} icon={<MDBIcon fab icon="rocketchat" />} > Emergency Chat </MenuItem>
                            <SubMenu onClick={() => navigate('/announcements')} icon={<MDBIcon fas icon="bullhorn" />} label='Announcements'>
                                {getUser().role === 'teacher' && (
                                    <>
                                        <MenuItem onClick={() => navigate('/teachers-post')} icon={<ViewListIcon />}> My Posts </MenuItem>
                                        <MenuItem onClick={() => navigate('/post-announcement')} icon={<CampaignIcon />}>Post</MenuItem>
                                    </>
                                )}
                                {/* <MenuItem onClick={() => navigate('/post-emergency')} icon={<ReportProblemIcon />}> Emergency </MenuItem> */}
                            </SubMenu>
                            <MenuItem onClick={() => navigate('/collab')} icon={<MDBIcon far icon="comments" />}> EM Collaboration </MenuItem>

                            <MenuItem onClick={() => navigate('/report-incident')} icon={<FlagIcon />}> Report Case </MenuItem>

                            <MenuItem icon={<MDBIcon fas icon="info-circle" />}> How to use this App? </MenuItem>
                            {/* <SubMenu label="Charts">
                        <MenuItem> Chats </MenuItem>
                        <MenuItem> Line charts </MenuItem>
                    </SubMenu> */}
                        </div>
                    </Menu>
                </Sidebar>
            }
        </>
    )
}

export default SideNav