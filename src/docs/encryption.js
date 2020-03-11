import { createPrivateKey, createPublicKey, generateKeyPairSync, randomBytes, privateDecrypt, privateEncrypt, publicDecrypt, publicEncrypt, sign } from 'crypto';
import { performance } from 'perf_hooks';
class DataHelper {
  static newId() {
    return randomBytes(24).toString('base64');
  }
}

class Account {
  constructor(d) {
    Object.assign(this, d);
  }

  static fromData({ username, password }) {
    const data = {
      id: DataHelper.newId(),
      name: username,
      creationTime: new Date(),
      security: Keypair.fromCreds(username, password),
      extensions: {
        profiles: {
          /*
            steam: {
              id: '',
              username: ''
            }
            TODO: serializers to ensure correct data. Tie into graphql maybe?
          */
        }
      }
    }

    return new Account(data);
  }
}

class PrivateKey {
  constructor(d) {
    this.d = d;
  }

  toHex(accountName, password) {
    if (!accountName | !password) throw new Error('PrivateKey.toHex: Missing inputs')

    return this.toBuffer(accountName, password).toString('hex')
  }

  toBuffer(accountName, password) {
    if (!accountName | !password) throw new Error('PrivateKey.toHex: Missing inputs')

    return this.d.export({
      type: 'pkcs8', format: 'der', cipher: 'aes-256-cbc', passphrase: accountName + password
    });
  }

  static fromKeyObj(keyObj) {
    return new PrivateKey(keyObj);
  }
}

class PublicKey {
  constructor(d) {
    this.d = d;
  }

  toHex() {
    return this.toBuffer().toString('hex');
  }

  toBuffer() {
    return this.d.export({ type: 'spki', format: 'der' });
  }

  static fromKeyObj(keyObj) {
    return new PublicKey(keyObj);
  }
}

export class Keypair {
  constructor(d) {
    this.privateKey = d.privateKey;
    this.publicKey = d.publicKey;
  }

  static fromCreds(accountName, password = 'top secret') {
    let { publicKey, privateKey } = generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'der'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'der',
        cipher: 'aes-256-cbc',
        passphrase: accountName + password
      }
    });
    publicKey = PublicKey.fromKeyObj(createPublicKey({ key: publicKey, format: 'der', type: 'spki' }))
    privateKey = PrivateKey.fromKeyObj(createPrivateKey({ key: privateKey, passphrase: accountName + password, type: 'pkcs8', format: 'der' }))

    return new Keypair({ privateKey: privateKey, publicKey: publicKey });
  }
}

export class Transaction {
  static signer(algorithm, data, key) {
    return sign(algorithm, data, key);
  }

  static encryptWithPub(pub, plaintext) {
    const buf = Buffer.from(plaintext);
    return publicEncrypt(pub, buf);
  }

  static decryptWithPriv(priv, encryptedText, accountName = 'michael', password = 'secret') {
    return privateDecrypt({ key: priv, passphrase: accountName + password }, encryptedText);
  }
}

// NEW USER OBJECT WITH ASYMETRIC KEYPAIR
const userA = Account.fromData({ username: 'michael', password: 'secret' });
const userB = Account.fromData({ username: 'alfred', password: 'kindaSecret' });

// userA = client
// userB = recipient
// Encrypt with recipients public, sign with clients private.


const msg = '🔥YOLO🔥'

const pub = userB.security.privateKey.d;
const te1 = performance.now();
const e = Transaction.encryptWithPub(pub, msg);
const te2 = performance.now();

const ts1 = performance.now();
const se = Transaction.signer(null, e, userA.security.privateKey.d);
const ts2 = performance.now();

const priv = userB.security.privateKey.d;
const td1 = performance.now();
const d = Transaction.decryptWithPriv(priv, e);
const td2 = performance.now();
//================
// console.log(`Original data: ${msg}`)
// console.log(`Encrypted data: ${se}`)
// console.log(`Decrypted data: ${d}`)
// console.log(`Performance: \nEncrypt: ${(te2 - te1) / 1000}s \nSign: ${(ts2 - ts1) / 1000}s \nDecrypt: ${(td2 - td1) / 1000}s`)
//================


//===========================================================//
//===========|___________|===========|___________|===========//
//=================⬇=======================⬆=================//
//=================⬇=======================⬆================//
//=================⬇➡➡➡➡➡|____________|➡➡➡➡⬆================//
//===========================================================//
