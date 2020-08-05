import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";

import {AppRoute} from "../../const";
import {AuthorizationStatus} from "../../reducers/user/user";
import {MoviePropType} from "../../prop-types";
import {Operation} from "../../reducers/data/data";
import {getActiveMovie} from "../../reducers/application/selectors";
import {getAuthorizationStatus} from "../../reducers/user/selectors";
import {history} from "../../history";


const ListButtonComponent = (props) => {
  const {
    movie,
    authorizationStatus,
    changeMovie,
  } = props;

  const buttonRef = React.createRef();

  const handleClick = (event) => {
    event.preventDefault();

    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      history.push(AppRoute.SIGN_IN);
    }

    changeMovie({
      id: movie.id,
      status: +(!movie.isFavorite),
    },
    [buttonRef.current]);
  };

  return (
    <button className="btn btn--list movie-card__button" type="button"
      ref={buttonRef}
      onClick={handleClick}
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        {movie.isFavorite
          && <use xlinkHref="#in-list" />
          || <use xlinkHref="#add" />}
      </svg>
      <span>My list</span>
    </button>
  );
};


ListButtonComponent.propTypes = {
  movie: MoviePropType.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  changeMovie: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  movie: getActiveMovie(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeMovie(newMovieData, changeMovieFormElements) {
    dispatch(Operation.changeMovie(newMovieData, changeMovieFormElements));
  },
});

const ListButton = connect(mapStateToProps, mapDispatchToProps)(ListButtonComponent);


export {
  ListButtonComponent,
  ListButton,
};
