import { box, randomBytes } from 'tweetnacl';
import {
  decodeUTF8,
  encodeUTF8,
  encodeBase64,
  decodeBase64
} from 'tweetnacl-util';

const newNonce = () => randomBytes(box.nonceLength);
export const generateKeyPair = () => {
  let { publicKey, secretKey } = box.keyPair();
  publicKey = encodeBase64(publicKey);
  secretKey = encodeBase64(secretKey);
  return { publicKey, secretKey };
};

export const encrypt = (
  secretOrSharedKey,
  json,
  key
) => {
  const nonce = newNonce();
  const messageUint8 = decodeUTF8(JSON.stringify(json));
  const encrypted = key
    ? box(messageUint8, nonce, key, secretOrSharedKey)
    : box.after(messageUint8, nonce, secretOrSharedKey);

  const fullMessage = new Uint8Array(nonce.length + encrypted.length);
  fullMessage.set(nonce);
  fullMessage.set(encrypted, nonce.length);

  const base64FullMessage = encodeBase64(fullMessage);
  return base64FullMessage;
};

export const decrypt = (
  secretOrSharedKey,
  messageWithNonce,
  key
) => {
  const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce);
  const nonce = messageWithNonceAsUint8Array.slice(0, box.nonceLength);
  const message = messageWithNonceAsUint8Array.slice(
    box.nonceLength,
    messageWithNonce.length
  );

  const decrypted = key
    ? box.open(message, nonce, key, secretOrSharedKey)
    : box.open.after(message, nonce, secretOrSharedKey);

  if (!decrypted) {
    throw new Error('Could not decrypt message');
  }

  const base64DecryptedMessage = encodeUTF8(decrypted);
  return JSON.parse(base64DecryptedMessage);
};

export const getShared = (pub, priv) => {
  return box.before(decodeBase64(pub), decodeBase64(priv));
};


/*
Get shared keys. sharedA is a shared key that both users will be able to understand but only create from the combination of their keys.
Essentially what happens is:
1. sender encrypts with their public key
2. receiver decrypts with their private key

This works because a shared key that only the sender and receiver can generate is in existence and relies on private keys.
*/
// const obj = { hello: 'world' };
// const pairA = generateKeyPair(); // sender
// const pairB = generateKeyPair(); // receiver
// const sharedA = box.before(decodeBase64(pairB.publicKey), decodeBase64(pairA.secretKey)); // precomputed shared key
// const sharedB = box.before(decodeBase64(pairA.publicKey), decodeBase64(pairB.secretKey)); // precomputed shared key

// const encrypted = encrypt(sharedA, obj);
// const decrypted = decrypt(sharedB, encrypted);
// console.log(obj, encrypted, decrypted);