import React, { useEffect, useState } from 'react'
import ToastEmmiter from '../../Layout/ToastEmmiter'
import axios from 'axios'
import Chart from 'chart.js/auto';
import { Menu, Paper, TextField, MenuItem, Button } from '@mui/material';

import { toPng } from 'html-to-image';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

    const generatePDF = async () => {
        const printElement = document.getElementById('lineChart');
        const imageDataUrl = await toPng(printElement)

        const maxRate = Math.max(...Object.values(data));

        // Find the months with the highest incident rates
        const highestMonths = Object.entries(data)
            .filter(([month, rate]) => rate === maxRate)
            .map(([month, rate]) => month);

        const docDefinition = {
            content: [
                { text: `Monthly incident rates year ${year}`, style: 'header' },
                { image: imageDataUrl, width: 500 },
                { text: `The chart provides a detailed depiction of incident rates observed monthly during the specified year, spanning from January ${year} to December ${year}. This comprehensive visualization offers valuable insights into the temporal distribution of incidents, enabling stakeholders to identify trends, patterns, and potential areas of concern. Upon analysis, it is evident that the highest incident rates were observed during ${highestMonths}, indicating periods of heightened activity and potential areas for targeted interventions. By leveraging this information, stakeholders can devise effective strategies to address these challenges and enhance safety and security measures within the community.` },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 20, 0, 10]
                }
            }
        };

        pdfMake.createPdf(docDefinition).download(`monthly-incident-rates-${year}.pdf`);
    };

    const handlePrint = async () => {
        await generatePDF()
    }

    return (
        <Paper className='p-4' sx={{ maxHeight: 500 }}>
            <Button onClick={handlePrint}>Print</Button>
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