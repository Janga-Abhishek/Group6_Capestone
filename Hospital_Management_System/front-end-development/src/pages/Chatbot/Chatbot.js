import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { RiChatNewFill, RiChatOffFill } from "react-icons/ri";
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

export default function Chatbot({ loggedInUser }) {
    const [toggleChatBot, setToggleChatBot] = useState(false);
    const handleToggleChatBot = () => {
        setToggleChatBot(!toggleChatBot);
    }

    const steps = [
        {
            id: '1',
            message: `Hey ${loggedInUser}, How can I help you today?`,
            trigger: '2',
        },
        {
            id: '2',
            options: [
                { value: 'book', label: 'Book an appointment', trigger: 'book' },
                { value: 'upload', label: 'Upload Prescription', trigger: 'upload' },
                { value: 'end', label: 'Exit', trigger: 'end' }
            ],
        },
        {
            id: 'book',
            message: `1. Login to your account \n 2. Select appointments in navbar \n 3. Select the options and click on "Book Appointment" \n 4. You can check your upcoming appointments by clicking on the link below.`,
            trigger: '2',
        },
        {
          id: 'upload',
          message: `1. Login to your account \n 2. Select upload prescription in navbar \n 3. choose file to upload and click on "upload" \n 4. Your can check your list of the prescription by clicking on the details.`,
          trigger: '2',       
        },
        {
            id: 'end',
            message: 'Hope, I was helpful! If you need further assistance, please feel free to reach out.',
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
