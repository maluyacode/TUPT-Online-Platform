import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";

import SideNav from "../Layout/SideNav";
import TopBar from "../Layout/TopBar";
import LeftMessage from "./LeftMessage";
import RightMessage from "./RightMessage";

import { accessChat } from "../../actions/chatActions";


export default function Chat() {

    const dispatch = useDispatch()
    const { messages, chatInfo } = useSelector(state => state.chat);

    useEffect(() => {
        dispatch(accessChat('65c74231dc0531150fb527a6'))
    }, [])

    

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
                                        {/* <MDBBtn color="primary" size="sm" rippleColor="dark">
                                            Let's Chat App
                                        </MDBBtn> */}
                                    </MDBCardHeader>
                                    <div
                                        // suppressScrollX
                                        style={{ position: "relative", height: "500px", overflowY: 'scroll', }}
                                    >
                                        <MDBCardBody>
                                            {messages && messages.map(message => {
                                                if (message.sender === '65c747cadc0531150fb527b1') {
                                                    return <RightMessage key={message._id} message={message} chatInfo={chatInfo} />
                                                } else {
                                                    return <LeftMessage key={message._id} message={message} chatInfo={chatInfo} />
                                                }
                                            })}
                                        </MDBCardBody>
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
                                            className="form-control form-control-lg"
                                            id="exampleFormControlInput1"
                                            placeholder="Type message"
                                            rows={1}
                                            style={{ border: 'none', resize: 'none' }}
                                        ></textarea>
                                        {/* <a className="ms-1 text-muted" href="#!">
                                            <MDBIcon fas icon="paperclip" />
                                        </a>
                                        <a className="ms-3 text-muted" href="#!">
                                            <MDBIcon fas icon="smile" />
                                        </a> */}
                                        <a className="ms-3" href="#!">
                                            <MDBIcon fas icon="paper-plane" size="2x" />
                                        </a>
                                    </MDBCardFooter>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </main>
            </div>

        </>
    );
}