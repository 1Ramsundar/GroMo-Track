import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
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
            const res = await api.post("/auth/signup", form);
            toast.success(res.data.message || "Account created successfully!");
            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-10 relative overflow-hidden">
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
                        Create Account
                    </h1>
                    <p className="mt-2 text-slate-500">
                        Join GroMo Track and manage your finances smarter
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <Input
                        label="Full Name"
                        type="text"
                        name="fullName"
                        placeholder="John Doe"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <div className="pt-2">
                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            loading={loading}
                        >
                            Create Account
                        </Button>
                    </div>
                </form>

                <p className="text-center mt-8 text-slate-600">
                    Already have an account?
                    <Link
                        to="/login"
                        className="ml-2 text-teal-700 font-semibold hover:text-teal-800 transition-colors"
                    >
                        Login
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}

export default Signup;