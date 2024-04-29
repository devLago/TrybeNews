import imagem from '../../assets/trybe.jpg';
import './style.css';

function Header() {
  return (
  <header>
		<img src={imagem} alt="trybe-logo" />
		<h1>TRYBE NEWS</h1>
	</header>
  )
}

export default Header;