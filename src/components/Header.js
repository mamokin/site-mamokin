import React, { useState, useEffect } from 'react';
import { navigate, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';

import config from '../../config';
import pic from '../assets/img/Mamokin.png';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const Header = ({ data }) => {
  const [word, setWord] = useState('');
  const [words] = useState([
    'agile',
    'thorough',
    'secure',
    'flexible',
    'modern',
    'communicative'
  ]);
  const [wordClr, setWordClr] = useState('');
  const [colors] = useState([
    'o', 'p', 'b', 't'
  ]);
  const [index, setIndex] = useState(0);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    let passedRegex = [], newLinks = [];
    data.site.siteMetadata.menuLinks.forEach(link => {
      const generic = (
        <span
          className='link--txt'
          role='link'
          key={link.name}
          tabIndex={0}
          onClick={() => navigate(link.link)}
          onKeyPress={() => navigate(link.link)}
        >
          {link.name}
        </span>
      );

      if (/^\/+\w+$/.test(link.link)) passedRegex.push(generic);
    });

    passedRegex.forEach((linkDiv, i, arr) => {
      arr.length - 1 !== i ? newLinks.push(<>{linkDiv} | </>) : newLinks.push(linkDiv);
    });

    setLinks(newLinks);
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      let i = index + 1;

      if (words[i]) {
        setWord(words[i]);
        // eslint-disable-next-line no-unused-vars
        setIndex(index => i);
      } else {
        setWord(words[0]);
        setIndex(0);
      }

      setWordClr(colors[getRandomInt(4)]);
    }, 1500);
    return () => clearInterval(interval);
  }, [words, colors, index]);

  return (
    <header className='header'>
      {links.map(link => link)}
      <span className="avatar">
        <img height="128px" src={pic} alt="" />
      </span>
      <h1>{config.authorName}</h1>
      <h3 className='about__i-am'><span className={`txt--${wordClr}`}>
        {
          word === '' ? <br /> : word
        }
      </span></h3>
      <p>{config.heading}</p>
    </header>
  );
};

// eslint-disable-next-line react/display-name
export default props => (
  <StaticQuery
    // is global but deprecated
    // eslint-disable-next-line no-undef
    query={graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            menuLinks {
              name
              link
            }
          }
        }
      }
    `}
    render={data => <Header data={data}{...props} />}
  />
);

Header.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        menuLinks: PropTypes.array.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

// export const query = ;