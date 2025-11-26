import React, { useEffect, useState } from "react";
import axios from "axios";

function UserProduct() {
  const [products, setProducts] = useState([]);
  const [buyQty, setBuyQty] = useState({});

  const token = localStorage.getItem("token");

  const loadProducts = async () => {
    const res = await axios.get("http://localhost:9000/api/products");
    setProducts(res.data.products);
  };

  const handleBuy = async (id) => {
    if (!buyQty[id] || buyQty[id] <= 0) {
      alert("Enter a valid quantity");
      return;
    }

    try {
      await axios.post(
        "http://localhost:9000/api/products/buy",
        { id, quantity: buyQty[id] },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Purchase successful!");
      loadProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Purchase failed");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "20px" }}>Available Products</h2>

      {products.length === 0 && (
        <p style={{ fontSize: "18px" }}>No products available</p>
      )}

      
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "22px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              width: "250px",
              background: "#fff",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0,0,0,0.12)",
            }}
          >
          
            {p.image && (
              <img
                src={`http://localhost:9000/uploads/${p.image}`}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
            )}

            <h3 style={{ margin: "6px 0" }}>{p.name}</h3>
            <p style={{ margin: "4px 0" }}>₹{p.price}</p>
            <p style={{ margin: "4px 0", fontSize: "14px", color: "gray" }}>
              Stock: {p.quantity}
            </p>

            
            <input
              type="number"
              placeholder="Qty"
              min="1"
              onChange={(e) =>
                setBuyQty({ ...buyQty, [p.id]: Number(e.target.value) })
              }
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "8px",
                borderRadius: "6px",
                border: "1px solid gray",
              }}
            />

            <button
              onClick={() => handleBuy(p.id)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "10px",
                background: "#0077ff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProduct;
