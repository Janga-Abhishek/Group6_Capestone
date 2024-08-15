import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../../../Stylesheet/RecentAppointment.css';
import { GET_RECENT_APPOINTMENTS_DETAILS, GET_RECENT_REGISTERED_USERS,GET_STRIPE_PAYMENT_SUMMARY } from '../../../graphql/middleware';
import { useQuery } from '@apollo/client';
import { Table } from 'react-bootstrap';

export default function RecentAppointments() {
    const [key, setKey] = useState('recentappointments');
    
    // Fetch recent appointments
    const { loading: appLoading, error: appError, data: appData } = useQuery(GET_RECENT_APPOINTMENTS_DETAILS, {
        variables: { limit: 4 }
    });

    // Fetch recent registered users
    const { loading: userLoading, error: userError, data: userData } = useQuery(GET_RECENT_REGISTERED_USERS, {
        variables: { limit: 5 }
    });
    
    const{loading:stripeLoading,error:stripeError,data:stripeData}=useQuery(GET_STRIPE_PAYMENT_SUMMARY);

    if (appLoading || userLoading || stripeLoading) return <p>Loading...</p>;
    if (appError) return <p>Error loading appointments: {appError.message}</p>;
    if (userError) return <p>Error loading users: {userError.message}</p>;
    if (stripeError) return <p>Error loading stripe payment: {userError.message}</p>;

    return (
        <div className='main-recentappointment-container mt-5 mb-5 d-flex flex-wrap mx-auto'>
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
                                {appData.getRecentAppointments.map((recentappointment) => (
                                    <tr key={recentappointment.appointmentDate + recentappointment.appointmentTime}>
                                        <td>{recentappointment.username}</td>
                                        <td>{recentappointment.appointmentTime}</td>
                                        <td>{recentappointment.appointmentDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="recentusers" title="Recent Users">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData.getRecentRegisteredUsers.map((recentuser) => (
                                    <tr key={recentuser.email}>
                                        <td>{recentuser.firstname + ' ' + recentuser.lastname}</td>
                                        <td>{recentuser.email}</td>
                                        <td>{recentuser.registeredDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Tab>
                </Tabs>
            </div>
            <div className='stripe-container text-white'>
                <h1 className='text-center'>Total Earnings</h1>
                <h4 className='payment-text '>{stripeData.getStripeTransactionAmount.toFixed(2)}</h4>
            </div>
        </div>
    );
}
