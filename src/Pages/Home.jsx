import BlocoAlbum from '../assets/Components/Templates/BlocoAlbum';
import dadosJson from '../Data/Datas.json';

function Home() {
    return (
        <div className="home-container">
            {dadosJson.map((item, index) => (
                <BlocoAlbum 
                    key={index}
                    data={item.data}
                    imagens={item.imagens}
                    texto={item.texto}
                />
            ))}
        </div>
    );
}

export default Home;