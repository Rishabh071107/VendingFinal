import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Css/AdminDashboard.css";

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", price: "", quantity: "" });
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");

 
  const loadProducts = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/products");
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  
  const addProduct = async () => {
    if (!form.name || !form.price || !form.quantity) {
      alert("Fill all fields");
      return;
    }

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("quantity", form.quantity);
    if (image) fd.append("image", image);

    try {
      await axios.post(
        "http://localhost:9000/api/products/add",
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setForm({ name: "", price: "", quantity: "" });
      setImage(null);
      loadProducts();
    } catch (err) {
      console.error(err);
    }
  };

 
  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `http://localhost:9000/api/products/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      loadProducts();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);


  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

   
      <div className="sidebar">
        <h2 className="logo">AdminPanel</h2>

        <ul>
          <li>Dashboard</li>
          <li className="active">Products</li>
          <li>Orders</li>
          <li>Users</li>
          <li>Logout</li>
        </ul>

        <div className="sidebar-add">
          <h3>Add Product</h3>

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <input
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button onClick={addProduct}>
            Add Product
          </button>
        </div>
      </div>

     
      <div className="main">

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        
        <div className="product-grid">
          {filteredProducts.map((p) => (
            <div key={p.id} className="product-card">

              {p.image && (
                <img
                  src={`http://localhost:9000/uploads/${p.image}`}
                  alt="product"
                />
              )}

              <h3>{p.name}</h3>
              <p className="price">₹{p.price}</p>
              <p className="stock">Stock: {p.quantity}</p>

              <button
                onClick={() => deleteProduct(p.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default AdminProduct;
