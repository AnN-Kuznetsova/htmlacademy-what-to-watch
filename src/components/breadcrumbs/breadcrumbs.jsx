import PropTypes from "prop-types";
import React from "react";
import {Link} from "react-router-dom";


export const Breadcrumbs = (props) => {
  const {breadcrambsList} = props;

  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        {breadcrambsList.map((item, index) => {
          return (
            <li key={item.title + index} className="breadcrumbs__item">
              <Link
                className="breadcrumbs__link"
                to={item.link}
                style={item.link ? {} : {pointerEvents: `none`}}
              >{item.title}</Link>
            </li>

          );
        })}
      </ul>
    </nav>
  );
};


Breadcrumbs.propTypes = {
  breadcrambsList: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })),
};
