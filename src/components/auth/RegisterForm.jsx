import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../features/auth/useAuth.js";

const RegisterForm = () => {
    const { registerUser } = useAuth();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const formSubmit = (data) => {
        console.log(data);
        if (registerUser(data)) {
            reset();
            navigate("/dashboard", { replace: true });
        }
    };

    return (
        <form
            onSubmit={handleSubmit(formSubmit)}
            className="w-full max-w-lg bg-card border border-border rounded-2xl p-8 space-y-6"
        >
            <div className="space-y-2">
                <h2 className="text-3xl font-semibold">Create your workspace</h2>

                <p className="text-muted-foreground">Join Vertex and start organizing your APIs.</p>
            </div>

            {/* First & Last Name */}

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <input
                        {...register("firstName", {
                            required: "First name is required",
                        })}
                        type="text"
                        placeholder="First name"
                        className="w-full border border-border bg-background rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-ring"
                    />
                    {errors.firstName && <p className="mt-2 text-xs text-red-500">{errors.firstName.message}</p>}
                </div>

                <div>
                    <input
                        {...register("lastName")}
                        type="text"
                        placeholder="Last name (optional)"
                        className="w-full border border-border bg-background rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-ring"
                    />
                    {errors.lastName && <p className="mt-2 text-xs text-red-500">{errors.lastName.message}</p>}
                </div>
            </div>

            {/* Email */}

            <div>
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
                    className="w-full border border-border bg-background rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-ring"
                />
                {errors.email && <p className="mt-2 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            {/* Username */}

            <div>
                <input
                    {...register("username", {
                        required: "Username is required",
                        pattern: {
                            value: /^[a-zA-Z0-9_-]{3,16}$/,
                            message: "Enter a valid username",
                        },
                    })}
                    type="text"
                    placeholder="Username"
                    className="w-full border border-border bg-background rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-ring"
                />
                {errors.username && <p className="mt-2 text-xs text-red-500">{errors.username.message}</p>}
            </div>

            {/* Password */}

            <div>
                <div className="relative">
                    <input
                        {...register("password", {
                            required: "Password is required",
                            pattern: {
                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
                                message: "Must contain 8+ characters, uppercase, lowercase, number & special character",
                            },
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters",
                            },
                        })}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full border border-border bg-background rounded-xl px-4 py-3 pr-12 outline-none focus:ring-1 focus:ring-ring"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {errors.password && <p className="mt-2 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}

            <div>
                <div className="relative">
                    <input
                        {...register("confirmPassword", {
                            required: "Confirm your password",
                            validate: (value) => value === watch("password") || "Passwords do not match",
                        })}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        className="w-full border border-border bg-background rounded-xl px-4 py-3 pr-12 outline-none focus:ring-1 focus:ring-ring"
                    />

                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {errors.confirmPassword && (
                    <p className="mt-2 text-xs text-red-500">{errors.confirmPassword.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-primary text-primary-foreground rounded-xl py-3 hover:bg-primary/90 transition"
            >
                Create Account
            </button>

            <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-foreground hover:underline">
                    Sign in
                </Link>
            </p>
        </form>
    );
};

export default RegisterForm;
