import { useState } from 'react';
import dadosJson from '../../Data/Datas.json';
import './Galeria.css';


function Galeria({ categoria }) {
    const [fotoAberta, setFotoAberta] = useState(null);

    // Filtra os itens do JSON correspondentes ao 'tipo' (ex: IMAGEMX, IMAGEMY, IMAGEMZ)
    const itensFiltrados = dadosJson.filter(item => item.tipo === categoria);

    return (
        <div className="galeria-container">
            <h1 className="galeria-titulo-principal">
                Galeria de imagens de <strong>{categoria}</strong>
            </h1>

            <div className="galeria-grid">
                {itensFiltrados.map((item, indexItem) => {
                    // Garante o acesso direto ao array 'imagens' do JSON
                    const listaImagens = item.imagens || [];

                    return listaImagens.map((url, indexImg) => (
                        <div
                            key={`${indexItem}-${indexImg}`}
                            className="galeria-item"
                            onClick={() => setFotoAberta({
                                url: url,
                                texto: item.texto,
                                data: item.data
                            })}
                        >
                            <img src={url} alt={`Memória ${categoria}`} />
                        </div>
                    ));
                })}
            </div>

            {/* MODAL COM ROLAGEM INTERNA */}
            {fotoAberta && (
                <div className="modal-overlay" onClick={() => setFotoAberta(null)}>
                    <button className="botao-fechar" onClick={() => setFotoAberta(null)}>
                        &times;
                    </button>

                    <div 
                        className="modal-wrapper-conteudo" 
                        onClick={(e) => e.stopPropagation()} /* Impede de fechar ao clicar no conteúdo do modal */
                    >
                        <img
                            className="galeria-modal-imagem"
                            src={fotoAberta.url}
                            alt="Expandida"
                        />

                        <div className='galeria-imagem-container'>
                            {fotoAberta.data && (
                                <p className='galeria-imagem-container-data'>{fotoAberta.data}</p>
                            )}
                            {fotoAberta.texto && (
                                <h3 className='galeria-imagem-container-texto'>{fotoAberta.texto}</h3>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Galeria;