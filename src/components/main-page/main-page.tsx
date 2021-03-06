import * as React from "react";
import {connect} from "react-redux";

import {ActionCreator as ApplicationActionCreator} from "../../reducers/application/application";
import {ActionCreator as DataActionCreator} from "../../reducers/data/data";
import {Catalog} from "../catalog/catalog";
import {FilterByGenre} from "../filter-by-genre/filter-by-genre";
import {Footer} from "../footer/footer";
import {MovieCardPromo} from "../movie-card-promo/movie-card-promo";
import {MovieType, PageType} from "../../types";
import {getPromoMovie} from "../../reducers/data/selectors";


interface Props {
  promoMovie: MovieType;
  onOpenMainPage: (promoMovie: MovieType) => void;
}


class MainPageComponent extends React.PureComponent<Props, {}> {
  componentDidMount() {
    this.props.onOpenMainPage(this.props.promoMovie);
  }

  componentDidUpdate() {
    this.props.onOpenMainPage(this.props.promoMovie);
  }

  render() {
    const {promoMovie} = this.props;

    return (
      <React.Fragment>
        <MovieCardPromo movie={promoMovie} />

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


const mapStateToProps = (state) => ({
  promoMovie: getPromoMovie(state),
});

const mapDispatchToProps = (dispatch) => ({
  onOpenMainPage(promoMovie) {
    dispatch(ApplicationActionCreator.changeActiveMovie(promoMovie));
    dispatch(ApplicationActionCreator.changeActivePage(PageType.MAIN));
    dispatch(DataActionCreator.setMaxMoviesCount(null));
    dispatch(ApplicationActionCreator.resetVisibleMoviesCount());
    dispatch(ApplicationActionCreator.changeGenre(`All genres`));
  },
});

const MainPage = connect(mapStateToProps, mapDispatchToProps)(MainPageComponent);


export {
  MainPageComponent,
  MainPage,
};
