import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Account from '../services/Account'
import { CodeHighlight } from '../components/Highlighter';
import { encrypt, getShared, decrypt } from '../services/KeyPair';

const Encrypt = () => {
  const defaultSubmitTxt = 'Generate Account Data';
  const [msg, setMsg] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [accA, setAccA] = useState(Account.placeholder());
  const [accB, setAccB] = useState(Account.placeholder());
  const [hideA, setHideA] = useState(true);
  const [hideB, setHideB] = useState(true);
  const [btn1Txt, setbtn1Txt] = useState(defaultSubmitTxt);
  const [step, setStep] = useState(1);

  const defaultValues = {
    msg: '',
    btn1Txt: ''
  }

  const { register, handleSubmit, setValue, reset, watch, errors } = useForm({ defaultValues });
  const msgValue = watch('msgValue');
  const handleChange = e => {
    setValue('msgValue', e.target.value, true);
  }

  const genAccounts = () => {
    setAccA(Account.fromData({ username: accA.name }));
    setAccB(Account.fromData({ username: accB.name }));
    setHideA(false); setHideB(false);
  }
  const encryption = () => {
    let arr = msg;
    const sharedA = getShared(accB.security.publicKey, accA.security.privateKey);
    const enc = encrypt(sharedA, msg);
    setEncrypted(enc);
    arr.push(enc);
    setMsg(arr);
  }
  const decryption = () => {
    let arr = msg;
    const sharedB = getShared(accA.security.publicKey, accB.security.privateKey);
    const dec = decrypt(sharedB, encrypted);
    arr.push(dec);
    setMsg(arr);
  }

  function nextStep(input) {
    switch (step) {
      case 1:
        genAccounts();
        setMsg([input.msg]);
        setShowResult(true);
        setbtn1Txt('Encrypt Message')
        setStep(step + 1)
        break;
      case 2:
        encryption();
        setbtn1Txt('Decrypt Message')
        setStep(step + 1)
        break;
      case 3:
        decryption();
        setbtn1Txt('Restart');
        setStep(step + 1)
        break;
      case 4:
        reset({ defaultValues });
        setbtn1Txt(defaultSubmitTxt);
        setShowResult(false);
        setStep(1);
        setHideA(true); setHideB(true);
        break;
      default:
        break;
    }
    // setStep(step + 1);
  }

  // console.log(watch("data")); // you can watch individual input by pass the name of the input

  return (
    <div className='encrypt'>
      <h1>Encrypt some stuff!</h1>
      <p>
        In this application, we will be generating two dummy accounts: Account A, and Account B. Think of Account A as the sender whose name is Alice and Account B as the receiver whose name is Bob.
        Alice and Bob are going to create a shared key from the combination of eachothers' keys. At a high level, this shared key is generated via:
      </p>
      <ol>
        <li>Alice will create her shared key by using an equation with her private key and Bobs public key</li>
      </ol>
      <p>
        Shared keys are constructed in such a way that only Alice and Bob know how to use them.
      </p>
      <p>
        Now that the shared keys are generated, Alice will encrypt her message with the shared key she made and then send it to Bob.
      </p>
      <p>
        Bob receives the message from Alice sometime later and sees that it is from Alice within the data. To verify that the message is indeed from Alice, Bob will create his shared key by using an
        equation with his private key and Alices public key. This is the same process that Alice performed earlier. So now Bob has generated a shared key that he can attempt to decrypt the message he
        received. If decryption is successful, there will be a legible string. However, if decryption fails the message will remain in an unusable state. When decryption fails, it means that the
        sender of the message was not who they claimed to be.
      </p>
      <p>
        To view the transformation of the data of a sender (you) from human readable string to encrypted and then back to human readable, enter a message within the input below and click the
        "Generate Account Data" button. Keep pressing the button and keep an eye on the data in the input to see the changes.
      </p>

      <form onSubmit={handleSubmit(nextStep)} className='encrypt__form'>
        <input className='encrypt__btn-submit' type="submit" value={btn1Txt} />
        {
          showResult
            ? <div className='card'>
              <div className='encrypt__result'>
                {msg.map(x => <p className='stdout' key={Math.random()}>{x}</p>)}
              </div>
            </div>
            : <input value={msgValue} onChange={handleChange} placeholder='Enter a text message here' className={errors.msg ? 'error' : ''} name='msg' ref={register({ required: true, min: 1, maxLength: 200 })} />
        }
        <div className={hideA && hideB ? 'hidden' : ''}>
          <div>
            <span className='txt'>Account A</span>
            <CodeHighlight hidden={hideA}> {/*TODO: make dropdown*/}
              {JSON.stringify(accA, null, 4)}
            </CodeHighlight>
          </div>
          <div>
            <span className='txt'>Account B</span>
            <CodeHighlight hidden={hideB}> {/*TODO: make dropdown*/}
              {JSON.stringify(accB, null, 4)}
            </CodeHighlight>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Encrypt;