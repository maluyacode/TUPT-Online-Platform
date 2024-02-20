import React from 'react'
import MetaData from '../Layout/MetaData'
import SideNav from '../Layout/SideNav'
import TopBar from '../Layout/TopBar'
import { MDBContainer } from 'mdb-react-ui-kit'

const AnnoncementDetails = () => {
    return (
        <>
            <MetaData pageTitle="Announcements" />
            <div style={{ display: 'flex', height: '100vh' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <MDBContainer style={{ maxWidth: 1000 }} className='mt-4'>

                    </MDBContainer>
                </main>
            </div>
        </>
    )
}

export default AnnoncementDetails