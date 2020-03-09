/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMoon, faSun, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Layout from './src/components/Layout';
import SmoothScroll from './src/Util/SmoothScroll';
import Provider, { ThemeProvider } from './src/Util/Provider';
import ThemeToggle from './src/components/ThemeToggle';
import BackButton from './src/components/BackButton';

// https://www.npmjs.com/package/@fortawesome/react-fontawesome
library.add(faMoon, faSun, faArrowLeft);

export const wrapPageElement = ({ element, props }) => {
  return (
    <div>
      <BackButton />
      <SmoothScroll>
        <Layout {...props}>{element}</Layout>
      </SmoothScroll>
    </div>
  )
}

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <ThemeToggle />
    {element}
  </ThemeProvider>
);