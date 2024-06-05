import { Bar, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from 'react';

Chart.register(...registerables);

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      registeredDate
    }
  }
`;

const BarChart = () => {
    const { loading, error, data } = useQuery(GET_USERS);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        console.log("data is"+JSON.stringify(data));
        if (!loading && data) {
            const users = data.users;
            console.log("data inside is"+JSON.stringify(users));
            const months = Array(12).fill(0);

            users.forEach(user => {
                const joinedMonth = new Date(user.registeredDate).getMonth();
                months[joinedMonth]++;
            });

            setChartData({
                labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
                datasets: [
                    {
                        label: 'Patients joined each month',
                        data: months,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: '#E87F83',
                        borderWidth: 3,
                    }
                ]
            });
        }
    }, [loading, data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            {chartData && <Bar data={chartData} />}
        </div>
    );
}

export default BarChart;
