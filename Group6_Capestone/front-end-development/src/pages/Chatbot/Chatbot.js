import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { RiChatNewFill,RiChatOffFill } from "react-icons/ri";
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../graphql/middleware';


const FetchUsers = () => {
    const { loading, error, data } = useQuery(GET_USERS);
  
    if (loading) {
      return 'Loading users...';
    }
    if (error) {
      console.error('Error fetching users:', error);
      return 'Sorry, there was an error fetching users. Please try again later.';
    }
  
    // Format user data for display
    const userList = data.users.map(user => `${user.firstname} ${user.lastname}`).join('\n');
  
    return `Here are the users: ${userList}`;
  };

  
  export default function Chatbot({loggedInUser}) {
    const [toggleChatBot, setToggleChatBot]=useState(false);
    const handleToggleChatBot=() =>{
        setToggleChatBot(!toggleChatBot)
    }


const steps = [
//   {
//     id: '0',
//     message: 'Welcome to react chatbot!',
//     trigger: '1',
//   },
  {
    id: '1',
    message: `Hey ${loggedInUser} How can I help you today?`,
    trigger: '2',
  },
  {
    id: '2',
    options: [
      { value: 'book', label: 'Book an appointment', trigger: 'book' },
      { value: 'cancel', label: 'Cancel an appointment', trigger: 'cancel' },
      { value: 'users', label: 'Get user information', trigger: 'get-users' }, 
      { value: 'end', label: 'Exit', trigger: 'bye' }
    ],
  },
  {
    id:'get-users',
    message:'Fetching the Details',
    trigger:'fetch-users',

  },
  {
    id:'fetch-users',
    component: <FetchUsers />,
    asMessage: true,
    trigger:'2'
  },
  {
    id: 'book',
    message: 'Please provide details for your appointment.',
    trigger: 'book-details',
  },
  {
    id: 'book-details',
    user: true,
    trigger: 'booked',
  },
  {
    id: 'booked',
    message: 'Appointment booked successfully!',
    trigger: 'bye',
  },
  {
    id: 'cancel',
    message: 'Please provide the ID of the appointment you want to cancel.',
    trigger: 'cancel-details',
  },
  {
    id: 'cancel-details',
    user: true,
    trigger: 'canceled',
  },
  {
    id: 'canceled',
    message: 'Appointment canceled successfully!',
    trigger: 'bye',
  },
  {
    id: 'bye',
    message: 'See You! Please feel free to contact me.',
    end: true,
  }
];

  return (
    <div>
    <button className='btn btn-primary' style={{ position: 'fixed', bottom: '60px', right: '20px', zIndex: 999 }} onClick={handleToggleChatBot}>
        {toggleChatBot ? <RiChatOffFill style={{ fontSize: '24px' }} /> : <RiChatNewFill style={{ fontSize: '24px' }} />}
    </button>
    {toggleChatBot && <ChatBot steps={steps} />}
</div>
  );
}
