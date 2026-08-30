import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Pages/NavBar/NavBar';
import Galeria from './Pages/Galeria/Galeria';
import BotaoVoltarAoTopo from './assets/Components/BotaoVoltarAoTopo/BotaoVoltarAoTopo';
import Footer from './Pages/Footer/Footer';
import dadosJson from './Data/Datas.json'; // Importação dos dados iniciais do JSON

function App() {
  // Estado global para armazenar a lista de blocos/memórias (JSON + temporários do modal)
  const [blocosAlbum, setBlocosAlbum] = useState(dadosJson);

  // Função central para adicionar novas memórias no topo da timeline
  const handleAdicionarMemoria = (novaMemoria) => {
    setBlocosAlbum([novaMemoria, ...blocosAlbum]);
  };

  return (
    <Router>
      {/* Menu de navegação fixo em todas as páginas */}
      <Navbar />

      {/* Mapeamento das rotas da aplicação */}
      <Routes>
        {/* Rota principal (página inicial) enviando o estado e a função de envio */}
        <Route 
          path="/" 
          element={
            <Home 
              blocosAlbum={blocosAlbum} 
              onAdicionarMemoria={handleAdicionarMemoria} 
            />
          } 
        />

        {/* Rotas de galerias filtradas por categoria enviando a lista de blocos atualizada */}
        <Route path="/IMAGEMX" element={<Galeria categoria="IMAGEMX" blocosAlbum={blocosAlbum} />} />
        <Route path="/IMAGEMY" element={<Galeria categoria="IMAGEMY" blocosAlbum={blocosAlbum} />} />
        <Route path="/IMAGEMZ" element={<Galeria categoria="IMAGEMZ" blocosAlbum={blocosAlbum} />} />
      </Routes>

      {/* Componentes utilitários e de rodapé globais */}
      <BotaoVoltarAoTopo />
      <Footer />
    </Router>
  );
}

export default App;