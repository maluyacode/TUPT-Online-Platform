import React from 'react'
import { Helmet } from 'react-helmet'

const MetaData = ({ pageTitle = '' }) => {
    return (
        <Helmet>
            <title>{pageTitle} | TUPT-Platform</title>
            <link rel="icon" type="image/png" href='/tupt-logo.png' />
        </Helmet>
    )
}

export default MetaData