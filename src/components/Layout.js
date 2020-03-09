import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import ThemeContext from '../Util/Provider';

import '../assets/sass/main.scss';
import PageFooter from './PageFooter';

class Layout extends Component {
  constructor() {
    super();
    this.state = {
      isPreloaded: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isPreloaded: false });
    }, 1000);
  }

  render() {
    const { children } = this.props;
    const { isPreloaded } = this.state;
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <ThemeContext.Consumer>
            {theme => (
              <div className={`theme--${theme.dark ? 'dark' : 'light'}`}>
                <Helmet
                  title={data.site.siteMetadata.title}
                  meta={[
                    { name: 'description', content: 'Web developer' },
                    { name: 'keywords', content: 'site, web, frontend developer, developer, gatsby, react' },
                  ]}
                >
                </Helmet>
                <div className={isPreloaded ? 'main-body is-preload' : 'main-body'}>
                  <div id="wrapper">
                    {children}
                  </div>
                  <PageFooter />
                </div>
              </div>
            )}
          </ThemeContext.Consumer>
        )}
      />
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
