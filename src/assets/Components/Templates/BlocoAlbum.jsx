import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './BlocoAlbum.css';

// Componente visual para renderizar um bloco de fotos com layout dinâmico e zoom
function BlocoAlbum({ data, imagens = [], texto }) {
    // Armazena a URL da imagem selecionada para exibição no modal (null = fechado)
    const [fotoFoco, setFotoFoco] = useState(null);

    // Bloqueia a rolagem da página principal quando o modal de imagem está aberto
    useEffect(() => {
        document.body.style.overflow = fotoFoco ? 'hidden' : 'auto';
    }, [fotoFoco]);

    // Limita o array para exibir no máximo 9 imagens
    const imagensExibidas = imagens.slice(0, 9);
    
    // Calcula a classe CSS dinâmica conforme o número de imagens (ex: grid-qtd-3)
    const qtdImagens = imagensExibidas.length;
    const classeGrade = `galeria-grid grid-qtd-${qtdImagens}`;

    return (
        <section className='bloco-album-container'>
            {/* Título com a data do bloco */}
            <h1 className='titulo-data-imagem-home'>_____{data}_____</h1>

            <div className='bloco-wrapper'>
                {/* Grade de fotos estilizada pela classe dinâmica */}
                <div className={classeGrade}>
                    {imagensExibidas.map((img, index) => (
                        <img
                            key={index}
                            loading='lazy' // Carregamento sob demanda para performance
                            className='imagem-album'
                            src={img}
                            alt={`Foto ${index + 1}`}
                            onClick={() => setFotoFoco(img)} // Abre modal ao clicar
                        />
                    ))}
                </div>

                {/* Exibe o texto descritivo apenas se a prop for informada */}
                {texto && <p className='texto-template-imagem-home'>{texto}</p>}
            </div>

            {/* Modal de zoom renderizado */}
            {fotoFoco && createPortal(
                <div className="modal-overlay" onClick={() => setFotoFoco(null)}>
                    <button className="botao-fechar" onClick={() => setFotoFoco(null)}>&times;</button>
                    <img src={fotoFoco} className="modal-imagem" alt="Expandida" />
                </div>,
                document.body
            )}
        </section>
    );
}

export default BlocoAlbum;