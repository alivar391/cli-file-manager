import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'zlib';
import * as path from 'path';
import { access } from 'fs/promises';
import { cwd } from 'process';

export const decompress = async (args) => {
  const [fileName, newFileName] = args.split(' ');
  let fileToDecompress;
  let unZipFile;
  if (path.isAbsolute(fileName)) {
    fileToDecompress = path.resolve(cwd(), fileName);
  } else {
    fileToDecompress = path.join(cwd(), fileName);
  }
  if (path.isAbsolute(newFileName)) {
    unZipFile = path.resolve(cwd(), newFileName);
  } else {
    unZipFile = path.join(cwd(), newFileName);
  }
  access(fileToDecompress)
    .then(() => {
      const readableStream = createReadStream(fileToDecompress);
      const writableStream = createWriteStream(unZipFile);
      readableStream
        .pipe(createBrotliDecompress())
        .pipe(writableStream)
        .on('finish', () => {
          console.log(`Decompression process done, result in  ${unZipFile}`);
          console.log(`You are currently in ${cwd()}\\`);
        })
    })
    .catch((err) => {
      console.log('Operation failed');
      console.log(`You are currently in ${cwd()}\\`);
    });
};
