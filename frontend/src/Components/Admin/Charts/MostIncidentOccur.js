import React, { useEffect, useState } from 'react'
import ToastEmmiter from '../../Layout/ToastEmmiter'
import axios from 'axios'
import Chart from 'chart.js/auto';
import { Menu, Paper, TextField, MenuItem, Button } from '@mui/material';

import { toPng } from 'html-to-image';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
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


    const generatePDF = async () => {
        const printElement = document.getElementById('polarChart');
        const imageDataUrl = await toPng(printElement)

        const totalIncidents = Object.values(data).reduce((acc, curr) => acc + curr, 0);

        // Compute the percentage for each incident type
        const percentages = {};
        for (const [incidentType, count] of Object.entries(data)) {
            percentages[incidentType] = (count / totalIncidents) * 100;
        }

        const predominantIncident = Object.entries(percentages)
            .reduce((maxIncident, currentIncident) => currentIncident[1] > maxIncident[1] ? currentIncident : maxIncident, ['', 0]);

        // Format the output
        const formattedOutput = Object.entries(percentages)
            .map(([incidentType, percentage]) => `${incidentType} = ${percentage.toFixed(2)}%`)
            .join(', ');



        const docDefinition = {
            content: [
                { text: 'Incident Rates', style: 'header' },
                { image: imageDataUrl, width: 500 },
                { text: "\n" + formattedOutput + "\n\n" },
                {
                    text: `The incident rates within the school setting reveal ${predominantIncident[0]} as the predominant concern, constituting ${predominantIncident[1]}% of all incidents. This highlights the urgency for targeted interventions and proactive measures to address this specific safety issue within the school premises. By prioritizing resources and implementing effective strategies to mitigate ${predominantIncident[0]}, schools can enhance safety protocols and foster a secure environment for students and staff.`
                },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 20, 0, 10]
                }
            }
        };

        pdfMake.createPdf(docDefinition).download(`most-incident-occur=${new Date().toLocaleDateString()}.pdf`);
    };



    const handlePrint = async () => {
        await generatePDF()
    }

    return (
        <Paper className='p-4'>
            <Button onClick={handlePrint}>Print</Button>
            <canvas id="polarChart" />
        </Paper>
    )
}

export default MostIncidentsOccur