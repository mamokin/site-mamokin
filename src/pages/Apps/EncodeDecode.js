import React from 'react';
import Layout from '../../components/Layout';
import AnimatedBg from '../../components/AnimatedBg';
import Encode from '../../components/Encode'
import Decode from '../../components/Decode'

export default function EncodeDecode() {
  return (
    <Layout compName='EncodeDecode'>
      <AnimatedBg />
      <div className='d--flex'>
        <div className='d--block'>
          <Encode />
        </div>
        <div className='d--block'>
          <Decode />
        </div>
      </div>
    </Layout>
  )
}