
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import ProductList from './components/ProductList/ProductList.js';
import ProductForm from './components/ProductForm/ProductForm.js';

function App() {
  const [refresh, setRefresh]= useState(false);
  const handleProductAdded=()=>{
    setRefresh(!refresh);
  };
  return (
    <div>
      <ProductList key={refresh} />
      <ProductForm on ProductAdded={handleProductAdded} /> 
    </div>
  );
}

export default App;
