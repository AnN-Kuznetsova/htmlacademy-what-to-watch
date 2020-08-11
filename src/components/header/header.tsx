import * as React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {AuthorizationStatus} from "../../reducers/user/user";
import {Breadcrumbs} from "../breadcrumbs/breadcrumbs";
import {Logo, LogoMode} from "../logo/logo";
import {MovieType, PageType} from "../../types";
import {AppRoute} from "../../const";
import {getAuthorizationStatus} from "../../reducers/user/selectors";
import {getActivePage, getActiveMovie} from "../../reducers/application/selectors";


interface Props {
  authorizationStatus: string;
  activeMovie?: MovieType;
  activePage: PageType;
}


const HeaderComponent: React.FunctionComponent<Props> = (props: Props) => {
  const {
    authorizationStatus,
    activeMovie,
    activePage,
  } = props;

  const renderBreadcrumbs = activePage === PageType.ADD_REVIEW;
  const renderAvatar = authorizationStatus === AuthorizationStatus.AUTH && activePage !== PageType.ERROR && activePage !== PageType.SIGN_IN;
  const renderSignInLink = authorizationStatus === AuthorizationStatus.NO_AUTH && activePage !== PageType.ERROR && activePage !== PageType.SIGN_IN;
  const renderSignInPage = activePage === PageType.SIGN_IN;
  const renderMyList = activePage === PageType.MY_LIST;

  const breadcrambsList = activeMovie ? [
    {
      link: AppRoute.FILM.replace(`:id`, activeMovie.id),
      title: activeMovie.title
    },
    {
      link: ``,
      title: `Add review`,
    }
  ] : [];

  return (
    <React.Fragment>
      <h1 className="visually-hidden">WTW</h1>

      <header className={`page-header ${renderAvatar && !renderMyList && `movie-card__head`} ${(renderSignInPage || renderMyList) && `user-page__head`}`}>
        <Logo mode={LogoMode.NORMAL} />

        {renderBreadcrumbs &&
          <Breadcrumbs breadcrambsList={breadcrambsList} />}

        {renderAvatar &&
          <div className="user-block">
            <Link to={AppRoute.MY_LIST} >
              <div className="user-block__avatar">
                <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </Link>
          </div>}

        {renderSignInLink &&
          <div className="user-block">
            <Link className="user-block__link"
              to={AppRoute.SIGN_IN}
            >Sign in</Link>
          </div>}

        {renderSignInPage &&
          <h1 className="page-title user-page__title">Sign in</h1>}

        {renderMyList &&
          <h1 className="page-title user-page__title">My list</h1>}
      </header>
    </React.Fragment>
  );
};


const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  activeMovie: getActiveMovie(state),
  activePage: getActivePage(state),
});

const Header = connect(mapStateToProps)(HeaderComponent);


export {
  HeaderComponent,
  Header,
};
