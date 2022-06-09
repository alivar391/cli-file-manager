import * as fs from 'fs';
import * as path from 'path';
import { cwd } from 'process';

export const cat = (fileName) => {
  try {
    let newPath;
    if (path.isAbsolute(fileName)) {
      newPath = path.resolve(cwd(), fileName);
    } else {
      newPath = path.join(cwd(), fileName);
    }
    const readableStream = fs.createReadStream(newPath, 'utf8');
    readableStream.on('data', data => {
      console.log(data);
      console.log(`${cwd()}\\`);
    });
    readableStream.on('error', function (error) {
      console.log('Operation failed');
    })
  }
  catch (err) {
    console.log('Operation failed');
    console.log(`${cwd()}\\`);
  }
};
