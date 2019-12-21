import React, {useState, useEffect} from 'react';

import config from '../../config';
const pic = require('../assets/img/Mamokin.png');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default function Footer() {
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

  useEffect(() => {
    const interval = setInterval(() => {
      let i = index + 1;

      if (words[i]) {
        setWord(words[i]);
        setIndex(index => i)
      } else {
        setWord(words[0]);
        setIndex(0);
      }

      setWordClr(colors[getRandomInt(4)]);
    }, 1500);
    return () => clearInterval(interval);
  }, [words, index]);

  return (
    <header>
      <span className="avatar">
        <img height="128px" src={pic} alt="" />
      </span>
      <h1>{config.authorName}</h1>
      <h3 className='about__i-am'><span className={`txt--${wordClr}`}>{word}</span></h3>
      <p>{config.heading}</p>
    </header>
  );
}
