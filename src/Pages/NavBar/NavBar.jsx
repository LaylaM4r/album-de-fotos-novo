import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

function Navbar() {
    // Obtém a rota atual para destacar o link ativo no menu
    const location = useLocation();

    // Inicializa o estado do tema recuperando a preferência salva no localStorage
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    // Sincroniza a classe 'dark-mode' do <body> e mantém o tema no localStorage
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
            {/* Links de navegação com classe condicional para o item ativo */}
            <Link to="/" className={`home-container-nav-button ${location.pathname === '/' ? 'active-link' : ''}`}>Home</Link>
            <Link to="/IMAGEMX" className={`home-container-nav-button ${location.pathname === '/IMAGEMX' ? 'active-link' : ''}`}>IMAGEMX</Link>
            <Link to="/IMAGEMY" className={`home-container-nav-button ${location.pathname === '/IMAGEMY' ? 'active-link' : ''}`}>IMAGEMY</Link>
            <Link to="/IMAGEMZ" className={`home-container-nav-button ${location.pathname === '/IMAGEMZ' ? 'active-link' : ''}`}>IMAGEMZ</Link>

            {/* Toggle switch para alternar entre tema claro e escuro */}
            <div className="dark-mode-container">
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={isDarkMode}
                        onChange={() => setIsDarkMode(!isDarkMode)} // Inverte o estado do tema
                    />
                    <span className="slider">
                        <span className="icon">
                            {/* Ícone dinâmico do botão (Sol/Lua) de acordo com o tema ativo */}
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