import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ThemeContext from '../Util/Provider';

const ThemeToggle = () => {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <>
          <div className='theme-toggle'>
            <button onClick={theme.toggleDark} className='btn__theme-toggle'>
              <FontAwesomeIcon icon={theme.dark ? 'moon' : 'sun'} size='2x' />
            </button>
          </div>
        </>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemeToggle;