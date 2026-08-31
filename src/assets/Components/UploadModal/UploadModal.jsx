import React, { useState } from 'react';
import './UploadModal.css';

export function UploadModal({ isOpen, onClose, onAdicionarMemoria }) {
  const [dataText, setDataText] = useState('');
  const [legenda, setLegenda] = useState('');
  const [qtdFotos, setQtdFotos] = useState(1);
  const [categoria, setCategoria] = useState('IMAGEMX'); // Categoria/Galeria selecionada
  const [imagensPreview, setImagensPreview] = useState([]);

  if (!isOpen) return null;

  // Função para aplicar a máscara de data (DD/MM/AAAA)
  const handleDataChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 8) {
      value = value.slice(0, 8);
    }

    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }

    if (value.length > 5) {
      value = `${value.slice(0, 5)}/${value.slice(5)}`;
    }

    setDataText(value);
  };

  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Limite de 5MB por foto (5 * 1024 * 1024 bytes)
    const MAX_SIZE_MB = 5;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

    const fotosValidas = [];

    for (const file of files) {
      // Verifica se o tamanho do arquivo ultrapassa o limite
      if (file.size > MAX_SIZE_BYTES) {
        alert(`A imagem "${file.name}" excede o limite de ${MAX_SIZE_MB}MB e não foi adicionada.`);
      } else {
        fotosValidas.push(file); // Adiciona apenas as fotos dentro do limite
      }
    }

    // Se nenhuma foto for válida, interrompe e limpa o input
    if (fotosValidas.length === 0) {
      e.target.value = ''; 
      return;
    }

    // Cria as URLs temporárias apenas com as fotos válidas
    const newImageUrls = fotosValidas.slice(0, qtdFotos).map((file) => URL.createObjectURL(file));
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
      imagens: imagensPreview,
      tipo: categoria // Define exclusivamente a galeria de destino
    };

    onAdicionarMemoria(novaMemoria);

    setImagensPreview([]);
    setDataText('');
    setLegenda('');
    setCategoria('IMAGEMX');
    onClose();
  };

  return (
    <div className="upload-modal-overlay" onClick={onClose}>
      <div className="upload-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="upload-modal-close" onClick={onClose} aria-label="Fechar modal">
          ×
        </button>

        <h2 className="upload-modal-title">Adicionar novas memórias:</h2>
        <p className="upload-modal-subtitle">
          (As fotos são exibidas apenas na sua sessão e não ficam salvas em servidor) (Pressionando F5 o site volta ao padrão)
        </p>

        <form onSubmit={handleSubmit}>
          <div className="upload-form-group">
            <label>Data:</label>
            <input
              type="text"
              placeholder="Ex: 14/04/2024"
              value={dataText}
              onChange={handleDataChange}
              maxLength={10}
              inputMode="numeric"
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
            <label>Selecione uma foto (máx. 5MB):</label>
            <input
              type="file"
              accept="image/*"
              multiple={qtdFotos > 1}
              onChange={handleImagesUpload}
              className="upload-file-input"
            />
          </div>

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
              placeholder="Escreva a legenda desta memória..."
              value={legenda}
              onChange={(e) => setLegenda(e.target.value)}
            />
          </div>

          {/* Seleção da Galeria / Categoria */}
          <div className="upload-form-group">
            <label>Galeria de Destino:</label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="IMAGEMX">Galeria IMAGEMX</option>
              <option value="IMAGEMY">Galeria IMAGEMY</option>
              <option value="IMAGEMZ">Galeria IMAGEMZ</option>
            </select>
          </div>

          <button type="submit" className="upload-submit-btn">
            Adicionar Fotos
          </button>
        </form>
      </div>
    </div>
  );
}