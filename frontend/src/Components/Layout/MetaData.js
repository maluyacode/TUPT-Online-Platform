import React from 'react'
import { Helmet } from 'react-helmet'

const MetaData = ({ pageTitle = '' }) => {
    return (
        <Helmet>
            <title>{pageTitle} | TUPT-Platform</title>
        </Helmet>
    )
}

export default MetaData