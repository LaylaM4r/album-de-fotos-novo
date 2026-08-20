import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Pages/NavBar/NavBar';
import Galeria from './Pages/Galeria/Galeria';
import BotaoVoltarAoTopo from './assets/Components/BotaoVoltarAoTopo/BotaoVoltarAoTopo';
import Footer from './Pages/Footer/Footer';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/IMAGEMX" element={<Galeria categoria="IMAGEMX" />} />
        <Route path="/IMAGEMY" element={<Galeria categoria="IMAGEMY" />} />
        <Route path="/IMAGEMZ" element={<Galeria categoria="IMAGEMZ" />} />
      </Routes>
      <BotaoVoltarAoTopo />
      <Footer />
    </Router>
  );
}

export default App;