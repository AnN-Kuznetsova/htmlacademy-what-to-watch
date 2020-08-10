
import * as React, {PureComponent} from "react";
import {connect} from "react-redux";

import {ActionCreator as ApplicationActionCreator} from "../../reducers/application/application";
import {ActionCreator as DataActionCreator, Operation} from "../../reducers/data/data";
import {Catalog} from "../catalog/catalog";
import {Footer} from "../footer/footer";
import {Header} from "../header/header";
import {PageType} from "../../const";
import {getDataError} from "../../reducers/data/selectors";


class MyListPageComponent extends PureComponent {
  componentDidMount() {
    this.props.onOpenMyListPage();
  }

  render() {
    const {dataError} = this.props;

    return (
      <div className="user-page">
        <Header />

        <section className="catalog">
          {dataError && <h2 className="catalog__title">Data loading error. Sorry</h2>}

          {!dataError &&
          <React.Fragment>
            <h2 className="catalog__title visually-hidden">Catalog</h2>
            <Catalog />
          </React.Fragment>}
        </section>

        <Footer />
      </div>
    );
  }
}


MyListPageComponent.propTypes = {
  onOpenMyListPage: PropTypes.func.isRequired,
  dataError: PropTypes.object,
};

const mapStateToProps = (state) => ({
  dataError: getDataError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onOpenMyListPage() {
    dispatch(DataActionCreator.setDataError(null));
    dispatch(ApplicationActionCreator.changeActivePage(PageType.MY_LIST));
    dispatch(Operation.loadFavoriteMovies());
    dispatch(DataActionCreator.setMaxMoviesCount(null));
    dispatch(ApplicationActionCreator.resetVisibleMoviesCount());
  },
});

const MyListPage = connect(mapStateToProps, mapDispatchToProps)(MyListPageComponent);


export {
  MyListPageComponent,
  MyListPage,
};
