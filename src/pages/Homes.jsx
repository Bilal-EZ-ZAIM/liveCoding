import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Register from './Register'

const Homes = ({ name }) => {
  const [profilesData, setProfilesData] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/produi/");
        const data = response.data;
        console.log(data);
        if (data.length > 0) {
          setProfilesData(data);
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles(); 
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/produi/deleted/${id}`);
      if (response.status === 200) {
        setProfilesData(profilesData.filter(profile => profile.id !== id));
        console.log("Product deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <div>
      <div>
        <Register></Register>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Modifier</th>
              <th scope="col">Subremer</th>
            </tr>
          </thead>
          <tbody>
            {profilesData.map((profile) => (
              <tr key={profile.id}>
                <td>{profile.id}</td>
                <td>{profile.name}</td>
                <td>{profile.discription}</td>
                <td>
                  <NavLink
                    to={`/edit/${profile.id}`}
                    className="btn btn-primary"
                  >
                    Modifier
                  </NavLink>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(profile.id)}
                    className="btn btn-danger"
                  >
                    Supremer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Homes;
