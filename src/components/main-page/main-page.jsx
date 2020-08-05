import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {connect} from "react-redux";

import {ActionCreator as ApplicationActionCreator} from "../../reducers/application/application";
import {Catalog} from "../catalog/catalog";
import {FilterByGenre} from "../filter-by-genre/filter-by-genre";
import {Footer} from "../footer/footer";
import {MovieCardPromoWithPlayer} from "../movie-card-promo/movie-card-promo";
import {MoviePropType} from "../../prop-types";
import {PageType} from "../../const";
import {getPromoMovie} from "../../reducers/data/selectors";


class MainPageComponent extends PureComponent {
  componentWillMount() {
    this.props.onOpenMainPage(this.props.promoMovie);
  }

  componentDidUpdate() {
    this.props.onOpenMainPage(this.props.promoMovie);
  }

  render() {
    const {promoMovie} = this.props;

    return (
      <React.Fragment>
        <MovieCardPromoWithPlayer movie={promoMovie} />

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">
              Catalog
            </h2>

            <FilterByGenre />

            <Catalog />
          </section>

          <Footer />
        </div>
      </React.Fragment>
    );
  }
}


MainPageComponent.propTypes = {
  promoMovie: MoviePropType.isRequired,
  onOpenMainPage: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  promoMovie: getPromoMovie(state),
});

const mapDispatchToProps = (dispatch) => ({
  onOpenMainPage(promoMovie) {
    dispatch(ApplicationActionCreator.changeActiveMovie(promoMovie));
    dispatch(ApplicationActionCreator.changeActivePage(PageType.MAIN));
  },
});

const MainPage = connect(mapStateToProps, mapDispatchToProps)(MainPageComponent);


export {
  MainPageComponent,
  MainPage,
};
