import React, { useEffect, useState, useRef } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBIcon,
    MDBBtn,
    MDBSc,
    MDBCardFooter,
    MDBInputGroup,
} from "mdb-react-ui-kit";
import axios from "axios";
import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";

import SideNav from "../Layout/SideNav";
import TopBar from "../Layout/TopBar";
import LeftMessage from "./LeftMessage";
import RightMessage from "./RightMessage";

import { accessChat } from "../../actions/chatActions";
import { getUser } from "../../utils/helper";
import RightSideBar from "./RightSideBar";
import { closeChatSideBar, openChatSideBar } from "../../actions/uiActions";


export default function Chat() {

    const dispatch = useDispatch()
    const { messages, chatInfo, selectedChat } = useSelector(state => state.chat);
    const selectedChatRef = useRef(selectedChat);
    const chat = useSelector(state => state.chat);
    const { isChatSideBarOpen } = useSelector(state => state.ui);
    const [currentMessage, setCurrentMessage] = useState('');
    const scrollableContainerRef = useRef(null);

    useEffect(() => {
        selectedChatRef.current = selectedChat;
    }, [selectedChat]);

    useEffect(() => {
        if (selectedChat) {
            socket.on('recieved-message', (message) => {
                dispatch(accessChat(selectedChatRef.current))
            })
            dispatch(accessChat(selectedChat))
        }
    }, [socket, selectedChat])

    const handleMessage = e => {
        setCurrentMessage(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!currentMessage) return;
    }

    const sendMessage = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/message/send`, {
                content: currentMessage,
                chatId: chatInfo._id,
            }, {
                withCredentials: true
            });
            setCurrentMessage('');
            socket.emit('send',
                JSON.stringify({
                    message: currentMessage,
                    recipient: selectedChat
                })
            )
        } catch ({ response }) {
            console.log(response);
            return response
        }
    }

    useEffect(() => {
        if (scrollableContainerRef.current) {
            // Scroll to the bottom when messages change
            scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        // Scroll to the bottom when component initially loads
        if (scrollableContainerRef.current) {
            scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
        }
    }, []);

    const openSideBar = () => {
        dispatch(openChatSideBar())
    }

    const closeSidebar = () => {
        dispatch(closeChatSideBar())
    }

    return (
        <>
            <div style={{ display: 'flex', height: '100vh' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <MDBContainer fluid className="" >
                        <MDBRow className="d-flex justify-content-start">
                            <MDBCol md="12" lg="12" xl="12" className="p-0">
                                <MDBCard style={{ borderRadius: 0, }}>
                                    <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
                                        <h5 className="mb-0">Chat</h5>
                                        {isChatSideBarOpen ?
                                            <div onClick={openSideBar}>
                                                <MDBIcon fas icon="arrow-circle-left" size="lg" style={{ cursor: 'pointer' }} />
                                            </div> :
                                            <div onClick={closeSidebar}>
                                                <MDBIcon fas icon="arrow-circle-right" size="lg" style={{ cursor: 'pointer' }} />
                                            </div>
                                        }
                                    </MDBCardHeader>
                                    <div
                                        ref={scrollableContainerRef}
                                        style={{ position: "relative", height: "500px", overflowY: 'scroll', overflowAnchor: 'auto' }}
                                    >
                                        {selectedChat ?
                                            <MDBCardBody>
                                                {messages && messages.map(message => {
                                                    if (message.sender === getUser()._id) {
                                                        return <RightMessage key={message._id} message={message} chatInfo={chatInfo} />
                                                    } else {
                                                        return <LeftMessage key={message._id} message={message} chatInfo={chatInfo} />
                                                    }
                                                })}
                                            </MDBCardBody> :
                                            <MDBCardBody className="text-center">
                                                Select your chat
                                            </MDBCardBody>
                                        }
                                    </div>
                                    <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
                                        {/* <img
                                            src="https://scontent-hkg1-1.xx.fbcdn.net/v/t39.30808-1/420496865_3300708546893951_7438322511956937688_n.jpg?stp=cp6_dst-jpg_p320x320&_nc_cat=109&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeHsSlY5iza_czmw61Bp6jj3VNcaLwWfTr9U1xovBZ9OvxZQzrgmkdYlawjSWlvlg_ojMfKHT5NDIDkeTd_OX-yz&_nc_ohc=PZ15lKXRyigAX8-greR&_nc_ht=scontent-hkg1-1.xx&oh=00_AfCrZRPmFjswXlSfRrUGXxoIFFhdmptyirt7ktje3i2g-g&oe=65CB3A3B"
                                            alt="avatar 3"
                                            style={{ width: "45px", height: "100%", borderRadius: '50%', marginRight: 10 }}
                                        /> */}
                                        <textarea
                                            type="text"
                                            name="message"
                                            onChange={handleMessage}
                                            className="form-control form-control-lg"
                                            placeholder="Type message"
                                            value={currentMessage}
                                            rows={1}
                                            style={{ border: 'none', resize: 'none' }}
                                        ></textarea>
                                        {/* <a className="ms-1 text-muted" href="#!">
                                            <MDBIcon fas icon="paperclip" />
                                        </a>
                                        <a className="ms-3 text-muted" href="#!">
                                            <MDBIcon fas icon="smile" />
                                        </a> */}
                                        <a className="ms-3" href="#!" onClick={sendMessage}>
                                            <MDBIcon fas icon="paper-plane" size="2x" />
                                        </a>
                                    </MDBCardFooter>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </main>
                <RightSideBar />
            </div>

        </>
    );
}