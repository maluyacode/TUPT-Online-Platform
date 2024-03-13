import React, { useEffect, useState } from 'react'
import MetaData from '../Layout/MetaData'
import SideNav from '../Layout/SideNav'
import TopBar from '../Layout/TopBar'
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import { Button, Paper, TextField, Typography } from '@mui/material'
import ToastEmmiter from '../Layout/ToastEmmiter'
import Block from '../Layout/Loaders/Block'
import axios from 'axios'
import CreatableSelect from 'react-select/creatable';

const ReportIncident = () => {

    const [loading, setLoading] = useState(false)
    const [locations, setLocations] = useState([]);
    const [types, setTypes] = useState([]);

    const report = async (formData) => {
        setLoading(true)
        try {

            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/incident/report`, formData, {
                withCredentials: true,
            });
            setLoading(false)

            if (data.success) {
                ToastEmmiter.success(data.message);
            }

        } catch ({ response }) {
            console.log(response);
            return response
        }
    }

    const getReports = async () => {
        setLoading(true)
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/incident/get-all`, {
                withCredentials: true,
            });

            console.log(data)
            setLocations(data.locations)
            setTypes(data.types)
            setLoading(false)

        } catch ({ response }) {
            console.log(response);
            return response
        }
    }

    const submitReport = e => {
        e.preventDefault()
        const formData = new FormData(e.target);
        e.target.reset()
        report(formData)
    }

    useEffect(() => {
        getReports()
    }, [])

    return (
        <>
            <Block loading={loading} />
            <MetaData pageTitle="Report" />
            <div style={{ display: 'flex', height: '100vh' }}>
                <SideNav />
                <main style={{ padding: 10 }} className='shadow-6-strong  w-100'>
                    <TopBar />
                    <MDBContainer >
                        <MDBRow className='pt-3'>

                            <MDBCol className='d-flex justify-content-center'>
                                <Paper onSubmit={submitReport} component={'form'} className='p-3 d-flex flex-column gap-3' sx={{ width: '100%', maxWidth: 700 }} >
                                    <Typography variant='h5'>Report</Typography>
                                    {/* <TextField name='location' required fullWidth label='Location of the incident' size='small' /> */}
                                    <TextField name='incident_date' required type='date' fullWidth label='When it happen?' size='small' InputLabelProps={{
                                        shrink: true
                                    }} inputProps={{
                                        max: new Date().toISOString().split('T')[0]
                                    }} />
                                    <CreatableSelect required name='location' placeholder='Location of the incident' isClearable options={locations} />
                                    <CreatableSelect required name='type' placeholder='What type of incident?' isClearable options={types} />
                                    <TextField name='description' required multiline rows={4} fullWidth placeholder='Descibe the incident' size='small' />
                                    <Button type='submit' variant='contained'>Submit</Button>
                                </Paper>
                            </MDBCol>

                        </MDBRow>
                    </MDBContainer>

                </main >

            </div >
        </>
    )
}

export default ReportIncident