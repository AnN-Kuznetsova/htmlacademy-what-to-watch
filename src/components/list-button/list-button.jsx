import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";

import {MoviePropType} from "../../prop-types";
import {getActiveMovie} from "../../reducers/application/selectors";


const ListButtonComponent = (props) => {
  const {movie} = props;

  return (
    <button className="btn btn--list movie-card__button" type="button">
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
};


const mapStateToProps = (state) => ({
  movie: getActiveMovie(state),
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
