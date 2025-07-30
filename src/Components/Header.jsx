import React from 'react'
import { FaCube } from 'react-icons/fa'

export default function Header() {
    return (
        <header className="navbar bg-base-100 shadow-md">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl flex items-center gap-2">
                    <FaCube className="text-primary" size={28} />
                    CrowdCube
                </a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Home</a></li>
                    <li><a>Projects</a></li>
                    <li><a>About</a></li>
                </ul>
                <button className="btn btn-primary ml-4">Sign In</button>
            </div>
        </header>
    )
}
