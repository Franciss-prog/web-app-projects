"use client"
import React, { useState } from 'react'
import Form from './Form'
import submitMessage from '../functions/submitMessage'
const Contacts = () => {
  // user State
  const [userData, setUserData] = useState({
      name: "",
      email : "",
      message: "",
  })

  // onsubmit the message
  const onSubmit = async(e) => {
    try {
      e.preventDefault();
      await submitMessage(userData.name, userData.email, userData.message);
    } catch (error) {
      
    }

  }
  return (
    <main className="h-screen flex justify-center items-center flex-col" id='contacts'>
        <span className='text-6xl mb-[127px]'>LET'S COLLAB</span>
        {/* conatiner */}
        
        <Form submitMessage={onSubmit} 
        name={userData.name} 
        email={userData.email} 
        message={userData.message}/>
    </main>
  )
}

export default Contacts