import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../services/api";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function ResetPassword() {

    const { token } = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        password: "",
        confirmPassword: ""
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

        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        try {

            const res = await api.post("/auth/reset-password", {
                token,
                password: form.password
            });

            toast.success(res.data.message);

            navigate("/login");

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Failed to reset password"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-slate-200 p-8"
            >

                <h1 className="text-3xl font-bold text-center text-slate-900">
                    Reset Password
                </h1>

                <p className="text-center text-slate-500 mt-2 mb-8">
                    Enter your new password.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <Input
                        label="New Password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        loading={loading}
                    >
                        Reset Password
                    </Button>

                </form>

                <p className="text-center mt-6">

                    <Link
                        to="/login"
                        className="text-teal-700 hover:text-teal-800"
                    >
                        Back to Login
                    </Link>

                </p>

            </motion.div>

        </div>

    );

}