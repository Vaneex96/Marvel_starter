import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";

import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({ Component, dataType }) => {
  const { Id } = useParams();
  const [data, setData] = useState(null);
  const { loading, error, getComic, getCharacterByName, clearError } =
    useMarvelService();

  useEffect(() => {
    upDateData();
  }, [Id]);

  const upDateData = () => {
    clearError();
    switch (dataType) {
      case "comic":
        getComic(Id).then(onDataLoaded);
        break;
      case "character":
        getCharacterByName(Id).then(onDataLoaded);
        break;
    }
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(error || loading || !data) ? (
    <Component data={data} />
  ) : null;

  return (
    <>
      <AppBanner />
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

export default SinglePage;
