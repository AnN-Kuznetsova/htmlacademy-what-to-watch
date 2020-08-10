import * as React from "react";


interface Props {
  filterName: string;
  onClick: () => void;
  isActive: boolean;
}


export const FilterItem: React.FunctionComponent<Props> = (props: Props) => {
  const {filterName, onClick, isActive} = props;

  return (
    <li className={`catalog__genres-item ${isActive ? `catalog__genres-item--active` : ``}`}>
      <a
        href="#"
        className="catalog__genres-link"
        onClick={onClick.bind(null, filterName)}
      >{filterName}</a>
    </li>
  );
};
