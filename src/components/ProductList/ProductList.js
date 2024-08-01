// src/components/ProductList/ProductList.js
import React, { useState, useEffect } from 'react';
import productService from '../../services/productService';
import ProductListItem from './ProductListItem';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productList = await productService.getAllProducts();
                setProducts(productList);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await productService.deleteProduct(id);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEdit = async () => {
        // Refetch the product list to get updated data
        try {
            const productList = await productService.getAllProducts();
            setProducts(productList);
        } catch (error) {
            console.error('Error updating product list:', error);
        }
    };

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Supplier</th>
                    <th>Rating</th>
                    <th>Date Added</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <ProductListItem
                        key={product.id}
                        product={product}
                        onDelete={() => handleDelete(product.id)}
                        onEdit={handleEdit} // Pass the onEdit callback
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ProductList;
