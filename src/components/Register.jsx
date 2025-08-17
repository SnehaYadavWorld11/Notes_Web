import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/auth/register`, {
      ...formData,
      password: formData.password.trim(),
    });
    window.location.href = "/login";
  };

  return (
    <div className="w-96 bg-gray-900 p-6 rounded-lg container mx-auto">
      <h2 className="text-2xl mb-4 text-green-400  text-center">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Username"
          name="username"
          className="w-full p-2 my-2 bg-gray-800 text-white"
        />
        <input
          onChange={handleChange}
          type="email"
          placeholder="Email"
          name="email"
          className="w-full p-2 my-2 bg-gray-800 text-white"
        />
        <input
          onChange={handleChange}
          type="password"
          placeholder="Password"
          name="password"
          className="w-full p-2 my-2 bg-gray-800 text-white"
        />

        <button type="submit" className="w-full p-2 bg-green-400 text-white ">
          Register
        </button>
      </form>
      <p className="text-white text-center">
        Already have an account?{" "}
        <Link to={"/login"} className="text-green-400">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
