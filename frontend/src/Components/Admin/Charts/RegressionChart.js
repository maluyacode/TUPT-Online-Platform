import React from 'react';
import Chart from 'chart.js/auto';

const RegressionChart = () => {
    // Fake data for predicted and actual incidents
    const predictedIncidents = [10, 20, 11, 40, 50, 60, 26, 15, 13, 10];
    const actualIncidents = [12, 18, 10, 35, 45, 55, 17, ];

    React.useEffect(() => {
        // Get the chart canvas element
        const ctx = document.getElementById('lineChart').getContext('2d');

        // Create the chart
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
                datasets: [
                    {
                        label: 'Predicted Incidents',
                        data: predictedIncidents,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                    },
                    {
                        label: 'Actual Incidents',
                        data: actualIncidents,
                        borderColor: 'rgb(192, 75, 75)',
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
    }, []);

    return <canvas id="lineChart" />;
};

export default RegressionChart;
