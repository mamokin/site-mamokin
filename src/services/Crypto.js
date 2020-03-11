
import nacl from 'tweetnacl'

import { box, randomBytes } from 'tweetnacl';
import {
  decodeUTF8,
  encodeUTF8,
  encodeBase64,
  decodeBase64
} from 'tweetnacl-util';

export default class KeyPair {
  constructor(keys) {
    if (keys.secretKey) {
      keys.secretKey = Buffer.from(keys.secretKey);

      if (keys.secretKey.length !== 32) {
        throw new Error('secretKey length is invalid');
      }

      this._secretSeed = keys.secretKey; // /* Uint8Array */ length 64
      let pk = this._generate(keys.secretKey)
      this._publicKey = pk.toString('hex'); // length 32
      this._secretKey = Buffer.concat([keys.secretKey, pk]).toString('hex'); // length 64

      if (
        keys.publicKey &&
        !this._publicKey.equals(Buffer.from(keys.publicKey))
      ) {
        throw new Error('secretKey does not match publicKey');
      }
    } else {
      this._publicKey = Buffer.from(keys.publicKey);

      if (this._publicKey.length !== 32) {
        throw new Error('publicKey length is invalid');
      }
    }
  }

  // return buffer public key
  _generate(secretKey) {
    const secretKeyUint8 = new Uint8Array(secretKey);
    const naclKeys = nacl.sign.keyPair.fromSeed(secretKeyUint8);
    return Buffer.from(naclKeys.publicKey);
  }

  static random() {
    const kp = box.keyPair();
    return new this({ secretKey: kp.secretKey /* Uint8Array */ })
  }

  static getShared(pub, priv){
    return box.before(this.hexToUint8(pub), this.hexToUint8(priv));
  }

  static hexToUint8(hex) {
    return Uint8Array.from(Buffer.from(hex, 'hex'));
  }

  static uint8ToHex(uint8) {
    return Buffer.from(uint8).toString('hex');
  }
}

/**
 * This function encrypts a message using a base64 encoded
 * publicKey such that only the corresponding secretKey will
 * be able to decrypt
 */
function _encrypt(receiverPublicKey, msgParams) {
  const ephemeralKeyPair = nacl.box.keyPair()
  const pubKeyUInt8Array = Uint8Array.from(Buffer.from(receiverPublicKey, 'hex'))
  const msgParamsUInt8Array = Uint8Array.from(Buffer.from(msgParams))
  const nonce = nacl.randomBytes(nacl.box.nonceLength)

  // Convert keys back to uin8arrays.
  const encrypted = nacl.box(msgParamsUInt8Array, nonce, pubKeyUInt8Array, ephemeralKeyPair.secretKey)
  const encryptedMessage = nacl.box(
    msgParamsUInt8Array,
    nonce,
    pubKeyUInt8Array,
    ephemeralKeyPair.secretKey
  )
  return {
    ciphertext: Buffer.from(encryptedMessage).toString('hex'),
    ephemPubKey: Buffer.from(ephemeralKeyPair.publicKey).toString('hex'),
    nonce: Buffer.from(nonce).toString('hex')
  }
  return {
    ciphertext: util.encodeBase64(encryptedMessage),
    ephemPubKey: util.encodeBase64(ephemeralKeyPair.publicKey),
    nonce: util.encodeBase64(nonce),
    version: "x25519-xsalsa20-poly1305"
  }
}

/* Decrypt a message with a base64 encoded secretKey (privateKey) */
function _decrypt(receiverSecretKey, encryptedData) {
  const receiverSecretKeyUint8Array = util.decodeBase64(
    receiverSecretKey
  )
  const nonce = util.decodeBase64(encryptedData.nonce)
  const ciphertext = util.decodeBase64(encryptedData.ciphertext)
  const ephemPubKey = util.decodeBase64(encryptedData.ephemPubKey)
  const decryptedMessage = nacl.box.open(
    ciphertext,
    nonce,
    ephemPubKey,
    receiverSecretKeyUint8Array
  )
  return util.encodeUTF8(decryptedMessage)
}

// gen two user keypairs
const kpA = KeyPair.random();
const kpB = KeyPair.random();

console.log(kpA._publicKey.toString('hex'))

// userA -> userB message
const msg = 'hello';

// encrypt asymmetric
// const encrypted = encrypt(kpB._publicKey, msg);
// const decrypted = decrypt(kpB._secretKey, encrypted)

const newNonce = () => randomBytes(box.nonceLength);
export const generateKeyPair = () => box.keyPair();

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

// usage
const obj = { hello: 'world' };
const pairA = KeyPair.random();
const pairB = KeyPair.random();
console.log(Uint8Array.from(Buffer.from(kpA._publicKey, 'hex')))
const sharedA = KeyPair.getShared(kpB._publicKey, kpA._secretKey); // used to encrypt
const sharedB = KeyPair.getShared(kpA._publicKey, kpB._secretKey); // used to decrypt
const encrypted = encrypt(sharedA, obj);
const decrypted = decrypt(sharedB, encrypted);
console.log(obj, encrypted, decrypted);