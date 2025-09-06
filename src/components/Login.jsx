import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password, role);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Image */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80')",
        }}
      ></div>

      {/* Right Side - Login Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-white p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Sign in to Jammify
          </h2>

          <div className="mb-6">
            <label className="block text-gray-600 mb-2 font-medium">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
          </div>

          <div className="mb-8">
            <label className="block text-gray-600 mb-2 font-medium">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold p-3 shadow-md hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="text-sm text-gray-500 text-center mt-6">
            Don’t have an account?{" "}
            <span className="text-blue-600 font-medium cursor-pointer hover:underline">
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
