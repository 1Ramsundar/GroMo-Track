import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post("/auth/login", form);
            login(res.data.token, res.data.user);
            toast.success("Welcome back!");
            navigate("/dashboard");
        } catch (err) {
            toast.error(err.response?.data?.message || "Login Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#0f766e 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10 relative z-10"
            >
                <div className="text-center">
                    <Link to="/" className="inline-flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                            G
                        </div>
                        <span className="font-['Space_Grotesk'] font-bold text-xl text-slate-900 tracking-tight">
                            GroMo Track
                        </span>
                    </Link>

                    <h1 className="text-3xl font-bold text-slate-900 font-['Space_Grotesk']">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-slate-500">
                        Login to your account to continue
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                    />

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                    />

                    <div className="flex justify-end">
                        <Link
                            to="/forgot-password"
                            className="text-sm text-teal-700 font-medium hover:text-teal-800 transition-colors"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            loading={loading}
                        >
                            Sign In
                        </Button>
                    </div>
                </form>

                <p className="text-center mt-8 text-slate-600">
                    Don't have an account?
                    <Link
                        to="/signup"
                        className="ml-2 text-teal-700 font-semibold hover:text-teal-800 transition-colors"
                    >
                        Create Account
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}

export default Login;