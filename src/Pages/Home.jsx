import BlocoAlbum from '../assets/Components/Templates/BlocoAlbum';
import dadosJson from '../Data/Datas.json';

//renderiza a timeline iterando sobre os dados do JSON
function Home() {
    return (
        <div className="home-container">
            {/* Mapeia o JSON para criar um bloco de álbum para cada registro de data */}
            {dadosJson.map((item, index) => (
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