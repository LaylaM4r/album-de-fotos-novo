import React, { useState } from 'react';
import './UploadModal.css';

export function UploadModal({ isOpen, onClose, onAdicionarMemoria }) {
  const [dataText, setDataText] = useState('');
  const [legenda, setLegenda] = useState('');
  const [qtdFotos, setQtdFotos] = useState(1);
  const [imagensPreview, setImagensPreview] = useState([]);

  if (!isOpen) return null;

  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newImageUrls = files.slice(0, qtdFotos).map((file) => URL.createObjectURL(file));
    setImagensPreview(newImageUrls);
  };

  const handleQtdChange = (e) => {
    const valor = Number(e.target.value);
    setQtdFotos(valor);
    setImagensPreview([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (imagensPreview.length === 0) {
      alert('Por favor, selecione pelo menos uma imagem!');
      return;
    }

    const novaMemoria = {
      data: dataText ? `dia ${dataText}` : 'dia --/--/----',
      texto: legenda,
      imagens: imagensPreview
    };

    onAdicionarMemoria(novaMemoria);
    
    setImagensPreview([]);
    setDataText('');
    setLegenda('');
    onClose();
  };

  return (
    <div className="upload-modal-overlay" onClick={onClose}>
      <div className="upload-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Botão de Fechar (X) */}
        <button className="upload-modal-close" onClick={onClose} aria-label="Fechar modal">
          ×
        </button>

        <h2 className="upload-modal-title">Adicionar novas memórias:</h2>

        <form onSubmit={handleSubmit}>
          <div className="upload-form-group">
            <label>Data:</label>
            <input
              type="text"
              placeholder="Ex:14/04/2024"
              value={dataText}
              onChange={(e) => setDataText(e.target.value)}
            />
          </div>

          <div className="upload-form-group">
            <label>Template:</label>
            <select value={qtdFotos} onChange={handleQtdChange}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <option key={num} value={num}>
                  Template {num} ({num} foto{num > 1 ? 's' : ''})
                </option>
              ))}
            </select>
          </div>

          <div className="upload-form-group">
            <label>Selecione uma foto:</label>
            <input
              type="file"
              accept="image/*"
              multiple={qtdFotos > 1}
              onChange={handleImagesUpload}
              className="upload-file-input"
            />
          </div>

          {/* Área de Preview das Imagens Selecionadas */}
          {imagensPreview.length > 0 && (
            <div className="upload-preview-box">
              <span className="upload-preview-label">
                Pré-visualização ({imagensPreview.length}/{qtdFotos}):
              </span>
              <div className="upload-preview-grid">
                {imagensPreview.map((src, idx) => (
                  <img key={idx} src={src} alt={`Preview ${idx + 1}`} />
                ))}
              </div>
            </div>
          )}

          <div className="upload-form-group">
            <label>Legenda texto</label>
            <textarea
              rows="2"
              placeholder="Escreve a legenda desta memória..."
              value={legenda}
              onChange={(e) => setLegenda(e.target.value)}
            />
          </div>

          <button type="submit" className="upload-submit-btn">
            Adicionar Memória
          </button>
        </form>
      </div>
    </div>
  );
}