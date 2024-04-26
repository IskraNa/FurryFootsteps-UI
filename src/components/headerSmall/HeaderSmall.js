import React, {useEffect, useState} from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './HeaderSmall.css';
import Logo from '../../assets/logo.png';
import SignUpIcon from '../../assets/signup.png';
import LogInIcon from '../../assets/login.png';
import SearchBar from '../SearchBar';

const HeaderSmall = () => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const closeMenu = () => {
        setOpen(false);
    };

    useEffect(() => {
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
        <nav className="navbar-small">
            <Link to="/" className="nav-logo-small">
                <img src={Logo} alt="Logo" />
            </Link>
            <div onClick={handleClick} className="nav-icon-small">
                {open ? <FiX /> : <FiMenu />}
            </div>
            <ul className={open ? 'nav-links-small active' : 'nav-links-small'}>
                <li className="nav-item-small">
                    <Link to="/" className="nav-link-small" onClick={closeMenu}>
                        Home
                    </Link>
                </li>
                <li className="nav-item-small">
                    <Link to="/category" className="nav-link-small" onClick={closeMenu}>
                        Category
                    </Link>
                </li>
                <li className="nav-item-small">
                    <Link to="/about" className="nav-link-small" onClick={closeMenu}>
                        About
                    </Link>
                </li>
                <li className="nav-item-small">
                    <Link to="/contact" className="nav-link-small" onClick={closeMenu}>
                        Contact
                    </Link>
                </li>
                <li className="nav-buttons-small">

                    <Link to="/register"> <img src={SignUpIcon} alt="Signup" onClick={closeMenu} /></Link>
                    <Link to="/login"><img src={LogInIcon} alt="LogIn" onClick={closeMenu} /></Link>
                </li>
                { !open ? <li className="nav-search-small">
                    <SearchBar></SearchBar>
                </li> : ""
                }
            </ul>
        </nav>
    );
};

export default HeaderSmall;
