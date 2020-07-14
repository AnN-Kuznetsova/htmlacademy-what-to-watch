import React from "react";


export const Footer = () => {
  const isMainPage = window.location.pathname === `/`;
  const mainPageLink = isMainPage ? null : {href: `/`};

  return (
    <footer className="page-footer">
      <div className="logo">
        <a {...mainPageLink} className="logo__link logo__link--light">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
};
