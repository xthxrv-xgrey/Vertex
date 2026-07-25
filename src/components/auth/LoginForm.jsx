import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router";
import { useAuth } from "../../features/auth/useAuth.js";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
    const { signIn } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const formSubmit = (data) => {
        if (signIn(data)) {
            reset();
            <Navigate to="/dashboard" replace />;
        }
    };
    return (
        <form
            onSubmit={handleSubmit(formSubmit)}
            className="w-full max-w-lg bg-card border border-border rounded-2xl p-8 space-y-6"
        >
            <div className="space-y-2">
                <h2 className="text-3xl font-semibold">Sign in to Vertex</h2>

                <p className="text-muted-foreground">Continue building, testing, and organizing your APIs.</p>
            </div>

            {/* EMAIL */}

            <input
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Enter a valid email",
                    },
                })}
                type="email"
                placeholder="Email"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-1 focus:ring-ring"
            />

            {errors.email && <p className="mt-2 text-xs text-red-500">{errors.email.message}</p>}

            {/* PASSWORD */}

            <div className="relative">
                <input
                    {...register("password", {
                        required: "Password is required",
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-16 outline-none focus:ring-1 focus:ring-ring"
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground hover:text-foreground"
                >
                    {showPassword ? <EyeOff /> : <Eye />}
                </button>
            </div>

            {errors.password && <p className="mt-2 text-xs text-red-500">{errors.password.message}</p>}

            <div className="flex items-center justify-center text-sm">
                <button type="button" className="text-muted-foreground hover:text-foreground">
                    Forgot password?
                </button>
            </div>

            <button
                type="submit"
                className="w-full rounded-xl bg-primary py-3 text-primary-foreground transition hover:bg-primary/90"
            >
                Sign In
            </button>

            <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-foreground hover:underline">
                    Create one
                </Link>
            </p>
        </form>
    );
};

export default LoginForm;
