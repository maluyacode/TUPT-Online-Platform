import React, { useState } from 'react'
import { MDBBtn, MDBBtnGroup, MDBContainer } from 'mdb-react-ui-kit';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useSelector } from 'react-redux';
import ChatLists from './ChatLists';
import GroupLists from './GroupLists';
import PeopleLists from './PeopleLists';

const RightSideBar = () => {

    const { isChatSideBarOpen } = useSelector(state => state.ui);

    const [selectedTab, setSelectedTab] = useState('chats');


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
                    <MDBBtn color='secondary'
                        onClick={() => setSelectedTab('chats')}
                    >
                        Chats
                    </MDBBtn>
                    {/* <MDBBtn color='secondary'
                        onClick={() => setSelectedTab('groups')}
                    >
                        Groups
                    </MDBBtn> */}
                    <MDBBtn color='secondary'
                        onClick={() => setSelectedTab('people')}
                    >
                        People
                    </MDBBtn>
                </MDBBtnGroup>
                {selectedTab === 'chats' ? <ChatLists /> :
                    selectedTab === 'groups' ? <GroupLists /> :
                        <PeopleLists />}
            </MDBContainer>
        </Sidebar>
    )
}

export default RightSideBar