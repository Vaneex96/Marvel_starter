import useMarvelService from "../../services/MarvelService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";

import myErrorMessage from "../errorMessage/ErrorMessage";

import "./Form.scss";

const CustomForm = () => {
  const { getCharacterByName, clearError, error } = useMarvelService();
  const [char, setChar] = useState("");
  const [myError, setError] = useState(false);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = (char) => {
    clearError();
    getCharacterByName(char)
      .then((res) => {
        onCharLoaded(res.name);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
    setError(false);
  };

  const criticalError = error ? <div>{myErrorMessage}</div> : null;

  const result =
    !char && !myError ? null : !myError ? (
      <div className="char__search-wrapper">
        <div className="char__search-success">There is! Visit {char} page?</div>
        <Link to={`/character/${char}`} className="button button__secondary">
          <div className="inner">To page</div>
        </Link>
      </div>
    ) : (
      <div className="error">
        The character was not found. Check the name and try again
      </div>
    );

  return (
    <>
      <Formik
        initialValues={{ name: "" }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, "Must be at least 2 letters")
            .required("This field is required"),
        })}
        onSubmit={(values) => {
          updateChar(values.name);
        }}
      >
        <Form className="char">
          <div className="char__form">
            <label className="char__form-label">
              Or find a character by name:
            </label>
            <div className="char__form-input">
              <Field
                className="input"
                id="name"
                name="name"
                type="text"
                placeholder="Enter name"
              />
              <button type="submit" className="button button__main">
                <div className="inner">FIND</div>
              </button>
              <ErrorMessage className="error" name="name" component="div" />
              {result}
              {criticalError}
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default CustomForm;
