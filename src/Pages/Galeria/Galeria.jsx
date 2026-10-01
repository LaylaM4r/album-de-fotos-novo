import { useState } from 'react';
import './Galeria.css';

// Componente para listar e filtrar imagens por categoria com modal detalhado
function Galeria({ categoria, blocosAlbum = [] }) {
    // Guarda o objeto da foto ativa no modal ({ url, texto, data }) ou null se fechado
    const [fotoAberta, setFotoAberta] = useState(null);

    // Filtra estritamente mantendo apenas os blocos cuja categoria corresponda à página atual
    const itensFiltrados = blocosAlbum.filter(item => item.tipo === categoria);

    return (
        <div className="galeria-container">
            {/* Título dinamizado pela categoria recebida via prop */}
            <h1 className="galeria-titulo-principal">
                Galeria de imagens de <strong>{categoria}</strong>
            </h1>

            {/* Grade que renderiza a lista completa de imagens filtradas */}
            <div className="galeria-grid">
                {itensFiltrados.map((item, indexItem) => {
                    // Fallback para evitar erro caso o campo 'imagens' venha indefinido
                    const listaImagens = item.imagens || [];

                    return listaImagens.map((url, indexImg) => (
                        <div
                            key={`${indexItem}-${indexImg}`}
                            className="galeria-item"
                            // Salva a imagem e os metadados (data/texto) no estado para abrir o modal
                            onClick={() => setFotoAberta({
                                url: url,
                                nome: item.nomesImagens?.[indexImg],
                                texto: item.texto,
                                data: item.data
                            })}
                        >
                            {/* Imagem do item da galeria com texto alternativo dinâmico */}
                            <img src={url} alt={item.nomesImagens?.[indexImg] || `Memória ${categoria}`} />
                        </div>
                    ));
                })}
            </div>

            {/* Modal de visualização expandida com informações complementares */}
            {fotoAberta && (
                <div className="modal-overlay" onClick={() => setFotoAberta(null)}>
                    {/* Botão de fechar o modal */}
                    <button className="botao-fechar" onClick={() => setFotoAberta(null)}>
                        &times;
                    </button>

                    {/* Container interno do modal (evita o fechamento ao clicar no conteúdo) */}
                    <div 
                        className="modal-wrapper-conteudo" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Imagem em tamanho expandido */}
                        <img
                            className="galeria-modal-imagem"
                            src={fotoAberta.url}
                            alt={fotoAberta.nome || 'Expandida'}
                        />

                        {/* Bloco de dados complementares (Data e Texto descritivo) */}
                        <div className='galeria-imagem-container'>
                            {fotoAberta.data && (
                                <p className='galeria-imagem-container-data'>{fotoAberta.data}</p>
                            )}
                            {fotoAberta.nome && (
                                <p className='galeria-imagem-container-data'>{fotoAberta.nome}</p>
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