import React from 'react';
import PropTypes from 'prop-types';

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/* Primary Meta Tags */}
        <meta name="title" content='Mamokin' />
        <meta name="description" content='Full-stack Blockchain Developer. Demo applications, guides, portfolio, consultations.' />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mamok.in/" />
        <meta property="og:title" content='Mamokin' />
        <meta property="og:description" content='Full-stack Blockchain Developer. Demo applications, guides, portfolio, consultations.' />
        <meta property="og:image" content='/Mamokin.png' />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content='Mamokin' />
        <meta property="twitter:description" content='Full-stack Blockchain Developer. Demo applications, guides, portfolio, consultations.' />
        <meta property="twitter:image" content='/Mamokin.png' />
        {/* Other */}
        <meta name="author" content='Michael C. Seaward' />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={'body'}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
