import { SLR } from 'ml-regression';
const data = [
    {
        date: '2023-01-01',
        time: '08:00:00',
        location: 'Hallway',
        type: 'Bullying',
        weather: 'Clear',
        schoolEvent: 'None',
        attendance: 300,
        demographics: {
            age: 15,
            grade: 10,
            gender: 'Male',
        },
        securityMeasures: {
            cctv: true,
            securityGuards: 2,
            accessControl: true,
        },
        responseTime: '00:05:00',
    },
    {
        date: '2023-01-02',
        time: '12:30:00',
        location: 'Cafeteria',
        type: 'Vandalism',
        weather: 'Rain',
        schoolEvent: 'None',
        attendance: 250,
        demographics: {
            age: 16,
            grade: 11,
            gender: 'Female',
        },
        securityMeasures: {
            cctv: true,
            securityGuards: 2,
            accessControl: true,
        },
        responseTime: '00:07:00',
    },
    // Add more incident data as needed
];
const trainLinearRegressionModel = () => {
    // Prepare the data
    const incidentsByDay = data.reduce((acc, curr) => {
        const date = new Date(curr.date);
        const day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        if (!acc[day]) {
            acc[day] = { incidents: 0, attendanceTotal: 0, count: 0 };
        }
        acc[day].incidents += 1;
        acc[day].attendanceTotal += curr.attendance;
        acc[day].count += 1;
        return acc;
    }, {});

    // Convert the data to arrays for the regression model
    const dates = Object.keys(incidentsByDay);
    const incidents = dates.map((date) => incidentsByDay[date].incidents);
    const attendanceAvg = dates.map(
        (date) => incidentsByDay[date].attendanceTotal / incidentsByDay[date].count
    );

    // Train the linear regression model
    const regressionModel = new SLR(attendanceAvg, incidents);

    return regressionModel;
};

// Train the model using the fake incident data
const regressionModel = trainLinearRegressionModel();
console.log(regressionModel)

export default regressionModel;
