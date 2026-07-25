import React from "react";
import { Link } from "react-router";
import { RiGithubFill, RiLinkedinBoxFill } from "react-icons/ri";

const Home = () => {
    return (
        <div className="min-h-screen w-full bg-background flex flex-col items-center gap-20 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-40">
            <header className="h-[10vh] w-full flex flex-row justify-between items-center border-border border-b">
                <Link to={"/"}>
                    <h1 className="font-logo text-3xl font-bold tracking-tight">Vertex</h1>
                </Link>
                <div className="flex flex-row gap-4 justify-center items-center">
                    <Link
                        to={"/login"}
                        className="border-none text-muted-foreground text-sm hover:text-secondary-foreground active:scale-98"
                    >
                        Sign in
                    </Link>
                    <Link
                        to={"/register"}
                        className="px-4 py-2 bg-primary border rounded-xl text-primary-foreground text-sm hover:text-primary hover:bg-primary-foreground active:scale-98"
                    >
                        Get Started
                    </Link>
                </div>
            </header>
            <div className="max-w-3xl flex flex-col justify-center items-center gap-10">
                <div className="flex justify-center items-center gap-4 bg-secondary px-4 py-2 rounded-2xl">
                    <div className="h-2 w-2 rounded-full bg-ring"></div>
                    <p className="text-xs text-muted-foreground">A new developer surface for APIs</p>
                </div>

                <h1 className="font-logo text-center text-6xl md:text-7xl">A calmer place to work with APIs.</h1>

                <p className="text-center text-muted-foreground">
                    Vertex is a workspace for developers who want to organize, test, and share APIs without the noise of
                    a bloated dashboard.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        to={"/vault"}
                        className="px-4 py-2 bg-primary border rounded-xl text-primary-foreground text-sm hover:text-primary hover:bg-primary-foreground active:scale-98"
                    >
                        Create your workspace
                    </Link>
                    <Link
                        to={"/sphere"}
                        className="px-4 py-2 bg-primary-foreground border border-border rounded-xl text-primary text-sm hover:text-primary hover:bg-muted active:scale-98"
                    >
                        Explore public APIs
                    </Link>
                </div>
            </div>

            <div className="w-full flex flex-col bg-card border border-border rounded-2xl overflow-hidden">
                <div className="flex flex-row gap-2 p-4 border-b border-border">
                    <div className="h-4 w-4 bg-muted border border-border rounded-full"></div>
                    <div className="h-4 w-4 bg-muted border border-border rounded-full"></div>
                    <div className="h-4 w-4 bg-muted border border-border rounded-full"></div>
                    <p className="font-mono text-xs text-muted-foreground mx-4">vertex — vault</p>
                </div>

                <div className="grid grid-cols-1 w-full md:grid-cols-2 overflow-hidden">
                    <div className="h-20 w-full border border-border px-8 py-4 flex flex-col justify-center gap-2">
                        <div className="flex gap-6">
                            <h3 className="text-xs text-method-get font-semibold font-mono">GET</h3>
                            <p className="text-xs font-semibold">List repositories</p>
                        </div>
                        <p className="text-xs font-mono text-muted-foreground">https://api.github.com/user/repos</p>
                    </div>

                    <div className="h-20 w-full border border-border px-8 py-4 flex flex-col justify-center gap-2">
                        <div className="flex gap-6">
                            <h3 className="text-xs text-method-post font-semibold font-mono">POST</h3>
                            <p className="text-xs font-semibold">Create checkout session</p>
                        </div>
                        <p className="text-xs font-mono text-muted-foreground">
                            https://api.stripe.com/v1/checkout/sessions
                        </p>
                    </div>

                    <div className="h-20 w-full border border-border px-8 py-4 flex flex-col justify-center gap-2">
                        <div className="flex gap-6">
                            <h3 className="text-xs text-method-patch font-semibold font-mono">PATCH</h3>
                            <p className="text-xs font-semibold">Update workspace</p>
                        </div>
                        <p className="text-xs font-mono text-muted-foreground">https://api.linear.app/graphql</p>
                    </div>

                    <div className="h-20 w-full border border-border px-8 py-4 flex flex-col justify-center gap-2">
                        <div className="flex gap-6">
                            <h3 className="text-xs text-method-delete font-semibold font-mono">DELETE</h3>
                            <p className="text-xs font-semibold">Revoke token</p>
                        </div>
                        <p className="text-xs font-mono text-muted-foreground">https://api.vercel.com/v3/tokens/:id</p>
                    </div>
                </div>
            </div>

            <footer className="mt-auto w-full border-t border-border">
                <div className="flex flex-col gap-12 py-10">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                        <div className="max-w-lg">
                            <h2 className="font-logo text-3xl font-bold tracking-tight">Vertex</h2>

                            <p className="mt-4 text-muted-foreground leading-7">
                                A minimalist workspace for developers to organize, document, test, and share APIs with
                                clarity. Built to remove friction—not add more dashboards.
                            </p>
                        </div>

                        <div className="text-left md:text-right">
                            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                                Designed with intention.
                            </p>

                            <h3 className="mt-2 font-logo text-2xl">Atharv Agrey</h3>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Engineered for developers who value thoughtful tools and clean experiences.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                © {new Date().getFullYear()} Vertex. All rights reserved.
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground italic">
                                Designed with intention. Engineered by
                                <span className="text-foreground font-medium"> Atharv Agrey</span>.
                            </p>
                        </div>

                        <div className="flex items-center gap-5">
                            <a
                                href="https://github.com/xthxrv-xgrey"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <RiGithubFill size={24} />
                            </a>

                            <a
                                href="https://linkedin.com/in/xthxrv-xgrey"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <RiLinkedinBoxFill size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default React.memo(Home);
