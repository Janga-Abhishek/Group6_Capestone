import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from 'react';
import '../../../Stylesheet/AdminDashboard.css'
Chart.register(...registerables);

export const GET_COUNTS = gql`
  query GetCounts {
    doctorsCount
    appointmentsCount
    usersCount
  }
`;

export default function PieChart() {
    const { loading, error, data } = useQuery(GET_COUNTS);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (!loading && data) {
            const { doctorsCount, appointmentsCount, usersCount } = data;
            setChartData({
                labels: ['Doctors', 'Appointments', 'Patients'],
                datasets: [
                    {
                        data: [doctorsCount, appointmentsCount, usersCount],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        hoverOffset: 4
                    }
                ]
            });
        }
    }, [loading, data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            {chartData && <Pie data={chartData} />}
        </div>
    );
}
