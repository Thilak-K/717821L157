import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios'; 
import './client.css';

const Client = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    companyName: "",
    ownerName: "",
    rollno: "",
    owneremail: "",
    acesscode: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/client', formData); 
      console.log('Response:', response.data);
      
      navigate('/client2');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          name='companyName'
          value={formData.companyName}
          onChange={handleChange}
          placeholder='Company Name'
        />
        <input 
          type='text'
          name='ownerName'
          value={formData.ownerName}
          onChange={handleChange}
          placeholder='OwnerName'
        />
        <input 
          type='text'
          name='rollno'
          value={formData.rollno}
          onChange={handleChange}
          placeholder='Roll No'
        />
        <input 
          type='text'
          name='owneremail'
          value={formData.owneremail}
          onChange={handleChange}
          placeholder='Owner Email'
        />
        <input 
          type='text'
          name='acesscode'
          value={formData.acesscode}
          onChange={handleChange}
          placeholder='Access Code'
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Client;
