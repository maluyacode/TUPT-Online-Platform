import React, { useEffect, useState } from 'react'
import ToastEmmiter from '../../Layout/ToastEmmiter'
import axios from 'axios'
import Chart from 'chart.js/auto';
import { Menu, Paper, TextField, MenuItem } from '@mui/material';

const MostIncidentsOccur = () => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({});

    const getMostIncidentsOccur = async () => {
        setLoading(true)
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/incident/most-incidents-occur`, {
                withCredentials: true,
            });

            if (data.success) {
                setData(data.countIncidents)
                setLoading(false)
            }

        } catch ({ response }) {
            console.log(response);
            return response
        }
    }

    useEffect(() => {
        getMostIncidentsOccur()
    }, [])


    useEffect(() => {
        // Get the chart canvas element
        const ctx = document.getElementById('polarChart').getContext('2d');

        // Check if there's an existing chart instance and destroy it
        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
            existingChart.destroy();
        }

        // Create the chart
        new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: Object.keys(data),
                datasets: [
                    {
                        label: 'Incident Rates',
                        data: Object.values(data),
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(75, 192, 192)',
                            'rgb(255, 205, 86)',
                            'rgb(201, 203, 207)',
                            'rgb(54, 162, 235)'
                        ]
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

    return (
        <Paper className='p-4'>
            <canvas id="polarChart" />
        </Paper>
    )
}

export default MostIncidentsOccur