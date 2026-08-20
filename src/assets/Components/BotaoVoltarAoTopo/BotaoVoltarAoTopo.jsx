import { useState, useEffect } from 'react';
import './BotaoVoltarAoTopo.css';

function BotaoVoltarAoTopo() {
    const [visivel, setVisivel] = useState(false);

    useEffect(() => {
        const monitorarScroll = () => {
            if (window.scrollY > 300) {
                setVisivel(true);
            } else {
                setVisivel(false);
            }
        };
        window.addEventListener('scroll', monitorarScroll);
        return () => window.removeEventListener('scroll', monitorarScroll);
    }, []);

    const irParaTopo = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button 
            className={`botao-topo-flutuante ${visivel ? 'visivel' : ''}`} 
            onClick={irParaTopo}
        >
            <div className="circulo-preto-seta">
                <img src="/image/ArrowUp.svg" alt="Topo" />
            </div>
            <span className="texto-voltar">Voltar para o topo</span>
        </button>
    );
}

export default BotaoVoltarAoTopo;