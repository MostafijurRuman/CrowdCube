import React, {  useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaCube, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
// import { AuthContext } from "../../Provider/AuthProvider"; // Adjust path as needed

const navLinks = [
    { name: "Home", to: "/" },
    { name: "All Campaign", to: "/all-campaigns" },
    { name: "Add New Campaign", to: "/add-campaign" },
    { name: "My Campaign", to: "/my-campaigns" },
    { name: "My Donations", to: "/my-donations" },
];

const Header = () => {
    // const { user, logout, loading } = useContext(AuthContext);
    const user = false;
    const loading = false;
    const logout = false;
    const [menuOpen, setMenuOpen] = useState(false);

    const activeLink =
        "text-primary font-semibold underline underline-offset-4";
    const defaultLink =
        "hover:text-primary transition-colors font-medium";

    return (
        <header className="font-inter" style={{ fontFamily: "'Inter', sans-serif" }}>
            <nav className="w-full bg-base-100 shadow-sm px-4 md:px-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between py-2">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2  text-2xl font-bold tracking-tight text-primary no-underline hover:bg-transparent">
                        <FaCube className="text-primary text-3xl" />
                        <span>CrowdCube</span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex gap-6 items-center flex-1 justify-center">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.to}
                                className={({ isActive }) =>
                                    `${defaultLink} ${isActive ? activeLink : ""}`
                                }
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            className="btn btn-ghost btn-circle"
                            onClick={() => setMenuOpen((prev) => !prev)}
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
                        </button>
                    </div>

                    {/* User Profile / Login */}
                    <div className="flex items-center gap-3">
                        {!loading && user ? (
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full border-2 border-primary">
                                        <img src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="profile" />
                                    </div>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                                >
                                    <li>
                                        <span className="font-semibold">{user.displayName || user.name || "Profile"}</span>
                                    </li>
                                    <li>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li>
                                        <button onClick={logout} className="text-error">Logout</button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="btn btn-primary btn-sm flex items-center"
                                style={{
                                    color: "#fff",
                                    fontFamily: "'Inter', sans-serif",
                                }}
                            >
                                <FaUserCircle className="mr-2" /> Login
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Nav Links */}
                {menuOpen && (
                    <div className="md:hidden px-4 pb-2 animate-fade-in">
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.to}
                                    className={({ isActive }) =>
                                        `py-2 px-3 rounded transition ${isActive ? activeLink : ""}`
                                    }
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            <div className="mt-2 border-t pt-2">
                                {!loading && user ? (
                                    <></>
                                ) : (
                                    <div className="flex gap-2 mt-2">
                                        <Link
                                            to="/login"
                                            className="btn btn-outline btn-sm w-1/2 font-semibold"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="btn btn-primary btn-sm w-1/2 font-semibold"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
