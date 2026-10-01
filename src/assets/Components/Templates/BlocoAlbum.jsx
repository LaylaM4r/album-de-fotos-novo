import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './BlocoAlbum.css';

// Componente visual para renderizar um bloco de fotos com layout dinâmico e zoom
function BlocoAlbum({ 
    data, 
    imagens = [], 
    nomesImagens = [],
    template,
    texto, 
    index, 
    draggedIndex, 
    setDraggedIndex, 
    onReorder 
}) {
    // Armazena a URL da imagem selecionada para exibição no modal (null = fechado)
    const [fotoFoco, setFotoFoco] = useState(null);
    // Controla o estado de hover durante o arrasto para exibir a dropzone pontilhada
    const [isDragOver, setIsDragOver] = useState(false);

    // Contador de nós para evitar disparos falsos de dragLeave ao passar por filhos do elemento
    const dragCounter = useRef(0);

    // Bloqueia a rolagem da página principal quando o modal de imagem está aberto
    useEffect(() => {
        document.body.style.overflow = fotoFoco ? 'hidden' : 'auto';
    }, [fotoFoco]);

    // Limita o array para exibir no máximo 9 imagens
    const imagensExibidas = imagens.slice(0, 9);
    
    // Calcula a classe CSS dinâmica conforme o número de imagens (ex: grid-qtd-3)
    const qtdImagens = imagensExibidas.length;
    const classeGrade = `galeria-grid grid-qtd-${template || qtdImagens}`;

    // Disparado quando o usuário inicia o arrasto do bloco
    const handleDragStart = (e) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = "move";

        // --- INÍCIO DA CRIAÇÃO DA MINIATURA CUSTOMIZADA ---
        const originalNode = e.currentTarget;
        const dragNode = originalNode.cloneNode(true);

        // Remove a classe de arrasto e alvo do clone caso existam
        dragNode.classList.remove('dragging', 'drop-target-active');
        // Adiciona classe para estilização via CSS
        dragNode.classList.add('drag-preview-custom');

        // Posiciona fora da tela visível para captura do navegador
        dragNode.style.position = 'absolute';
        dragNode.style.top = '-9999px';
        dragNode.style.left = '-9999px';

        document.body.appendChild(dragNode);

        // Define o clone estilizado como imagem fantasma do cursor
        e.dataTransfer.setDragImage(dragNode, 20, 20);

        // Remove o clone do DOM logo após o navegador capturar a imagem
        setTimeout(() => {
            if (document.body.contains(dragNode)) {
                document.body.removeChild(dragNode);
            }
        }, 0);
        // --- FIM DA CRIAÇÃO DA MINIATURA ---
    };

    // Permite que o bloco seja um alvo válido para soltar (drop)
    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    // Disparado quando o bloco em movimento entra sobre este bloco ou seus filhos
    const handleDragEnter = (e) => {
        e.preventDefault();
        dragCounter.current += 1;
        if (draggedIndex !== null && draggedIndex !== index) {
            setIsDragOver(true);
        }
    };

    // Disparado quando o bloco em movimento sai do bloco ou de um dos seus filhos
    const handleDragLeave = (e) => {
        e.preventDefault();
        dragCounter.current -= 1;
        // Só desativa o estado visual se realmente tiver saído do elemento pai principal
        if (dragCounter.current === 0) {
            setIsDragOver(false);
        }
    };

    // Disparado quando o bloco em movimento é solto sobre este bloco
    const handleDrop = (e) => {
        e.preventDefault();
        dragCounter.current = 0;
        setIsDragOver(false); // Reseta o estado de hover
        if (draggedIndex !== null) {
            onReorder(draggedIndex, index); // Reordena trocando as posições
            setDraggedIndex(null);          // Reseta o estado de arrasto
        }
    };

    return (
        <section 
            className={`bloco-album-container ${draggedIndex === index ? 'dragging' : ''} ${isDragOver ? 'drop-target-active' : ''}`}
            draggable // Torna o container arrastável via Drag and Drop nativo do HTML5
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {/* Camada pontilhada de indicação para soltar o template (transição de fade via CSS) */}
            <div className="dropzone-overlay">
                <span>Arraste e solte o template aqui</span>
            </div>

            {/* Cabeçalho do bloco com a data e o ícone de arraste */}
            <div className="bloco-cabecalho">
                {/* Título com a data do bloco */}
                <h1 className='titulo-data-imagem-home'>_____{data}_____</h1>

                {/* Ícone de hambúrguer (Drag Handle) para indicar ao usuário que o elemento pode ser movido */}
                <div className="drag-handle" title="Clique e arraste para reordenar">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div className='bloco-wrapper'>
                {/* Grade de fotos estilizada pela classe dinâmica */}
                <div className={classeGrade}>
                    {imagensExibidas.map((img, indexImg) => (
                        <img
                            key={indexImg}
                            loading='lazy' // Carregamento sob demanda para performance
                            className='imagem-album'
                            src={img}
                            alt={nomesImagens[indexImg] || `Foto ${indexImg + 1}`}
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