import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../services/api";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const res = await api.post("/auth/forgot-password", {
                email
            });

            toast.success(res.data.message);

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Something went wrong"
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
                    Forgot Password
                </h1>

                <p className="text-center text-slate-500 mt-2 mb-8">
                    Enter your registered email address.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <Input
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        loading={loading}
                    >
                        Send Reset Link
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