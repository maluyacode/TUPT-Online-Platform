import React from 'react'
import { Blocks, Audio, FidgetSpinner } from 'react-loader-spinner'


const Block = ({ loading }) => {
    return (
        <Blocks
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="blocks-loading"
            wrapperStyle={{
                position: 'absolute',
                top: '45%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'transparent',
                zIndex: 1,
            }}
            wrapperClass=""
            visible={loading}
        />
    )
}

export default Block