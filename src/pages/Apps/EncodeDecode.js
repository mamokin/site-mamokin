import React from 'react';

// import AnimatedBg from '../../components/AnimatedBg';
import Encode from '../../components/Encode'
import Decode from '../../components/Decode'

export default function EncodeDecode() {
  return (
    <div className='EncodeDecode'>
      <h1>Encode and Decode</h1>
      <p className='txt--center'>This application performs basic encoding via <code>Buffer</code> data type conversions.</p>
      <div className='d--flex'>
        <div className='d--block'>
          <Encode />
        </div>
        <div className='d--block'>
          <Decode />
        </div>
      </div>
    </div>
  )
}