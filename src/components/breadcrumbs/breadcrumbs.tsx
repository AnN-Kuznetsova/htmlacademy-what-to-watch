
import * as React from "react";
import {Link} from "react-router-dom";


interface Props {
  breadcrambsList?: {
    link: string,
    title: string,
  }[];
}


export const Breadcrumbs: React.FunctionComponent<Props> = (props: Props) => {
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
