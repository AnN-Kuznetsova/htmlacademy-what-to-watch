import * as React from "react";
import {connect} from "react-redux";

import {AppRoute} from "../../const";
import {AuthorizationStatus} from "../../reducers/user/user";
import {MovieType} from "../../types";
import {Operation} from "../../reducers/data/data";
import {getActiveMovie} from "../../reducers/application/selectors";
import {getAuthorizationStatus} from "../../reducers/user/selectors";
import {history} from "../../history";


interface Props {
  movie: MovieType;
  authorizationStatus: string;
  changeMovie: ({id, status}: {id: number; status: number}, []) => void;
}


const ListButtonComponent: React.FunctionComponent<Props> = (props: Props) => {
  const {
    movie,
    authorizationStatus,
    changeMovie,
  } = props;

  const buttonRef: React.RefObject<HTMLButtonElement> = React.createRef();

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
