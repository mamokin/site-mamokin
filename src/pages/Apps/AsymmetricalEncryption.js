import React from 'react';
import Encrypt from '../../components/Encrypt';

export default function EncryptDecrypt() {
  return (
    <div className='EncryptDecrypt'>
      <h1>Asymmetrical Encryption Demo</h1>
      <p className='card--warning'>The keys created are not encrypted or stored anywhere.</p>
      <Encrypt />
    </div>
  );
}