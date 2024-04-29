import { useEffect, useState } from "react";
import DataContext from "../context/DataContext";
import { ApiType, DataType } from "../type";

type DataProviderType = {
    children: React.ReactNode;
  };

export default function DataProvider({ children }: DataProviderType) {
	const [data, setData] = useState<DataType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [favoritos, setFavoritos] = useState<DataType[]>([]);

  useEffect(() => {
	const fetchData = async () => {
		try {
		const response = await fetch('http://servicodados.ibge.gov.br/api/v3/noticias/');
		const jsonData = await response.json();
		const dataItem = jsonData.items;
		const filteredData = filterDataKeys(dataItem);
		setData(filteredData);
		setLoading(false);
		} catch (e) {
		setError('Erro ao carregar dados da API');
		}

    const storedFavoritos = localStorage.getItem('favoritos');
    if (storedFavoritos) {
      setFavoritos(JSON.parse(storedFavoritos));
    }
	};
	fetchData();
}, []);

const fetchDataForSection = async (section: string) => {
  let url = '';

  if (section === 'Release') {
    url = 'https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=releases';
  } else if (section === 'Notícia') {
    url = 'https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia';
  } else if (section === 'Mais Recentes') {
    url = 'http://servicodados.ibge.gov.br/api/v3/noticias/';
  } 
  
  if (section === 'Favoritas' && favoritos.length > 0) {
    setLoading(true);
    setData(favoritos);
    setLoading(false);
    return;
  }

  if (url) {
    setLoading(true);
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      const dataItem = jsonData.items;
      const filteredData = filterDataKeys(dataItem);
      setData(filteredData);
      setLoading(false);
    } catch (error) {
      setError('Erro ao carregar dados da API');
      setLoading(false);
    }
  }
};

const filterDataKeys = (data: ApiType[]) => {
	return data.map((key) => {
    return {
      id: key.id,
      tipo: key.tipo,
      titulo: key.titulo,
      introducao: key.introducao,
      data: key.data_publicacao,
      image: key.imagens,
      link: key.link,
		};
	});
  };

  const toggleFavorito = (id: number) => {
    const isFavorito = favoritos.some((item: DataType) => item.id === id);
    if (isFavorito) {
      const newFavoritos = favoritos.filter((item: DataType) => item.id !== id);
      setFavoritos(newFavoritos);
      localStorage.setItem('favoritos', JSON.stringify(newFavoritos));
    } else {
      const newItem = data.find((item) => item.id === id);
      if (newItem) {
        const newFavoritos = [...favoritos, newItem];
        setFavoritos(newFavoritos);
        localStorage.setItem('favoritos', JSON.stringify(newFavoritos));
      }
    }
  };

  const calcularTempoDecorrido = (data: string): string => {
    const dataFormatada = new Date(
      parseInt(data.substring(6, 10)), 
      parseInt(data.substring(3, 5)) - 1,
      parseInt(data.substring(0, 2)), 
      parseInt(data.substring(11, 13)), 
      parseInt(data.substring(14, 16)),
      parseInt(data.substring(17, 19))
    );

    const dataAtual = new Date();
    const diferencaEmMS = dataAtual.getTime() - dataFormatada.getTime();
    const segundosAtras = Math.floor(diferencaEmMS / 1000);
    const minutosAtras = Math.floor(segundosAtras / 60);
    const horasAtras = Math.floor(minutosAtras / 60);
    const diasAtras = Math.floor(horasAtras / 24);

    if (diasAtras > 0) {
      return `${diasAtras} dia${diasAtras !== 1 ? "s" : ""} atrás`;
    } else if (horasAtras > 0) {
      return `${horasAtras} hora${horasAtras !== 1 ? "s" : ""} atrás`;
    } else if (minutosAtras > 0) {
      return `${minutosAtras} minuto${minutosAtras !== 1 ? "s" : ""} atrás`;
    } else {
      return `${segundosAtras} segundo${segundosAtras !== 1 ? "s" : ""} atrás`;
    }
  };

  return (
<DataContext.Provider
      value={ {data, loading, error, favoritos, toggleFavorito, calcularTempoDecorrido, fetchDataForSection } } >
      {children}
    </DataContext.Provider>
  )
}
