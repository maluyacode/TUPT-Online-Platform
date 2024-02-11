import React from 'react'
import colors from '../../data/colors.json'

const RightMessage = ({ message, chatInfo }) => {

    const { content, sender } = message
    const { participants } = chatInfo;
    const indexColor = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
    const avatarColor = colors.hexColors[indexColor];

    const avatar = participants.reduce((accumulator, participant) => {
        if (participant._id === sender) {
            return participant.avatar ? <img
                src={participant.avatar?.url}
                alt="avatar 1"
                style={{ width: "45px", height: "100%", borderRadius: '50%' }}
            /> :
                <div className='d-flex align-content-center justify-content-center' style={{ width: "45px", height: "45px", borderRadius: '50%', backgroundColor: 'lightgreen', marginTop: -5 }}>
                    <span style={{ lineHeight: "45px", fontSize: 18 }}>
                        {participant.firstname.charAt(0)}{participant.lastname.charAt(0)}
                    </span>
                </div >
        }
        return accumulator; // Important: return the accumulator if the condition isn't met
    }, null); // Provide an initial value for the accumulator, e.g., null

    return (
        <>
            <div className="d-flex flex-row justify-content-end mb-2 pt-1">
                <div>
                    <p className="small text-center p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                        {content}
                    </p>
                    {/* <p className="small me-4 mb-3 rounded-3 text-muted d-flex justify-content-end">
                        00:06
                    </p> */}
                </div>
                {avatar}
            </div>
            {/* <div className="divider d-flex align-items-center justify-content-center mb-4">
                <p
                    className="text-center mx-3 mb-0"
                    style={{ color: "#a2aab7" }}
                >
                    Today
                </p>
            </div> */}
        </>
    )
}

export default RightMessage