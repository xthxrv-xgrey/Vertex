import { Link } from "react-router";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
    return (
        <div className="min-h-screen bg-background flex">
            {/* Left Panel */}
            <div className="hidden lg:flex w-1/2 border-r border-border p-16 flex-col justify-between">
                <div>
                    <Link to="/">
                        <h1 className="font-logo text-4xl font-bold">Vertex</h1>
                    </Link>

                    <div className="mt-20 max-w-md space-y-6">
                        <div className="inline-flex items-center gap-3 bg-secondary rounded-full px-4 py-2">
                            <div className="w-2 h-2 rounded-full bg-ring"></div>
                            <p className="text-xs text-muted-foreground">Welcome back to your workspace</p>
                        </div>

                        <h2 className="font-logo text-5xl leading-tight">Pick up where you left off.</h2>

                        <p className="text-muted-foreground leading-7">
                            Access your collections, environments, API tests, and shared workspaces from one calm,
                            focused place.
                        </p>
                    </div>
                </div>

                <div className="border border-border rounded-2xl overflow-hidden bg-card">
                    <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
                        <div className="w-3 h-3 rounded-full bg-muted border border-border"></div>
                        <div className="w-3 h-3 rounded-full bg-muted border border-border"></div>
                        <div className="w-3 h-3 rounded-full bg-muted border border-border"></div>

                        <p className="ml-4 text-xs font-mono text-muted-foreground">recent activity</p>
                    </div>

                    <div className="divide-y divide-border">
                        <div className="px-6 py-4 flex justify-between">
                            <span className="font-mono text-method-get text-sm">GET</span>

                            <span className="text-sm">GitHub Repository API</span>
                        </div>

                        <div className="px-6 py-4 flex justify-between">
                            <span className="font-mono text-method-post text-sm">POST</span>

                            <span className="text-sm">Stripe Checkout API</span>
                        </div>

                        <div className="px-6 py-4 flex justify-between">
                            <span className="font-mono text-method-patch text-sm">PATCH</span>

                            <span className="text-sm">Linear Workspace</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
