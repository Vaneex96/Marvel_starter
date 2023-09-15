import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";

import ComicsList from "../comicsList/ComicsList";

import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./singleCharPage.scss";
import AppBanner from "../appBanner/AppBanner";

const SingleCharPage = () => {
  const { name } = useParams();
  const [char, setChar] = useState({});
  const { getCharacterByName, loading, error, clearError } = useMarvelService();

  useEffect(() => {
    updateChar(name);
  }, [name]);

  const updateChar = (name) => {
    clearError();
    getCharacterByName(name).then((res) => setChar(res));
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(error || loading || !char) ? <View char={char} /> : null;

  return (
    <>
      <AppBanner />
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ char }) => {
  const { thumbnail, description, name } = char;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={name} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
      <Link to={`/`} className="single-comic__back">
        Back to main
      </Link>
    </div>
  );
};

export default SingleCharPage;
