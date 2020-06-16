import React from "react";


const onCatalogButtonClick = () => {};


export const CatalogMore = () => {
  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={onCatalogButtonClick}
      >
        Show more
      </button>
    </div>
  );
};
