import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Lab8 = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    role: 1,
    password: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:9090/users/all');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9090/users/signup', formData);
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullname" placeholder="Full Name" value={formData.fullname} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <select name="role" value={formData.role} onChange={handleChange} required style={{height:"25px"}}> 
          <option value="1">Admin1</option>
          <option value="2">Admin2</option>
          <option value="3">User1</option>
          <option value="4">User2</option>
        </select>
        <button type="submit">Add User</button>
      </form>
      <ul>
        <table border="1">
          <tr style={{backgroundColor:"#dadada"}}>
            <td>Name</td>
            <td> Mail ID</td>
            <td>Role </td>
            <td>Action</td>
          </tr>
   
            {users.map((user) => (            
              <tr>
                <td> {user.fullname}</td>
                <td> {user.email}</td>
                <td>Role: {user.role} </td>
                <td><button onClick={() => handleDelete(user.id)}>Delete</button></td>
              </tr>             

            ))}
        </table>
      </ul>
    </div>
  );
};

export default Lab8;
