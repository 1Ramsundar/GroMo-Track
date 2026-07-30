import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";

function Login() {
  return <h1>Login Page</h1>;
}

function Signup() {
  return <h1>Signup Page</h1>;
}

function Dashboard() {
  return <h1>Dashboard</h1>;
}

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-500">
        404 - Page Not Found
      </h1>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="*" element={<NotFound />} />
</Routes>
  );
}