import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../../../Stylesheet/RecentAppointment.css';
import { GET_RECENT_APPOINTMENTS_DETAILS } from '../../../graphql/middleware';
import { useQuery } from '@apollo/client';
import { Table } from 'react-bootstrap';

export default function RecentAppointments() {
    const [key, setKey] = useState('recentappointments');
    const { loading, error, data } = useQuery(GET_RECENT_APPOINTMENTS_DETAILS, {
        variables: { limit: 4 } 
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='main-recentappointment-container mt-5 mb-5 border border-success d-flex flex-wrap'>
            <div className='appointments-container'>
                <Tabs id="appointments" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                    <Tab eventKey="recentappointments" title="Recent Appointments">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Time</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.getRecentAppointments.map((recentappointment) => (
                                    <tr key={recentappointment.appointmentDate + recentappointment.appointmentTime}>
                                        <td>{recentappointment.username}</td>
                                        <td>{recentappointment.appointmentTime}</td>
                                        <td>{recentappointment.appointmentDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="profile" title="Profile">
                        Tab content for Profile
                    </Tab>
                </Tabs>
            </div>
            <div className='stripe-container'>
                <h1>stripe</h1>
            </div>
        </div>
    );
}
