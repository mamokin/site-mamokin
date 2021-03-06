import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import ThemeContext from '../Util/Provider';
import PageFooter from './PageFooter';
import '../assets/sass/main.scss';

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
                author
                description
                keyword
                image
              }
            }
          }
        `}
        render={data => (
          <ThemeContext.Consumer>
            {theme => (
              <div className={`theme--${theme.dark ? 'dark' : 'light'}`}>
                <Helmet title={data.site.siteMetadata.title}>
                  <script>{'"use strict";!function() {var t = window.driftt = window.drift = window.driftt || [];if (!t.init) {if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice."));t.invoked = !0, t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ], t.factory = function(e) {return function() {var n = Array.prototype.slice.call(arguments);return n.unshift(e), t.push(n), t;};}, t.methods.forEach(function(e) {t[e] = t.factory(e);}), t.load = function(t) {var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script");o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";var i = document.getElementsByTagName("script")[0];i.parentNode.insertBefore(o, i);};}}();drift.SNIPPET_VERSION = \'0.3.1\';drift.load(\'r3zynyxtead4\');'}</script>
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
