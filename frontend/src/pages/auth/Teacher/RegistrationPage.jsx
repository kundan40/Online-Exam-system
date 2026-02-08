import React, { useState } from "react";
import { Link } from "react-router-dom";

const TeacherRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(
      "http://localhost/Online-Exam-system/backend/api/auth/register.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "teacher", // change to "teacher" for teacher page
        }),
      }
    );

    const data = await res.json();

    console.log(data);
    if (!res.ok || data.error) {
      alert(data.message || "Registration failed");
      return;
    }

    alert("Registration successful 🎉");
    console.log(data);

    // optional redirect
    // navigate("/login");

  } catch (error) {
    console.error("Registration error:", error);
    alert("Server error. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">
          Teacher Registration
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Create your teacher account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Create password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Confirm password"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            {loading ? "Creating account..." : "Register as Teacher"}
          </button>

          {/* Login */}
          <p className="text-center text-sm text-gray-600">
            Already registered?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default TeacherRegister;
