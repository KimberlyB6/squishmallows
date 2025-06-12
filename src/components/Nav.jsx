import '../css/Nav.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Nav = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleNav = () => {
        setMenuOpen(!menuOpen);
    }
    return (
        <nav id="main-nav">
            <header className="header-bar">
                <div className="container nav-bar">
                    <div className="logo">
                        <a href="/">
                            <img src="/squishmallows/images/Logo.png" alt="Squish & Sweets Central Logo" />
                        </a>
                    </div>
                    <div className="logo-title">Squish &amp; Sweets Central</div>
                    <ul className={menuOpen ? " " : "hide-small"}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/Desserts">Desserts</Link></li>
                        <li><Link to="/Gallery">Squishmallow</Link></li>
                        <li><Link to="/Music">Music</Link></li>
                        <li><Link to="/Shop">Shop</Link></li>
                    </ul>
                    <div className="user-menu">
                        <div>Kimberly Brown</div>
                        <img src="/squishmallows/images/home/user.jpg" alt="User" width="24" height="24" />
                    </div>
                    <button id="toggle-nav" onClick={toggleNav}>ꕥ</button>
                </div>
            </header>
        </nav>
    );
};
export default Nav;