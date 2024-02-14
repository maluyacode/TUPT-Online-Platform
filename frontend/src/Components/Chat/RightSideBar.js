import React from 'react'
import { MDBBtn, MDBBtnGroup, MDBContainer } from 'mdb-react-ui-kit';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useSelector } from 'react-redux';
import ChatLists from './ChatLists';

const RightSideBar = () => {

    const { isChatSideBarOpen } = useSelector(state => state.ui);

    return (
        <Sidebar
            rtl={false}
            collapsed={isChatSideBarOpen}
            collapsedWidth='0'
            width='400px'
        >
            {/* <Menu>
                <SubMenu label="Charts">
                    <MenuItem> Pie charts </MenuItem>
                    <MenuItem> Line charts </MenuItem>
                </SubMenu>
                <MenuItem> Documentation </MenuItem>
                <MenuItem> Calendar </MenuItem>
            </Menu> */}
            <MDBContainer fluid className='mt-5'>
                <MDBBtnGroup shadow='0' className='d-flex justify-content-center'>
                    <MDBBtn color='secondary'>
                        Chats
                    </MDBBtn>
                    <MDBBtn color='secondary'>
                        Groups
                    </MDBBtn>
                    <MDBBtn color='secondary'>
                        People
                    </MDBBtn>
                </MDBBtnGroup>
                <ChatLists />
            </MDBContainer>
        </Sidebar>
    )
}

export default RightSideBar