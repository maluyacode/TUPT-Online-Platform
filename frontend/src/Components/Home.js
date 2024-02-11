import React from 'react'
import SideNav from './Layout/SideNav'
import TopBar from './Layout/TopBar'

const Home = () => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <SideNav />
            <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                <TopBar />
                <div>
                    Home page
                </div>
            </main>
        </div>
    )
}

export default Home