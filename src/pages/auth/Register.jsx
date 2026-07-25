import React from "react";
import { Link } from "react-router";
import RegisterForm from "../../components/auth/RegisterForm";

const Register = () => {
    return (
        <div className="min-h-screen bg-background flex">
            {/* Left */}
            <div className="hidden lg:flex w-1/2 border-r border-border p-16 flex-col justify-between">
                <div>
                    <Link to="/">
                        <h1 className="font-logo text-4xl font-bold">Vertex</h1>
                    </Link>

                    <div className="mt-20 max-w-md space-y-6">
                        <div className="inline-flex items-center gap-3 bg-secondary rounded-full px-4 py-2">
                            <div className="w-2 h-2 rounded-full bg-ring"></div>
                            <p className="text-xs text-muted-foreground">Built for modern API workflows</p>
                        </div>

                        <h2 className="font-logo text-5xl leading-tight">Build APIs without the clutter.</h2>

                        <p className="text-muted-foreground leading-7">
                            Organize collections, test endpoints, collaborate with teammates, and share your APIs from
                            one calm workspace.
                        </p>
                    </div>
                </div>

                <div className="border border-border rounded-2xl overflow-hidden bg-card">
                    <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
                        <div className="w-3 h-3 rounded-full bg-muted border border-border"></div>
                        <div className="w-3 h-3 rounded-full bg-muted border border-border"></div>
                        <div className="w-3 h-3 rounded-full bg-muted border border-border"></div>

                        <p className="text-xs font-mono text-muted-foreground ml-4">workspace</p>
                    </div>

                    <div className="divide-y divide-border">
                        <div className="flex justify-between px-6 py-4">
                            <span className="font-mono text-method-get text-sm">GET</span>

                            <span className="text-sm">Fetch repositories</span>
                        </div>

                        <div className="flex justify-between px-6 py-4">
                            <span className="font-mono text-method-post text-sm">POST</span>

                            <span className="text-sm">Create API key</span>
                        </div>

                        <div className="flex justify-between px-6 py-4">
                            <span className="font-mono text-method-patch text-sm">PATCH</span>

                            <span className="text-sm">Update workspace</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right */}
            <div className="flex-1 flex justify-center items-center px-6 py-12">
                <RegisterForm />
            </div>
        </div>
    );
};

export default Register;
