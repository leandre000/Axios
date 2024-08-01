

import { useEffect, useState } from "react";
import axios from "axios"; 
import './Fetchdata.css';

const Fetchdata = () => {
  const [data, setData] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    address: {
      city: "",
    },
  });

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setNewUser((prevUser) => ({
        ...prevUser,
        address: {
          ...prevUser.address,
          [addressField]: value,
        },
      }));
    } else {
      setNewUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleAddUser = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .then((res) => {
        setData([...data, res.data]);
        setNewUser({
          name: "",
          email: "",
          address: {
            city: "",
          },
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="mt-3">
        <h3>Fetch Data from API with Axios</h3>
        <div className="form-group mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="address.city"
            value={newUser.address.city}
            onChange={handleInputChange}
          />
        </div>
        <button className="btn btn-primary" onClick={handleAddUser}>
          Add User
        </button>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fetchdata;