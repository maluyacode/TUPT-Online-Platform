import React, { useEffect } from 'react';
import { MDBBadge, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux'

import { chatLists as getChats, selectChat } from '../../actions/chatActions';
import { getUser } from '../../utils/helper'
import { socket } from '../../socket';
export default function ChatLists() {

    const dispatch = useDispatch();
    const { chatLists } = useSelector(state => state.chat);

    useEffect(() => {
        dispatch(getChats());
    }, [])

    const handleSelectChat = (userID) => {
        dispatch(selectChat({
            id: userID
        }))
    }

    useEffect(() => {
        socket.on('recieved-message', () => {
            dispatch(getChats());
        })
    }, [])

    return (
        <MDBListGroup style={{ minWidth: '22rem' }} light className='pe-0'>
            {chatLists && chatLists.map(chat => {
                const hasNewMessage = !chat.lastMessage?.readBy.includes(getUser()._id)
                return (
                    <MDBListGroupItem action className='d-flex justify-content-between align-items-center px-4' style={{ cursor: 'pointer' }}
                        key={chat._id}
                        onClick={() => handleSelectChat(myKaChat(chat.participants)._id)}
                    >
                        <div className='d-flex align-items-center'>
                            {profileHead(chat.participants)}
                            <div className='ms-3'>
                                <p className={`mb-1 ${hasNewMessage ? 'fw-bold ' : 'text-muted '}`}>{`${myKaChat(chat.participants).firstname} ${myKaChat(chat.participants).lastname}`}</p>
                                <p className={`mb-0 d-flex ${hasNewMessage ? 'fw-bold ' : 'text-muted '}`}>{anylastMessage(chat)}</p>
                            </div>
                        </div>
                        <MDBBadge pill light color='success'>
                            new
                        </MDBBadge>
                    </MDBListGroupItem>
                )
            })}
        </MDBListGroup >
    );
}

const myKaChat = (participants) => {
    return participants.find(participant => participant._id !== getUser()._id)
}

const anylastMessage = (chat) => {
    if (!chat.lastMessage) {
        return 'hala wala'
    }
    if (chat.lastMessage.sender._id === getUser()._id) {
        return `You: ${chat.lastMessage.content}`
    } else {
        return `${chat.lastMessage.content}`
    }
}

const profileHead = (participants) => {
    const kaChatKo = participants.find(participant => participant._id !== getUser()._id)
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