import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Encoding = () => {
  const [result, setResult] = useState({ txt: 'your encoded result will show here' });
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    if (data) {
      const oldLength = data.data.length;
      // eslint-disable-next-line no-undef
      const encoded = Buffer.from(JSON.stringify(data.data)).toString(data.encodingFormat).replace(/"/g, '');
      setResult({ txt: encoded, oldLength, newLength: encoded.length });
    }
  };
  // console.log(watch("data")); // you can watch individual input by pass the name of the input

  return (
    <>
      <h2>Encode some stuff!</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea className={errors.data ? 'error' : ''} name="data" ref={register({ required: true, min: 1, maxLength: 20000 })} />
        <select className={errors.encodingFormat ? 'error' : ''} name="encodingFormat" ref={register({ required: true })}>
          <option value="ascii">ascii</option>
          <option value="utf8">utf8</option>
          <option value="ucs2">ucs2</option>
          <option value="base64">base64</option>
          <option value="binary">binary</option>
          <option value="hex">hex</option>
        </select>

        <input type="submit" />
      </form>

      <div className='card'>
        {result.oldLength ? <p>Old length: {result.oldLength}</p> : null}
        {result.newLength ? <p>New length: {result.newLength}</p> : null}
        <hr />
        <p>{result.txt}</p>
      </div>
    </>
  );
};

export default Encoding;