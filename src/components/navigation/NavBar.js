import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './NavBar.css';
import Logo from '../../assets/logo.png';
import SignUpIcon from '../../assets/signup.png';
import LogInIcon from '../../assets/login.png';
import SearchBar from '../SearchBar';

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const closeMenu = () => {
        setOpen(false);
    };

    return (
        <nav className="navbar">
            <Link to="/" className="nav-logo">
                <img src={Logo} alt="Logo" />
            </Link>
            <div onClick={handleClick} className="nav-icon">
                {open ? <FiX /> : <FiMenu />}
            </div>
            <ul className={open ? 'nav-links active' : 'nav-links'}>
                <li className="nav-item">
                    <Link to="/" className="nav-link" onClick={closeMenu}>
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/category" className="nav-link" onClick={closeMenu}>
                        Category
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" className="nav-link" onClick={closeMenu}>
                        About
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/contact" className="nav-link" onClick={closeMenu}>
                        Contact
                    </Link>
                </li>
                <li className="nav-buttons">
                    <Link to="/signup">
                        <img src={SignUpIcon} alt="Signup" onClick={closeMenu} />
                    </Link>
                    <Link to="/login">
                        <img src={LogInIcon} alt="LogIn" onClick={closeMenu} />
                    </Link>
                </li>
                <li className="nav-search">
                    <SearchBar></SearchBar>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
