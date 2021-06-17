import React from 'react';

export function SearchModal({ tenCitys, onSelectCity }) {
  if (!tenCitys) return <div hidden></div>;
  return (
    <div className='search-modal'>
      {tenCitys?.map((city) => {
        return (
          <div
            key={city.AdministrativeArea.ID}
            onClick={() => onSelectCity(city)}
            className='option-search-modal flex align-center'
          >
            <span className='city-option-txt'>
              {city.Country.LocalizedName}-
            </span>
            <span className='country-option-txt'>
              {city.AdministrativeArea.LocalizedName}
            </span>
          </div>
        );
      })}
    </div>
  );
}
