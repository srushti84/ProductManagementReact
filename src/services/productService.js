// src/services/productService.js
import axios from 'axios';

const baseURL = 'https://localhost:44370/api/Product';

const productService = {
    getAllProducts: async () => {
        const response = await axios.get(baseURL);
        return response.data;
    },
    addProduct: async (product) => {
        const response = await axios.post(baseURL, product);
        return response.data;
    },
    deleteProduct: async (id) => {
        const response = await axios.delete(`${baseURL}/${id}`);
        return response.data;
    },
    updateProduct : async (id, product) => {
        const newName = window.prompt('Enter new product name:', product.name);
        if (newName === null) return; 
    
        const newPrice = window.prompt('Enter new product price:', product.price);
        if (newPrice === null) return; 
    
        const updatedProduct = {
            ...product,
            name: newName,
            price: newPrice
        };
    
        try {
            const response = await axios.put(`${baseURL}/${id}`, updatedProduct);
            return response.data;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    }
    
};

export default productService;
