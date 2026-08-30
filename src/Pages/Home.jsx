import React, { useState } from 'react';
import BlocoAlbum from '../assets/Components/Templates/BlocoAlbum';
import dadosJson from '../Data/Datas.json';
import { UploadModal } from '../assets/Components/UploadModal.jsx'

//renderiza a timeline sobre os dados do JSON
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
            {/* Botão de teste/preview para abrir o modal de upload */}
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: '4px' }}
                >
                    ➕ Adicionar Foto/Memória (Modo Teste)
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