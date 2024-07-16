import React from 'react'
import { FiSend } from 'react-icons/fi';

const Form = ({ name, email, message, submitMessage, handleChange }) => {
  return (
    <div className='px-10 py-4 h-auto min-w-[600px]'>
      <form onSubmit={submitMessage} className='flex flex-col gap-10 text-xl'>
        {/* Username */}
        <input
          type="text"
          value={name}
          onChange={handleChange}
          className='bg-transparent border-b-2 p-2 outline-none w-full focus:border-b-2'
          placeholder='Username'
        />
        <input
          type="email"
          value={email}
          onChange={handleChange}
          className='bg-transparent border-b-2 p-2 outline-none w-full focus:border-b-2'
          placeholder='Email'
        />
        <textarea
          id="message"
          name="message"
          className="bg-transparent resize-none outline-none border border-1 p-2"
          rows="10"
          cols="50"
          value={message}
          onChange={handleChange}
          placeholder='Message'
        />
        {/* Submit Button */}
        <button className='flex gap-2 items-center w-[200px] border p-2'>
          <FiSend />Send Message
        </button>
      </form>
    </div>
  )
}

export default Form;
