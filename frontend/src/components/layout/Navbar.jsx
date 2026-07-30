import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-sm">

      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

        <Link
          to="/"
          className="text-3xl font-bold text-emerald-600"
        >
          GroMo Track
        </Link>

        <div className="flex gap-6">

          <Link
            to="/login"
            className="text-slate-700 hover:text-emerald-600"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700"
          >
            Sign Up
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;