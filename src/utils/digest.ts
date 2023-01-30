import { createHmac } from 'crypto';

export default class Digest {
  static hash(data: string, algorithm = 'sha256', key = '') {
    const hash = createHmac(algorithm, key);
    hash.update(data);
    return hash.digest('hex');
  }
}