import React from 'react';
import { navigate } from 'gatsby';

const Apps = () => {
  return (
    <>
      <h1>Some simple applications...</h1>
      <div
        className='link__card--b'
        role='link'
        tabIndex={0}
        onClick={() => { navigate('/Apps/EncodeDecode'); }}
        onKeyPress={() => { navigate('/Apps/EncodeDecode'); }}
      >
        <p>Encode & Decode</p>
      </div>
      <div
        className='link__card--b'
        role='link'
        tabIndex={0}
        onClick={() => { navigate('/Apps/AsymmetricalEncryption'); }}
        onKeyPress={() => { navigate('/Apps/AsymmetricalEncryption'); }}
      >
        <p>Asymmetrical Encryption</p>
      </div>
    </>
  );
};

export default Apps;