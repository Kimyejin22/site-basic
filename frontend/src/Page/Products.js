import React, { useEffect, useState } from 'react';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState(null);

    // 로그인 응답 데이터를 불러와서 콘솔에 출력
    useEffect(() => {
      const loginData = localStorage.getItem('loginData');
      if (loginData) {
        const parsedData = JSON.parse(loginData);
        console.log('Products 페이지에서 불러온 로그인 응답 데이터:', parsedData);
      }
    }, []);

  useEffect(() => {
    fetch('/api/products')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleAddProduct = () => {
    addProduct(name, price);
    setName('');
    setPrice('');
  };

  const handleUpdateProduct = () => {
    updateProduct(editId, name, price);
    setName('');
    setPrice('');
    setEditId(null);
  };

  const addProduct = async (name, price) => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, price })
    });
    const newProduct = await response.json();
    setProducts([...products, newProduct]);
  };

  const updateProduct = async (id, name, price) => {
    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, price })
    });
    const updatedProduct = await response.json();
    setProducts(products.map(product => (product.id === id ? updatedProduct : product)));
  };

  const deleteProduct = async (id) => {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price} 
            <button onClick={() => {
              setEditId(product.id);
              setName(product.name);
              setPrice(product.price);
            }}>
              Edit
            </button>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>{editId ? 'Update Product' : 'Add Product'}</h2>
      <input 
        type="text" 
        placeholder="Name" 
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input 
        type="number" 
        placeholder="Price" 
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <button onClick={editId ? handleUpdateProduct : handleAddProduct}>
        {editId ? 'Update' : 'Add'}
      </button>


    </div>
  );
};

export default Products;