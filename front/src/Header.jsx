import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-title">ITMO prac 3</div>
            <nav className="header-nav">
                <Link to="/glossary" className="nav-link">Glossary</Link>
                <Link to="/semantic-graph" className="nav-link">Semantic Graph</Link>
                <Link to="/admin" className="nav-link">Admin</Link>
            </nav>
        </header>
    );
};

export default Header;
