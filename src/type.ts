export type ApiType = {
	id:number,
	tipo:string,
	titulo: string,
	introducao: string,
	produto_id:number,
	produtos:string,
	editorias:string,
	imagens: string,
	produtos_relacionados:string,
	destaque:boolean,
	data_publicacao: string,
	link:string,
};

export type ImageData = {
    image_intro: string;
    float_intro: string;
    image_intro_alt: string;
    image_intro_caption: string;
    image_fulltext: string;
    float_fulltext: string;
    image_fulltext_alt: string;
    image_fulltext_caption: string;
}

export type DataType = {
	id: number,
	tipo: string,
	titulo: string,
	introducao: string,
	data: string,
	image: string,
	link: string,
};

export type DataContextType = {
  data: DataType[],
  loading: boolean,
  error: string | null,
  favoritos: DataType[],
  toggleFavorito: ((id: number) => void);
  calcularTempoDecorrido: (data: string) => string;
  fetchDataForSection: (section: string) => void,
};
