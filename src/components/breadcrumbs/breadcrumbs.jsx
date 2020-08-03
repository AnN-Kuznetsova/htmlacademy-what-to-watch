import PropTypes from "prop-types";
import React from "react";


export const Breadcrumbs = (props) => {
  const {breadcrambsList} = props;

  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        {breadcrambsList.map((item, index) => {
          return (
            <li key={item.title + index} className="breadcrumbs__item">
              <a
                href={item.link}
                className="breadcrumbs__link"
                onClick={item.onLinkClick}
              >{item.title}</a>
            </li>

          );
        })}
      </ul>
    </nav>
  );
};


Breadcrumbs.propTypes = {
  breadcrambsList: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string,
    onLinkClick: PropTypes.func,
    title: PropTypes.string.isRequired,
  })),
};
