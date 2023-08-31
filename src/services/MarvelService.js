import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=3aed998a4ecdcfad768c07b80178142e";
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );

    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`);

    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(
      "https://gateway.marvel.com:443/v1/public/comics?orderBy=-issueNumber&limit=8&offset=0&apikey=3aed998a4ecdcfad768c07b80178142e"
    );

    return res.data.results.map(_transformComics);
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      url: comics.urls[0].url,
      price: comics.prices[0].price,
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
    };
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 200)}...`
        : "There is no description for this character",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    clearError,
    getAllComics,
  };
};

export default useMarvelService;
