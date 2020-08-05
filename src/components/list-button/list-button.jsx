import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";

import {AppRoute} from "../../const";
import {AuthorizationStatus} from "../../reducers/user/user";
import {MoviePropType} from "../../prop-types";
import {getActiveMovie} from "../../reducers/application/selectors";
import {getAuthorizationStatus} from "../../reducers/user/selectors";
import {history} from "../../history";


const ListButtonComponent = (props) => {
  const {
    movie,
    authorizationStatus,
  } = props;

  const handleClick = (event) => {
    event.preventDefault();

    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      history.push(AppRoute.SIGN_IN);
    }


  };

  return (
    <button className="btn btn--list movie-card__button" type="button"
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
};


const mapStateToProps = (state) => ({
  movie: getActiveMovie(state),
  authorizationStatus: getAuthorizationStatus(state),
});

/* const mapDispatchToProps = (dispatch) => ({
  onAddReviewButtonClick() {
    dispatch(ApplicationActionCreator.changeActivePage(PageType.ADD_REVIEW));
    dispatch(DataActionCreator.setDataError(null));
  },
}); */

const ListButton = connect(mapStateToProps)(ListButtonComponent);


export {
  ListButtonComponent,
  ListButton,
};
