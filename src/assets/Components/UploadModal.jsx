import React, { useState } from 'react';
import './UploadModal.css';

export function UploadModal({ isOpen, onClose, onAdicionarMemoria }) {
  const [dataText, setDataText] = useState('');
  const [legenda, setLegenda] = useState('');
  const [qtdFotos, setQtdFotos] = useState(1);
  const [imagensPreview, setImagensPreview] = useState([]);

  if (!isOpen) return null;

  // Lida com o upload das imagens temporárias via URL.createObjectURL
  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Converte os arquivos em URLs temporárias de memória
    const newImageUrls = files.slice(0, qtdFotos).map((file) => URL.createObjectURL(file));
    setImagensPreview(newImageUrls);
  };

  // Reseta o número de fotos e limpa as imagens ao mudar a quantidade
  const handleQtdChange = (e) => {
    const valor = Number(e.target.value);
    setQtdFotos(valor);
    setImagensPreview([]);
  };

  // Envia a nova memória para a lista principal do site
  const handleSubmit = (e) => {
    e.preventDefault();

    if (imagensPreview.length === 0) {
      alert('Por favor, selecione pelo menos uma imagem!');
      return;
    }

    const novaMemoria = {
      data: dataText || 'dia --/--/----',
      texto: legenda,
      imagens: imagensPreview
    };

    onAdicionarMemoria(novaMemoria);
    
    // Limpa o formulário e fecha o modal
    setImagensPreview([]);
    setDataText('');
    setLegenda('');
    onClose();
  };

  return (
    <div className="upload-modal-overlay" onClick={onClose}>
      <div className="upload-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="upload-modal-close" onClick={onClose}>×</button>
        <h2>✨ Adicionar Nova Memória (Preview)</h2>
        <p className="upload-modal-subtitle">As alterações somem ao recarregar a página (F5).</p>

        <form onSubmit={handleSubmit}>
          <div className="upload-form-group">
            <label>Data:</label>
            <input
              type="text"
              placeholder="Ex: dia 14/04/2024"
              value={dataText}
              onChange={(e) => setDataText(e.target.value)}
            />
          </div>

          <div className="upload-form-group">
            <label>Quantidade de Fotos (Template 1 a 9):</label>
            <select value={qtdFotos} onChange={handleQtdChange}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <option key={num} value={num}>
                  Template {num} ({num} foto{num > 1 ? 's' : ''})
                </option>
              ))}
            </select>
          </div>

          <div className="upload-form-group">
            <label>Selecione até {qtdFotos} foto(s):</label>
            <input
              type="file"
              accept="image/*"
              multiple={qtdFotos > 1}
              onChange={handleImagesUpload}
            />
          </div>

          {imagensPreview.length > 0 && (
            <div className="upload-preview-box">
              <p>Pré-visualização do carregamento ({imagensPreview.length}/{qtdFotos}):</p>
              <div className="upload-preview-grid">
                {imagensPreview.map((src, idx) => (
                  <img key={idx} src={src} alt={`Upload ${idx}`} />
                ))}
              </div>
            </div>
          )}

          <div className="upload-form-group">
            <label>Legenda / Texto:</label>
            <textarea
              rows="3"
              placeholder="Escreva a legenda desta memória..."
              value={legenda}
              onChange={(e) => setLegenda(e.target.value)}
            />
          </div>

          <button type="submit" className="upload-submit-btn">
            Adicionar à Home
          </button>
        </form>
      </div>
    </div>
  );
}