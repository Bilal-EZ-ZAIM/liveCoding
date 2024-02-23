import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [discription, setDiscription] = useState("");
  const Navigate = useNavigate("/");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: name,
      discription: discription,
    };

    console.log(formData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/produi/store",
        formData
      );

      if (response.status === 201) {
        console.log("Product registered successfully!");
        setName("");
        setDiscription("");
        Navigate("/");
      } else {
        console.error("Failed to register product.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="display-4 text-center mt-5 mb-4">Page de ajouter Produi</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="discription" className="form-label">
            Discription:
          </label>
          <textarea
            id="discription"
            className="form-control"
            placeholder="Enter product discription"
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default Register;
