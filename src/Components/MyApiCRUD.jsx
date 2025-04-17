import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://67cfa7d6823da0212a82ea48.mockapi.io/myapi/users";

export default function MyAPICRUD() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", avatar: "", location: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ name: "", avatar: "", location: "" });
      setEditingId(null);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, avatar: user.avatar, location: user.location });
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>User Management</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          name="avatar"
          value={form.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
          required
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
        />
       

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          required
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "10px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" }}>
          {editingId ? "Update" : "Add"} User
        </button>
      </form>
      <div>
        {users.map((user) => (
          <div key={user.id} style={{ padding: "10px", border: "1px solid #ccc", marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
             <a href={user.avatar}> 
            <img src={user.avatar} alt={user.name} style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }} /></a>
            <div style={{ flex: "1" }}>
              <p style={{ fontWeight: "bold" }}>{user.name}</p>
              <p style={{ fontSize: "14px", color: "gray" }}>{user.location}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(user)} style={{ marginRight: "5px", padding: "5px 10px", backgroundColor: "green", color: "white", border: "none", cursor: "pointer" }}>Edit</button>
              <button onClick={() => handleDelete(user.id)} style={{ padding: "5px 10px", backgroundColor: "red", color: "white", border: "none", cursor: "pointer" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

