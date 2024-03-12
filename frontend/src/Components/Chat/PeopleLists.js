import React, { useEffect, useState } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCol,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
    MDBRow,
    MDBBadge,
    MDBBtn,
    MDBInput
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { selectChat } from '../../actions/chatActions';
import { openProfile } from '../../actions/uiActions';

const PeopleLists = () => {

    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);


    const getAllUsers = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/user/lists`, {
            withCredentials: true
        });
        setUsers(data.users);
        setAllUsers(data.users)
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const handleSearch = e => {
        const keyword = e.target.value;
        const regex = new RegExp(keyword, 'i');
        const filteredUsers = allUsers.filter(user => regex.test(`${user.firstname} ${user.lastname}`));
        setUsers(filteredUsers);
    };

    const handleSelectChat = (userID) => {
        dispatch(selectChat({
            id: userID
        }))
    }

    const handleViewProfile = (userId) => {
        dispatch(openProfile(userId))
    }


    return (
        <MDBRow>
            <MDBCol sm={12} className='mt-3'>
                <MDBInput label='Search' type='text' onChange={handleSearch} />
            </MDBCol>
            {users && users.map(user => {
                return <MDBCol className='mt-2' key={user._id}>
                    <MDBCard>
                        <MDBCardBody className='p-2 px-4'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='d-flex align-items-center'>
                                    {profileHead(user)}
                                    <div className='ms-3'>
                                        <p className='fw-bold mb-1'>{user.firstname} {user.lastname}</p>
                                        <p className='text-muted mb-0'>{user.email.length > 20 ? user.email.substring(0, 20) + '...' : user.email}</p>
                                    </div>
                                </div>
                                <MDBBadge pill className='text-capitalize' light color={
                                    user.role === 'student' ? 'warning' :
                                        user.role === 'parent' ? 'primary' :
                                            'success'
                                } >
                                    {user.role}
                                </MDBBadge>
                            </div>
                        </MDBCardBody>
                        <MDBCardFooter background='light' border='0' className='p-1 d-flex justify-content-around'>
                            <MDBBtn color='link' rippleColor='primary' className='text-reset m-0'
                                onClick={() => handleSelectChat(user._id)}
                            >
                                Message <MDBIcon fas icon='envelope' />
                            </MDBBtn>
                            <MDBBtn onClick={() => handleViewProfile(user._id)} color='link' rippleColor='primary' className='text-reset m-0'>
                                Profile <MDBIcon fas icon="user-circle" />
                            </MDBBtn>
                        </MDBCardFooter>
                    </MDBCard>
                </MDBCol>
            })}
        </MDBRow>
    )
}

const profileHead = (kaChatKo) => {
    return kaChatKo.avatar ? <img
        src={kaChatKo.avatar?.url}
        alt=''
        style={{ width: '45px', height: '45px' }}
        className='rounded-circle'
    /> :
        <div className='d-flex align-content-center justify-content-center' style={{ width: "45px", height: "45px", borderRadius: '50%', backgroundColor: 'lightblue', marginTop: -5 }}>
            <span style={{ lineHeight: "45px", fontSize: 18 }}>
                {kaChatKo.firstname.charAt(0)}{kaChatKo.lastname.charAt(0)}
            </span>
        </div >
}

export default PeopleLists