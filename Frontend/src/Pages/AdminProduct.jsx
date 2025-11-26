import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", quantity: "" });
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");

  // Load all products
  const loadProducts = async () => {
    const res = await axios.get("http://localhost:9000/api/products");
    setProducts(res.data.products);
  };

  // Add product with image
  const addProduct = async () => {
    if (!form.name || !form.price || !form.quantity) {
      alert("Please fill all fields");
      return;
    }

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("quantity", form.quantity);
    fd.append("image", image);

    await axios.post(
      "http://localhost:9000/api/products/add",
      fd,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    loadProducts();
    setForm({ name: "", price: "", quantity: "" });
    setImage(null);
  };

  // Delete product
  const deleteProduct = async (id) => {
    await axios.delete(
      `http://localhost:9000/api/products/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Admin Product Page</h2>

      {/* Product List */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {products.map(p => (
          <div 
            key={p.id} 
            style={{
              width: "250px",
              background: "#fff",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)"
            }}
          >
            {/* Product Image */}
            {p.image && (
              <img 
                src={`http://localhost:9000/uploads/${p.image}`} 
                alt="product"
                style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "8px" }}
              />
            )}

            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <p>Stock: {p.quantity}</p>

            <button 
              onClick={() => deleteProduct(p.id)}
              style={{
                padding: "8px 16px",
                background: "red",
                color: "white",
                border: "none",
                marginTop: "10px",
                cursor: "pointer",
                borderRadius: "6px"
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Add Product Card */}
      <div style={{
        width: "350px",
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.15)",
        marginTop: "40px"
      }}>
        <h3>Add Product</h3>

        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          style={{ display: "block", width: "100%", margin: "10px 0", padding: "10px" }}
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          style={{ display: "block", width: "100%", margin: "10px 0", padding: "10px" }}
        />

        <input
          placeholder="Quantity"
          value={form.quantity}
          onChange={e => setForm({ ...form, quantity: e.target.value })}
          style={{ display: "block", width: "100%", margin: "10px 0", padding: "10px" }}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ margin: "10px 0" }}
        />

        <button
          onClick={addProduct}
          style={{
            padding: "10px 20px",
            background: "green",
            color: "white",
            border: "none",
            marginTop: "10px",
            cursor: "pointer",
            borderRadius: "6px"
          }}
        >
          Add
        </button>
      </div>

    </div>
  );
}

export default AdminProduct;
  