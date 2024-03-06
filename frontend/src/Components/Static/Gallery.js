import React from 'react';
import {
    MDBContainer,
    MDBCol,
    MDBRow,
} from 'mdb-react-ui-kit';

export default function Gallery() {
    return (
        <MDBRow>
            <MDBCol lg={4} md={12} className='mb-4 mb-lg-0'>
                <img
                    src='/tupt-images/1.jpg'
                    className='w-100 shadow-1-strong rounded mb-4'
                    alt='Boat on Calm Water'
                />

                <img
                    src='/tupt-images/2.jpg'
                    className='w-100 shadow-1-strong rounded mb-4'
                    alt='Wintry Mountain Landscape'
                />
            </MDBCol>

            <MDBCol lg={4} className='mb-4 mb-lg-0'>
                <img
                    src='/tupt-images/3.jpg'
                    className='w-100 shadow-1-strong rounded mb-4'
                    alt='Mountains in the Clouds'
                />

                <img
                    src='/tupt-images/4.jpg'
                    className='w-100 shadow-1-strong rounded mb-4'
                    alt='Boat on Calm Water'
                />
            </MDBCol>

            <MDBCol lg={4} className='mb-4 mb-lg-0'>
                <img
                    src='/tupt-images/5.jpg'
                    className='w-100 shadow-1-strong rounded mb-4'
                    alt='Waves at Sea'
                />

                <img
                    src='/tupt-images/6.jpg'
                    className='w-100 shadow-1-strong rounded mb-4'
                    alt='Yosemite National Park'
                />
            </MDBCol>
        </MDBRow>
    );
}