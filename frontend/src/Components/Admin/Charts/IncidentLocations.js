import React, { useEffect, useState } from 'react'
import ToastEmmiter from '../../Layout/ToastEmmiter'
import axios from 'axios'
import Chart from 'chart.js/auto';
import { Menu, Paper, TextField, MenuItem, Button, Typography } from '@mui/material';

import { toPng } from 'html-to-image';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const IncidentLocations = () => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({});

    const getMostIncidentsLocation = async () => {
        setLoading(true)
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/incident/incident-locations`, {
                withCredentials: true,
            });

            if (data.success) {
                setData(data.incidentLocations)
                setLoading(false)
            }

        } catch ({ response }) {
            console.log(response);
            return response
        }
    }

    useEffect(() => {
        getMostIncidentsLocation()
    }, [])


    useEffect(() => {
        // Get the chart canvas element
        const ctx = document.getElementById('barChart').getContext('2d');

        // Check if there's an existing chart instance and destroy it
        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
            existingChart.destroy();
        }

        // Create the chart
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(data),
                datasets: [
                    {
                        label: 'Locations',
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
        const printElement = document.getElementById('print');
        const imageDataUrl = await toPng(printElement)

        const location = Object.entries(data).reduce((a, [k, v]) => v > data[a] ? k : a, Object.keys(data)[0]);

        const totalSum = Object.values(data).reduce((acc, curr) => acc + curr, 0);

        // Calculate the percentage average of each location
        const percentages = {};
        for (const [location, count] of Object.entries(data)) {
            percentages[location] = (count / totalSum) * 100;
        }

        // Sort locations by percentage averages in descending order
        const sortedLocations = Object.entries(percentages)
            .sort(([, a], [, b]) => b - a);

        // Format the output
        const formattedOutput = sortedLocations
            .map(([location, percentage]) => `${location} = ${percentage.toFixed(2)}%`)
            .join(', ');

        const docDefinition = {
            content: [
                { text: 'Location incident rates', style: 'header' },
                { image: imageDataUrl, width: 500 },
                { text: "\n" + formattedOutput + "\n" },
                { text: `This specific area, located within ${location}, demonstrates a notably elevated incidence rate compared to other zones within the TUP-Taguig. The data underscores a distinct pattern of incidents occurring more frequently within this particular vicinity. Understanding the contributing factors within ${location} is crucial for devising targeted strategies to mitigate incidents and enhance overall safety measures within the TUP-Taguig. By addressing these factors comprehensively, the TUPT can create a safer and more conducive environment for its stakeholders` },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 20, 0, 10]
                }
            }
        };

        pdfMake.createPdf(docDefinition).download('locations-incident-rates.pdf');
    };



    const handlePrint = async () => {
        await generatePDF()
    }

    return (
        <Paper className='p-4 mt-2'>
            <Button onClick={handlePrint}>Print</Button>
            <div id='print'>
                <canvas id="barChart" />
                <Typography display={'none'}>asd</Typography>
            </div>
        </Paper>
    )
}

export default IncidentLocations