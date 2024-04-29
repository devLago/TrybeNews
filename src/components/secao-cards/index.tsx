import { useState, useContext } from "react";
import DataContext from "../../context/DataContext";
import icone from '../../assets/icone-vazio.jpg';
import favorito from '../../assets/icone-cheio.jpg';

import './style.css';

function Cards() {
	const { data, favoritos, toggleFavorito, calcularTempoDecorrido } = useContext(DataContext);
  const [visibleCards, setVisibleCards] = useState(12);

  const coracaoSrc = (id: number) => {
    const isFavorito = favoritos.some((item) => item.id === id);
    return isFavorito ? favorito : icone;
  };
  const handleShowMore = () => {
    setVisibleCards(prevVisibleCards => prevVisibleCards + 12);
  };
  return(
    <main>
      <section className="container-cards">
        {data.slice(1, visibleCards + 1).map((item, index) => (
          index < visibleCards && 
          <div className="cards" key={index}>
            <div className='cabecalho-card'>
              <h2>{item.titulo}</h2>
              <p>{item.introducao}</p>
            </div>
            <div className="data-e-favoritar">
               <p>{calcularTempoDecorrido(item.data)}</p>
               <button>
                 <a href={item.link}>
                  Leia a Notícia Aqui
                 </a>
               </button>
            </div>
            <div className="favoritar">
              <button  onClick={() => toggleFavorito(item.id)} className="btn-icon">
                <img
                  src={coracaoSrc(item.id)}
                  alt="Favorito"
                  className="icon"
                />
              </button>
            </div>
          </div>
        ))}
      </section>
      <div className='btn-morecards'>
        {data.length > visibleCards && (
          <button onClick={handleShowMore}>Mostrar mais</button>
        )} 
      </div>
    </main>
  )
}

export default Cards;