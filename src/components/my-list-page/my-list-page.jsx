import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {connect} from "react-redux";

import {ActionCreator as ApplicationActionCreator} from "../../reducers/application/application";
import {Catalog} from "../catalog/catalog";
import {Footer} from "../footer/footer";
import {Header} from "../header/header";
import {PageType} from "../../const";


class MyListPageComponent extends PureComponent {
  componentDidMount() {
    this.props.onOpenMyListPage();
  }

  componentDidUpdate() {}

  render() {

    return (
      <div className="user-page">
        <Header />

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <Catalog />
        </section>

        <Footer />
      </div>
    );
  }
}


MyListPageComponent.propTypes = {
  onOpenMyListPage: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  onOpenMyListPage() {
    dispatch(ApplicationActionCreator.changeActivePage(PageType.MY_LIST));
  },
});

const MyListPage = connect(mapStateToProps, mapDispatchToProps)(MyListPageComponent);


export {
  MyListPageComponent,
  MyListPage,
};
