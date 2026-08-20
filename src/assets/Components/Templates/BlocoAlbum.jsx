import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './BlocoAlbum.css';

function BlocoAlbum({ data, imagens = [], texto }) {
    const [fotoFoco, setFotoFoco] = useState(null);

    useEffect(() => {
        document.body.style.overflow = fotoFoco ? 'hidden' : 'auto';
    }, [fotoFoco]);

    // Limita o array para exibir no máximo 9 imagens
    const imagensExibidas = imagens.slice(0, 9);
    
    // Identifica quantas imagens serão exibidas para aplicar a classe dinâmica
    const qtdImagens = imagensExibidas.length;
    const classeGrade = `galeria-grid grid-qtd-${qtdImagens}`;

    return (
        <section className='bloco-album-container'>
            <h1 className='titulo-data-imagem-home'>_____{data}_____</h1>

            <div className='bloco-wrapper'>
                <div className={classeGrade}>
                    {imagensExibidas.map((img, index) => (
                        <img
                            key={index}
                            loading='lazy'
                            className='imagem-album'
                            src={img}
                            alt={`Foto ${index + 1}`}
                            onClick={() => setFotoFoco(img)}
                        />
                    ))}
                </div>

                {texto && <p className='texto-template-imagem-home'>{texto}</p>}
            </div>

            {/* Modal de Zoom */}
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