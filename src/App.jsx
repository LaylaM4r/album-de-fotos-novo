import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Pages/NavBar/NavBar';
import Galeria from './Pages/Galeria/Galeria';
import BotaoVoltarAoTopo from './assets/Components/BotaoVoltarAoTopo/BotaoVoltarAoTopo';
import Footer from './Pages/Footer/Footer';

function App() {
  return (
    <Router>
      {/* Menu de navegação fixo em todas as páginas */}
      <Navbar />

      {/* Mapeamento das rotas da aplicação */}
      <Routes>
        {/* Rota principal (página inicial) */}
        <Route path="/" element={<Home />} />

        {/* Rotas de galerias filtradas por categoria */}
        <Route path="/IMAGEMX" element={<Galeria categoria="IMAGEMX" />} />
        <Route path="/IMAGEMY" element={<Galeria categoria="IMAGEMY" />} />
        <Route path="/IMAGEMZ" element={<Galeria categoria="IMAGEMZ" />} />
      </Routes>

      {/* Componentes utilitários e de rodapé globais */}
      <BotaoVoltarAoTopo />
      <Footer />
    </Router>
  );
}

export default App;