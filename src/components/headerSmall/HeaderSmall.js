import React from 'react';
import Navbar from '../navigation/NavBar';
import './HeaderSmall.css'; // Import the CSS file


const HeaderSmall = () => {
    return (
        <div className={'navbarStyle'}>
            <Navbar/>
        </div>
    );
}

export default HeaderSmall;
