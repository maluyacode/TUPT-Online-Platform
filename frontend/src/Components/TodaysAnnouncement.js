import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAnnouncements } from '../api/announcementsAPI';
import ToastEmmiter from './Layout/ToastEmmiter';
import { Box } from '@mui/material';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import CalendarMonth from '@mui/icons-material/CalendarMonth';

const TodaysAnnouncement = () => {

    const navigate = useNavigate();

    const [announcements, setAnnouncements] = useState([]);

    const getAllAnnouncemets = async () => {

        const { data } = await getAnnouncements({ today: true });

        if (data.success) {
            setAnnouncements(data.announcements);
        } else {
            ToastEmmiter.error('Error occured', 'top-right');
        }
    }

    useEffect(() => {
        getAllAnnouncemets()
    }, [])


    return (
        <Box sx={{ py: 1, px: 1, overflowY: 'auto', maxHeight: '500px' }}>
            {announcements.map((announcement, i) => (
                <MDBCard key={`announcement${i}`} onClick={() => navigate(`/announcement-details/${announcement._id}`)} style={{ cursor: 'pointer', backgroundColor: '#FFF2F2' }} className='mb-2'>
                    <MDBRow className='g-0'>
                        <MDBCol md='3' sm='3' xs='3'>
                            <MDBCardImage style={{ height: 150, width: 150, objectFit: 'cover' }} src={announcement.images[0]?.url || '/bullhorn.svg'} fluid />
                        </MDBCol>
                        <MDBCol md='9' sm='9' xs='9'>
                            <MDBCardBody className='ps-2'>
                                <MDBCardTitle>{announcement.title}</MDBCardTitle>
                                <MDBCardText>
                                    {announcement.content.substring(0, 50) + '...'}
                                </MDBCardText>
                                <MDBCardText className='d-flex gap-1'>
                                    <CalendarMonth /> <span>{formatedDate(announcement.createdAt, announcement.updatedAt)}</span>
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            ))}
        </Box>
    )
}

function formatedDate(createdAt, updatedAt) {
    const now = new Date();
    const createdDate = new Date(updatedAt);
    const elapsedMilliseconds = now - createdDate;

    const minutes = Math.floor(elapsedMilliseconds / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    let textIndication = ''

    if (createdAt !== updatedAt) {
        textIndication = 'Edited';
    }

    if (months > 0) {
        return months === 1 ? `${textIndication} ${months}m ago` : `${textIndication} ${months}mos ago`;
    } else if (days > 0) {
        return days === 1 ? `${textIndication} ${days}d ago` : `${textIndication} ${days}d ago`;
    } else if (hours > 0) {
        return hours === 1 ? `${textIndication} ${hours}h ago` : `${textIndication} ${hours}h ago`;
    } else {
        return minutes <= 1 ? `${textIndication} Just now` : `${textIndication} ${minutes}m ago`;
    }
}

export default TodaysAnnouncement