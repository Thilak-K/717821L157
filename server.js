const express = require('express');
const axios = require('axios'); 
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log('Server is listening on port', PORT);
});

app.post('/client', async (req, res) => {
  try {
    const formData = req.body;

    // Posting to register API
    const registerApiUrl = 'http://20.244.56.144/products/register';
    const registerApiResponse = await axios.post(registerApiUrl, formData);

    // Posting the response from register API to token API
    const tokenApiUrl = 'http://20.244.56.144/products/auth';
    const tokenApiResponse = await axios.post(tokenApiUrl, registerApiResponse.data);

    // Sending the response from register API back to the client
    res.status(registerApiResponse.status).json(registerApiResponse.data);
  } catch (error) {
    console.error('Error processing form data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/client2', async (req, res) => {
  try {
    const formData = req.body;

    // Constructing the URL 
    const baseUrl = 'http://20.244.56.144/products/companies/';
    const encodedCompanyName = encodeURIComponent(formData.companyName);
    const categoryUrl = '/categories/';
    const encodedCategoryName = encodeURIComponent(formData.categoryName);
    const productsUrl = '/products';
    const queryParams = `?top=${formData.top}&minPrice=${formData.minPrice}&maxPrice=${formData.maxPrice}`;
    const apiUrl = `${baseUrl}${encodedCompanyName}${categoryUrl}${encodedCategoryName}${productsUrl}${queryParams}`;

    // Making a GET request L
    const apiResponse = await axios.get(apiUrl);

    // Sort the products 
    const sortedProducts = apiResponse.data.products.sort((a, b) => a.price - b.price);

    // Take the top 10 products
    const top10Products = sortedProducts.slice(0, 10);

    // Sending the sorted top 10 products back to the client
    res.status(apiResponse.status).json({ products: top10Products });
  } catch (error) {
    console.error('Error processing form data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
