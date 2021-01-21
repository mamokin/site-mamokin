import { randomBytes } from 'crypto';
import { generateKeyPair } from './KeyPair';
import { Chance } from 'chance';
const chance = new Chance();
class DataHelper {
  static newId() {
    return randomBytes(24).toString('base64');
  }
}

export default class Account {
  constructor(d) {
    Object.assign(this, d);
  }

  static placeholder() {
    const data = {
      id: '',
      name: chance.name,
      created: new Date(),
      security: { publicKey: '', privateKey: '' },
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
    };

    return new Account(data);
  }

  static fromData({ username }) {
    const { publicKey, secretKey } = generateKeyPair();
    const privateKey = secretKey;
    const data = {
      id: DataHelper.newId(),
      name: username,
      created: new Date(),
      security: { publicKey: publicKey, privateKey: privateKey },
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
    };

    return new Account(data);
  }
}