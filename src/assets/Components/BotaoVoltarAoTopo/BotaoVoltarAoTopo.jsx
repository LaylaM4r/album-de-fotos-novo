import { useState, useEffect } from 'react';
import './BotaoVoltarAoTopo.css';

function BotaoVoltarAoTopo() {
    // Controla a visibilidade do botão com base na posição do scroll
    const [visivel, setVisivel] = useState(false);

    // Monitora a rolagem da página e adiciona/remove de evento
    useEffect(() => {
        const monitorarScroll = () => {
            // Exibe o botão se a rolagem vertical for maior que 300px
            if (window.scrollY > 300) {
                setVisivel(true);
            } else {
                setVisivel(false);
            }
        };

        window.addEventListener('scroll', monitorarScroll);
        
        // Remove o evento ao desmontar o componente para evitar vazamento de memória
        return () => window.removeEventListener('scroll', monitorarScroll);
    }, []);

    // Função para realizar a rolagem suave até o topo (posição 0)
    const irParaTopo = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button 
            className={`botao-topo-flutuante ${visivel ? 'visivel' : ''}`} 
            onClick={irParaTopo}
        >
            {/* Ícone de seta para cima */}
            <div className="circulo-preto-seta">
                <img src="/image/ArrowUp.svg" alt="Topo" />
            </div>

            {/* Rótulo de texto do botão */}
            <span className="texto-voltar">Voltar para o topo</span>
        </button>
    );
}

export default BotaoVoltarAoTopo;