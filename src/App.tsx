import { useContext } from "react"
import DataContext from "./context/DataContext";
import Header from "./components/header";
import Topo from "./components/secao-topo";
import Cards from "./components/secao-cards";

import './App.css';
import Menu from "./components/menu";


function App() {
  const { data, loading, error } = useContext(DataContext);

if (loading) return (<div className="load">Loading...</div>);
if (error) return (<div>{error}</div>);
  return (
    <div>
      <Header />
      {data && (
        <main>
          <Topo />
          <Menu />
          <Cards/>
        </main>
        )}
    </div>
    
  )
}

export default App
