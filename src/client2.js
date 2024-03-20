import React, { useState } from 'react';
import axios from 'axios';

const Client2 = () => {
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCompanyChange = (e) => {
        setSelectedCompany(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                companyName: selectedCompany,
                categoryName: selectedCategory
            };
            const response = await axios.post('http://localhost:5000/client2', formData);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select value={selectedCompany} onChange={handleCompanyChange}>
                    <option value="">Select Company</option>
                    <option value="AMZ">AMZ</option>
                    <option value="FLP">FLP</option>
                    <option value="SNP">SNP</option>
                    <option value="MYN">MYN</option>
                    <option value="AZO">AZO</option>
                </select>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Select Category</option>
                    <option value="Phone">Phone</option>
                    <option value="Computer">Computer</option>
                    <option value="TV">TV</option>
                    <option value="Earphone">Earphone</option>
                    {/* Add other category options here */}
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Client2;
