// src/components/ProductTable/ProductTable.js
import React from 'react';
import ProductListItem from './ProductListItem';
import './List.css';

const ProductTable = ({ products, onSort, sortField, sortOrder, onDeleteProduct }) => {
    const getSortIndicator = (field) => {
        if (sortField === field) {
            return sortOrder === 'asc' ? '▲' : '▼';
        }
        return '';
    };

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th onClick={() => onSort('name')}>
                        Name {getSortIndicator('name')}
                    </th>
                    <th onClick={() => onSort('price')}>
                        Price {getSortIndicator('price')}
                    </th>
                    <th onClick={() => onSort('category')}>
                        Category {getSortIndicator('category')}
                    </th>
                    <th onClick={() => onSort('stock')}>
                        Stock {getSortIndicator('stock')}
                    </th>
                    <th onClick={() => onSort('supplier')}>
                        Supplier {getSortIndicator('supplier')}
                    </th>
                    <th onClick={() => onSort('rating')}>
                        Rating {getSortIndicator('rating')}
                    </th>
                    <th onClick={() => onSort('dateAdded')}>
                        Date Added {getSortIndicator('dateAdded')}
                    </th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <ProductListItem
                        key={product.id}
                        product={product}
                        onDelete={() => onDeleteProduct(product.id)}
                        onEdit={() => {}}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ProductTable;
