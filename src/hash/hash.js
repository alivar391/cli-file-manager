import * as crypto from 'crypto';
import * as path from 'path';
import * as fs from 'fs';
import { cwd } from 'process';

export const hash = async (fileName) => {
  try {
    let newPath;
    if (path.isAbsolute(fileName)) {
      newPath = path.resolve(cwd(), fileName);
    } else {
      newPath = path.join(cwd(), fileName);
    }
    const readableStream = fs.createReadStream(newPath);
    const hash = crypto.createHash('sha256');
    readableStream.on('end', () => {
      hash.end();
      const hex = hash.digest('hex');
      console.log(hex);
      console.log(`You are currently in ${cwd()}\\`);
    });
    readableStream.pipe(hash);
  } catch {
    console.log('Operation failed');
    console.log(`You are currently in ${cwd()}\\`);
  }
};