import React from 'react';
import { navigate } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ThemeContext from '../Util/Provider';

const BackButton = () => {
  // routes look like '/Apps/EncodeDecode/'
  const getParts = () => {
    let parts;
    // Get current route
    const path = window.location.pathname;
    // Verify is internal link
    if (/^\/(?!\/)/.test(path)) {
      // clean current route to get previous route
      parts = path.split('/').filter(p => p !== ''); // [Apps', 'EncodeDecode']
    }

    return parts;
  }

  const getLast = (prts) => {
    let last = '/';

    if (!prts) {
      prts = getParts();
    }

    if (prts.length > 0) {
      const lastRoute = prts[prts.length - 2];
      if (lastRoute) {
        last = lastRoute;
      }
    }

    return last;
  }

  const getCurrent = (prts) => {
    let current = '/';
    if (!prts) {
      prts = getParts();
    }

    if (prts) {
      const thisRoute = prts[prts.length - 1]
      if (thisRoute) {
        current = thisRoute;
      }
    }

    return current;
  }

  const goBack = () => {
    navigate(getLast());
  }

  const shouldShowBack = () => {
    let allowReturn = false;
    // if last route equal to this route, don't show. ie: '/' <- roote of site
    const last = getLast();
    const current = getCurrent();

    if (last && last !== current) {
      allowReturn = true;
    }

    return allowReturn;
  }

  return (
    <>
      {shouldShowBack()
        ? <div className={`back-btn`}>
          <button className={`btn__back`}>
            <FontAwesomeIcon icon='arrow-left' size='2x' onClick={goBack} />
          </button>
        </div>
        : null}
    </>
  );
}

export default BackButton;