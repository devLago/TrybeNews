import { useContext } from "react";
import DataContext from "../../context/DataContext";
import icone from '../../assets/icone-vazio.jpg';
import favorito from '../../assets/icone-cheio.jpg';

import './style.css';

function Topo() {
	const { data, favoritos, toggleFavorito, calcularTempoDecorrido } = useContext(DataContext);

  const coracaoSrc = (id: number) => {
    const isFavorito = favoritos.some((item) => item.id === id);
    return isFavorito ? favorito : icone;
  };

  return (
    <section className="container">
      <div className="img-destaque">
        <img src={`http://agenciadenoticias.ibge.gov.br/${JSON.parse(data[0].image).image_fulltext}`} alt={data[0].titulo} />
      </div>
      <div className="card">
        <div className="data-card">
          <p className="destaque">Noticia mais Recente</p>
          <button  onClick={() => toggleFavorito(data[0].id)} className="btn-icon">
            <img
              src={coracaoSrc(data[0].id)}
              alt="Favorito"
              className="icon"
            />
          </button>
        </div>
        <div className="conteudo-card">
          <h2>{data[0].titulo}</h2>
          <p>{data[0].introducao}</p>
        </div>
        <div className="data-card">
          <p>{calcularTempoDecorrido(data[0].data)}</p>
          <button className="btn-link">
            <a href={data[0].link}>
              Leia a Notícia Aqui
            </a>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Topo;