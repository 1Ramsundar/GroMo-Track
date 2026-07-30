import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">

      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-emerald-600">
          Welcome Back
        </h1>

        <p className="text-center text-slate-500 mt-2">
          Login to continue using GroMo Track
        </p>

        <form className="mt-8 space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-emerald-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-emerald-500"
          />

          <button
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-6 text-slate-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-emerald-600 font-semibold">
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;