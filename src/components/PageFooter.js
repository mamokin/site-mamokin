import React from 'react';
import config from '../../config';

export default function PageFooter() {
  return (
    <footer id="footer" className='page-footer'>
      <ul className="copyright">
        <li>&copy; {config.authorName} | </li>
        <li>
          Designed with <a href="http://html5up.net">HTML5 UP</a>
        </li>
      </ul>
    </footer>
  );
}