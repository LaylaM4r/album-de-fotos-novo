import React, { useState } from 'react';
import BlocoAlbum from '../assets/Components/Templates/BlocoAlbum';
import { UploadModal } from '../assets/Components/UploadModal/UploadModal.jsx';
import './home.css';

//renderiza a timeline iterando sobre os dados recebidos via props
function Home({ blocosAlbum, setBlocosAlbum, onAdicionarMemoria }) {
    // Estado apenas para controlar a abertura/fechamento do modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Estado para armazenar o índice do bloco que está sendo arrastado
    const [draggedIndex, setDraggedIndex] = useState(null);

    // Função para reordenar a lista trocando os elementos de posição
    const reordenarBlocos = (fromIndex, toIndex) => {
        if (fromIndex === toIndex) return;

        const novaLista = [...blocosAlbum];
        const [itemRemovido] = novaLista.splice(fromIndex, 1);
        novaLista.splice(toIndex, 0, itemRemovido);

        setBlocosAlbum(novaLista);
    };

    return (
        <div className="home-container">
            {/* Container do botão de teste/preview */}
            <div className="container-btn-upload">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-adicionar-memoria"
                >
                    <span className="btn-icon">+</span> Adicionar Foto/Memória
                </button>
            </div>

            {/* Modal para carregar imagens e criar blocos temporários */}
            <UploadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdicionarMemoria={onAdicionarMemoria}
            />

            {/* Mapeia a lista global para criar um bloco de álbum para cada registro de data */}
            {blocosAlbum.map((item, index) => (
                <BlocoAlbum
                    key={index}
                    index={index}           // Índice atual do item no array
                    data={item.data}       // Data de exibição no cabeçalho do bloco
                    imagens={item.imagens} // Lista de URLs das fotos do bloco
                    texto={item.texto}     // Texto descritivo/legenda do bloco
                    draggedIndex={draggedIndex}       // Estado que indica qual bloco está sendo arrastado
                    setDraggedIndex={setDraggedIndex} // Função para atualizar o bloco que está em movimento
                    onReorder={reordenarBlocos}       // Função para trocar a ordem dos blocos ao soltar
                />
            ))}
        </div>
    );
}

export default Home;