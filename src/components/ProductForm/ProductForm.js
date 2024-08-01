// src/components/ProductForm/ProductForm.js
import React, { useState } from 'react';
import productService from '../../services/productService';
import './ProductForm.css';

const ProductForm = ({ onProductAdded }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [supplier, setSupplier] = useState('');
    const [rating, setRating] = useState('');
    const [dateAdded, setDateAdded] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const ratingValue = parseFloat(rating);
        
        if (ratingValue > 5.0) {
            setErrorMessage('Rating must be 5.0 or below.');
            return;
        }

        const newProduct = {
            name,
            price: parseFloat(price),
            category,
            stock: parseInt(stock),
            supplier,
            rating: ratingValue,
            dateAdded,
        };
        try {
            await productService.addProduct(newProduct);
            onProductAdded(); // Trigger refresh
            setName('');
            setPrice('');
            setCategory('');
            setStock('');
            setSupplier('');
            setRating('');
            setDateAdded('');
            setShowForm(false); // Hide form after submission
            setErrorMessage(''); // Clear error message
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="container">
            <button className="btn btn-primary my-4" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Hide Form' : 'Add Product'}
            </button>
            {showForm && (
                <div>
                    <h3 className="my-4">Add Product</h3>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <form onSubmit={handleSubmit} className="product-form">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="productName" className="form-label">Name:</label>
                                <input type="text" className="form-control" id="productName" value={name} onChange={e => setName(e.target.value)} required />
                            </div>
                            <div className="col">
                                <label htmlFor="productPrice" className="form-label">Price:</label>
                                <input type="number" className="form-control" id="productPrice" value={price} onChange={e => setPrice(e.target.value)} required />
                            </div>
                            <div className="col">
                                <label htmlFor="productCategory" className="form-label">Category:</label>
                                <input type="text" className="form-control" id="productCategory" value={category} onChange={e => setCategory(e.target.value)} required />
                            </div>
                            <div className="col">
                                <label htmlFor="productStock" className="form-label">Stock:</label>
                                <input type="number" className="form-control" id="productStock" value={stock} onChange={e => setStock(e.target.value)} required />
                            </div>
                            <div className="col">
                                <label htmlFor="productSupplier" className="form-label">Supplier:</label>
                                <input type="text" className="form-control" id="productSupplier" value={supplier} onChange={e => setSupplier(e.target.value)} required />
                            </div>
                            <div className="col">
                                <label htmlFor="productRating" className="form-label">Rating:</label>
                                <input type="number" step="0.1" className="form-control" id="productRating" value={rating} onChange={e => setRating(e.target.value)} required />
                            </div>
                            <div className="col">
                                <label htmlFor="productDateAdded" className="form-label">Date Added:</label>
                                <input type="datetime-local" className="form-control" id="productDateAdded" value={dateAdded} onChange={e => setDateAdded(e.target.value)} required />
                            </div>
                            <div className="col-auto align-self-end">
                                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Product</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProductForm;
