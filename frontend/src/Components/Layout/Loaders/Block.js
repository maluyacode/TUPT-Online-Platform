import React from 'react'
import { Blocks, Audio, FidgetSpinner } from 'react-loader-spinner'
import Backdrop from '@mui/material/Backdrop';


const Block = ({ loading }) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        // onClick={handleClose}
        >
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
        </Backdrop>
    )
}

export default Block