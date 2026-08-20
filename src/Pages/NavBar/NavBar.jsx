import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

function Navbar() {
    const location = useLocation();

    //armazena o estado atual do dark-mode
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    return (
        <nav className='home-container-nav'>
            <Link to="/" className={`home-container-nav-button ${location.pathname === '/' ? 'active-link' : ''}`}>Home</Link>
            <Link to="/IMAGEMX" className={`home-container-nav-button ${location.pathname === '/IMAGEMX' ? 'active-link' : ''}`}>IMAGEMX</Link>
            <Link to="/IMAGEMY" className={`home-container-nav-button ${location.pathname === '/IMAGEMY' ? 'active-link' : ''}`}>IMAGEMY</Link>
            <Link to="/IMAGEMZ" className={`home-container-nav-button ${location.pathname === '/IMAGEMZ' ? 'active-link' : ''}`}>IMAGEMZ</Link>


            <div className="dark-mode-container">
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={isDarkMode}
                        onChange={() => setIsDarkMode(!isDarkMode)}
                    />
                    <span className="slider">
                        <span className="icon">
                            <img
                                src={isDarkMode ? './image/Moon.svg' : './image/Sun.svg'}
                                alt={isDarkMode ? 'Moon' : 'Sun'}
                                className="toggle-icon-img"
                            />
                        </span>
                    </span>
                </label>
            </div>
        </nav>
    );
}

export default Navbar;