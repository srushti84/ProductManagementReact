// src/components/ProductList/ProductList.js
import React, { useState, useEffect } from 'react';
import productService from '../../services/productService';
import './List.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState('name'); // Default sorting by name
    const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productList = await productService.getProducts();
                setProducts(productList);
                setFilteredProducts(productList); // Initialize filtered products
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        // Filter products based on search term
        const result = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(result);
    }, [searchTerm, products]);

    const handleSortChange = (key) => {
        setSortKey(key);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    return (
        <div className="container">
            <h3 className="my-4">Product List</h3>
            <div className="mb-4">
                <div className="d-flex mb-3">
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Search" // Updated placeholder
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <div className="dropdown">
                        <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Sort by {sortKey.charAt(0).toUpperCase() + sortKey.slice(1)}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li>
                                <button className="dropdown-item" onClick={() => handleSortChange('name')}>Name</button>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={() => handleSortChange('price')}>Price</button>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={() => handleSortChange('rating')}>Rating</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
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
                    </tr>
                </thead>
                <tbody>
                    {sortedProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.stock}</td>
                            <td>{product.supplier}</td>
                            <td>{product.rating}</td>
                            <td>{product.dateAdded}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
