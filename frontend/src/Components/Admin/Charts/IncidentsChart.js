import React, { useEffect, useState } from 'react'
import ToastEmmiter from '../../Layout/ToastEmmiter'
import axios from 'axios'
import Chart from 'chart.js/auto';
import { Menu, Paper, TextField, MenuItem } from '@mui/material';

const IncidentsChart = () => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({});
    const [year, setYear] = useState(2024);

    const getIncidentsByMonth = async (formData) => {
        setLoading(true)
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/incident/by-month?year=${year}`, {
                withCredentials: true,
            });

            if (data.success) {
                setData(data.incidentsByMonth)
                setLoading(false)
            }

        } catch ({ response }) {
            console.log(response);
            return response
        }
    }

    useEffect(() => {
        getIncidentsByMonth()
    }, [year])


    useEffect(() => {
        // Get the chart canvas element
        const ctx = document.getElementById('lineChart').getContext('2d');

        // Check if there's an existing chart instance and destroy it
        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
            existingChart.destroy();
        }

        // Create the chart
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: Object.keys(data),
                datasets: [
                    {
                        label: 'Incident Rates',
                        data: Object.values(data),
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }, [data]);


    const handleYear = (e) => {
        setYear(e.target.value)
        getIncidentsByMonth()
    }

    return (
        <Paper className='p-4' sx={{ maxHeight: 400 }}>
            <TextField
                id="outlined-select-currency"
                select
                label="Select Year"
                fullWidth
                value={year}
                size='small'
                onChange={handleYear}
            >
                {getYears().map((value) => (
                    <MenuItem key={value} value={value}>
                        {value}
                    </MenuItem>
                ))}
            </TextField>
            <canvas id="lineChart" />
        </Paper>
    )
}

const getYears = () => {

    const years = [];
    for (let i = 2000; i <= 2024; i++) {
        years.push(i);
    }
    return years
}

export default IncidentsChart