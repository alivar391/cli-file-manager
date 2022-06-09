import * as fs from 'fs';
import * as path from 'path';

export const cat = async (currentDirectory, fileName) => {
  const newPath = resolve(path.join(currentDirectory.trim(), fileName));
  console.log(newPath);
  // const readableStream = fs.createReadStream(newPath);
  // readableStream.on('error', function (error) {
  //   console.log(`error: ${error.message}`);
  // })
  // readableStream.on('data', (chunk) => {
  //   console.log(chunk);
  // })
  fs.createReadStream(newPath, 'utf8').on('data', data => process.stdout.write(data));
};
