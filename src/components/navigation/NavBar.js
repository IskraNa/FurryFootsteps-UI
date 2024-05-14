import React, { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './NavBar.css';
import Logo from '../../assets/logo.png';
import SignUpIcon from '../../assets/signup.png';
import LogInIcon from '../../assets/login.png';
import SearchBar from '../SearchBar';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState('');

    const handleLogout = async () => {
        localStorage.removeItem('userData');
        window.location.reload();
        try {
            const response = await fetch('http://localhost:8080/api/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Logout failed');
            }
    
            console.log('Logout successful');
            
            // Reload the window or navigate to the login page
            window.location.reload();
    
        } catch (error) {
            console.error('Logout error:', error.message);
            // Handle logout error
        }
    };

    const handleClick = () => {
        setOpen(!open);
    };

    const closeMenu = () => {
        setOpen(false);
    };

    useEffect(() => {
        
        

        const User = JSON.parse(localStorage.getItem('userData'));
        
        if (User && User.name) {
            setUser(User);
        }
        console.log(User)
        const handleResize = () => {
            if (window.innerWidth > 950) {
                setOpen(false);
            }
        };
        
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


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
                {user && (
                    <React.Fragment>
                        <li className="nav-item">
                            <div className="userName">
                                <h1> {user && <span>{user.name}</span>}</h1>
                            </div>
                        </li>
                        <li className="logout-btn"><button onClick={handleLogout}>Logout</button></li>
                    </React.Fragment>
                )}
                {!user && (
                    <React.Fragment>
                        <li className="nav-buttons">
                            <Link to="/register"><img src={SignUpIcon} alt="Signup" onClick={closeMenu} /></Link>
                            <Link to="/login"><img src={LogInIcon} alt="LogIn" onClick={closeMenu} /></Link>
                        </li>
                    </React.Fragment>
                )}
                {!open && !user && (
                    <li className="nav-search">
                        <SearchBar></SearchBar>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
