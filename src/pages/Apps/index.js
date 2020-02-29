import React from 'react';
import { navigate } from 'gatsby'
import Layout from '../../components/Layout';

const Apps = () => {
  return (
    <>
      <Layout darkText>
        <h1>Some simple applications...</h1>
        <div
          className='link__card--b'
          role='link'
          tabIndex={0}
          onClick={() => { navigate('/Apps/Encoding') }}
          onKeyPress={() => { navigate('/Apps/Encoding') }}
        >
          Encoding
        </div>
      </Layout>
    </>
  )
}

export default Apps;