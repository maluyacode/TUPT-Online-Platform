import React from 'react'
import SideNav from '../../Layout/SideNav'
import TopBar from '../../Layout/TopBar'
import { MDBContainer, MDBRow } from 'mdb-react-ui-kit'

const AnnouncementManagement = () => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <SideNav />
            <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                <TopBar />
                <MDBContainer fluid>
                    <MDBRow className='mt-3 '>

                    </MDBRow>
                </MDBContainer>
            </main>
        </div>
    )
}

export default AnnouncementManagement