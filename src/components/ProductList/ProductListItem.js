import React, { useState } from 'react';
import productService from '../../services/productService';
import './List.css';

const ProductListItem = ({ product, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(product.name);
    const [editedPrice, setEditedPrice] = useState(product.price);
    const [editedCategory, setEditedCategory] = useState(product.category);
    const [editedStock, setEditedStock] = useState(product.stock);
    const [editedSupplier, setEditedSupplier] = useState(product.supplier);
    const [editedRating, setEditedRating] = useState(product.rating);
    const [editedDateAdded, setEditedDateAdded] = useState(product.dateAdded);

    const handleSave = async () => {
        const ratingValue = parseFloat(editedRating);

        if (ratingValue > 5.0) {
            alert('Rating must be 5.0 or below.');
            return;
        }

        const editedProduct = {
            ...product,
            name: editedName,
            price: parseFloat(editedPrice),
            category: editedCategory,
            stock: parseInt(editedStock),
            supplier: editedSupplier,
            rating: ratingValue,
            dateAdded: editedDateAdded,
        };
        try {
            await productService.updateProduct(product.id, editedProduct);
            setIsEditing(false);
            onEdit(); // Refresh product list
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset edited values
        setEditedName(product.name);
        setEditedPrice(product.price);
        setEditedCategory(product.category);
        setEditedStock(product.stock);
        setEditedSupplier(product.supplier);
        setEditedRating(product.rating);
        setEditedDateAdded(product.dateAdded);
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (confirmDelete) {
            onDelete();
        }
    };

    return (
        <tr>
            {isEditing ? (
                <>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            value={editedName}
                            onChange={e => setEditedName(e.target.value)}
                            required
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            className="form-control"
                            value={editedPrice}
                            onChange={e => setEditedPrice(e.target.value)}
                            required
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            value={editedCategory}
                            onChange={e => setEditedCategory(e.target.value)}
                            required
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            className="form-control"
                            value={editedStock}
                            onChange={e => setEditedStock(e.target.value)}
                            required
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            value={editedSupplier}
                            onChange={e => setEditedSupplier(e.target.value)}
                            required
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            step="0.1"
                            className="form-control"
                            value={editedRating}
                            onChange={e => setEditedRating(e.target.value)}
                            required
                        />
                    </td>
                    <td>
                        <input
                            type="date"
                            className="form-control"
                            value={editedDateAdded}
                            onChange={e => setEditedDateAdded(e.target.value)}
                            required
                        />
                    </td>
                    <td>
                        <button className="btn btn-success me-2" onClick={handleSave}>Save</button>
                        <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                    </td>
                </>
            ) : (
                <>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.stock}</td>
                    <td>{product.supplier}</td>
                    <td>{product.rating} / 5</td>
                    <td>{new Date(product.dateAdded).toLocaleDateString()}</td>
                    <td>
                        <button className="btn btn-primary me-2" onClick={() => setIsEditing(true)}>Edit</button>
                        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    </td>
                </>
            )}
        </tr>
    );
};

export default ProductListItem;
