import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X, LayoutDashboard, Boxes, Globe2, Bookmark, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../features/auth/useAuth";
import { useUser } from "../../features/auth/useUser";

const Header = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [profileMenu, setProfileMenu] = useState(false);

    const { signOut } = useAuth();
    const { avatar } = useUser();

    const profileRef = useRef(null);

    const closeMenu = () => setOpenMenu(false);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const navLinkClass = ({ isActive }) =>
        `transition-colors duration-200 ${
            isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
        }`;

    return (
        <>
            <header className="fixed top-0 left-0 z-50 h-16 w-full border-b border-border bg-background/80 backdrop-blur-md">
                <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12">
                    {/* Logo */}
                    <Link to="/">
                        <h1 className="font-logo text-3xl font-bold">Vertex</h1>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-10 text-sm font-mono">
                        <NavLink to="/dashboard" className={navLinkClass}>
                            Dashboard
                        </NavLink>

                        <NavLink to="/vault" className={navLinkClass}>
                            Vault
                        </NavLink>

                        <NavLink to="/sphere" className={navLinkClass}>
                            Sphere
                        </NavLink>

                        <NavLink to="/saved" className={navLinkClass}>
                            Saved
                        </NavLink>
                    </nav>

                    {/* Desktop Profile */}
                    <div className="relative hidden md:block" ref={profileRef}>
                        <button
                            onClick={() => setProfileMenu((prev) => !prev)}
                            className="rounded-full active:scale-98"
                        >
                            <img
                                src={avatar}
                                alt="profile"
                                className="h-10 w-10 rounded-full border border-border object-cover"
                            />
                        </button>

                        {profileMenu && (
                            <div className="absolute right-0 mt-3 w-52 overflow-hidden rounded-xl border border-border bg-background shadow-lg">
                                <NavLink
                                    to="/profile"
                                    onClick={() => setProfileMenu(false)}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition"
                                >
                                    <User size={18} />
                                    Profile
                                </NavLink>

                                <NavLink
                                    to="/settings"
                                    onClick={() => setProfileMenu(false)}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition"
                                >
                                    <Settings size={18} />
                                    Settings
                                </NavLink>

                                <button
                                    onClick={() => {
                                        signOut();
                                        setProfileMenu(false);
                                    }}
                                    className="flex w-full items-center gap-3 px-4 py-3 text-destructive hover:bg-muted transition"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Button */}
                    <button
                        onClick={() => setOpenMenu((prev) => !prev)}
                        className="rounded-md p-2 transition hover:bg-muted md:hidden"
                    >
                        {openMenu ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            <div
                className={`fixed left-0 top-16 z-40 w-full overflow-hidden border-b border-border bg-background/95 backdrop-blur-md transition-all duration-300 md:hidden ${
                    openMenu ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <nav className="flex flex-col p-5">
                    <NavLink
                        to="/dashboard"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-3 py-3 transition ${
                                isActive ? "bg-muted text-primary" : "hover:bg-muted"
                            }`
                        }
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/vault"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-3 py-3 transition ${
                                isActive ? "bg-muted text-primary" : "hover:bg-muted"
                            }`
                        }
                    >
                        <Boxes size={18} />
                        Vault
                    </NavLink>

                    <NavLink
                        to="/sphere"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-3 py-3 transition ${
                                isActive ? "bg-muted text-primary" : "hover:bg-muted"
                            }`
                        }
                    >
                        <Globe2 size={18} />
                        Sphere
                    </NavLink>

                    <NavLink
                        to="/saved"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-3 py-3 transition ${
                                isActive ? "bg-muted text-primary" : "hover:bg-muted"
                            }`
                        }
                    >
                        <Bookmark size={18} />
                        Saved
                    </NavLink>

                    <div className="my-3 border-t border-border" />

                    <NavLink
                        to="/profile"
                        onClick={closeMenu}
                        className="flex items-center gap-3 rounded-lg px-3 py-3 transition hover:bg-muted"
                    >
                        <User size={18} />
                        Profile
                    </NavLink>

                    <NavLink
                        to="/settings"
                        onClick={closeMenu}
                        className="flex items-center gap-3 rounded-lg px-3 py-3 transition hover:bg-muted"
                    >
                        <Settings size={18} />
                        Settings
                    </NavLink>

                    <button
                        onClick={() => {
                            signOut();
                            closeMenu();
                        }}
                        className="flex items-center gap-3 rounded-lg px-3 py-3 text-destructive transition hover:bg-muted"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </nav>
            </div>
        </>
    );
};

export default Header;
