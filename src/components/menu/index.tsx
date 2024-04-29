import { useContext } from 'react';
import DataContext  from '../../context/DataContext';

import './style.css';

function Menu() {
  const { fetchDataForSection } = useContext(DataContext);

  return (
    <section className='secao-menu'>
      <div className='container-menu'>
      <h3 onClick={() => fetchDataForSection('Mais Recentes')}>Mais Recentes</h3>
        <h3 onClick={() => fetchDataForSection('Release')}>Release</h3>
        <h3 onClick={() => fetchDataForSection('Notícia')}>Notícia</h3>
        <h3 onClick={() => fetchDataForSection('Favoritas')}>Favoritas</h3>
      </div>
    </section>
  )
}

export default Menu;