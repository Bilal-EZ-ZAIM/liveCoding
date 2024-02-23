import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductEdit = () => {
  const { id } = useParams();
  const Navigate = useNavigate("");
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [discription, setDiscription] = useState(""); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/produi/${id}`
        );
        const productData = response.data;
        setProduct(productData);
        setName(productData.name); 
        setDiscription(productData.discription);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: name,
      discription: discription,
    };
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/produi/updite/${id}`,
        formData
      );

      if (response.status === 200) {
        console.log("Product updated successfully!");
        Navigate("/");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Edit Product: {product.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="discription" className="form-label">
            Description:
          </label>
          <textarea
            id="discription" 
            name="discription" 
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
