import React, { useState } from 'react';
import BlocoAlbum from '../assets/Components/Templates/BlocoAlbum';
import dadosJson from '../Data/Datas.json';
import { UploadModal } from '../assets/Components/UploadModal.jsx';
import './home.css'

//renderiza a timeline iterando sobre os dados do JSON
function Home() {
    // Estado local para permitir a inserção de novas memórias temporárias
    const [blocosAlbum, setBlocosAlbum] = useState(dadosJson);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Adiciona o novo bloco no topo da timeline
    const handleAdicionarMemoria = (novaMemoria) => {
        setBlocosAlbum([novaMemoria, ...blocosAlbum]);
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
                onAdicionarMemoria={handleAdicionarMemoria}
            />

            {/* Mapeia o JSON para criar um bloco de álbum para cada registro de data */}
            {blocosAlbum.map((item, index) => (
                <BlocoAlbum 
                    key={index}
                    data={item.data}       // Data de exibição no cabeçalho do bloco
                    imagens={item.imagens} // Lista de URLs das fotos do bloco
                    texto={item.texto}     // Texto descritivo/legenda do bloco
                />
            ))}
        </div>
    );
}

export default Home;