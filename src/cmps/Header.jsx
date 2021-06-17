import React from 'react';
import { NavLink } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { changeMode } from '../store/actions/weatherAction';

export function Header() {
  const { isLight } = useSelector((state) => state.weatherReducer);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(changeMode(!isLight));
  };

  return (
    <div className='nav-header flex space-between'>
      <div className='left-header'>
        <NavLink
          className={`${isLight ? 'dark' : 'light'}`}
          activeClassName={'active'}
          exact={true}
          to='/'
        >
          Home
        </NavLink>
        <NavLink
          className={`${isLight ? 'dark' : 'light'}`}
          activeClassName={'active'}
          to='/favorites'
        >
          Favorites
        </NavLink>
      </div>
      <div className='right-header flex'>
        <FormControlLabel
          control={
            <Switch checked={isLight} onChange={handleChange} name='checkedA' />
          }
          label={isLight ? 'Dark mode' : 'Light mode'}
          className={`${isLight ? 'dark' : 'light'}`}
        />
      </div>
    </div>
  );
}
