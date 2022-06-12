import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'zlib';
import * as path from 'path';
import * as fs from 'fs';
import { cwd } from 'process';
import { validateArgs } from '../utils/validateArgs.js';

export const decompress = async (args) => {
  const [fileName, newFileName] = args.includes("'") ? validateArgs(args) : args.split(' ');
  let fileToDecompress;
  let unZipFile;
  try {
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

    const statsFile = await fs.promises.stat(fileToDecompress);
    await fs.promises.writeFile(unZipFile, '');
    const statsDir = await fs.promises.stat(unZipFile);

    if (statsFile.isFile() && !statsDir.isDirectory()) {
      const readableStream = createReadStream(fileToDecompress);
      const writableStream = createWriteStream(unZipFile);
      const unzip = createBrotliDecompress();
      readableStream
        .pipe(createBrotliDecompress().on('error', () => {
          console.log('File isn`t zip');
          console.log(`You are currently in ${cwd()}\\`);
        }))
        .pipe(writableStream)
        .on('finish', () => {
          console.log(`Decompression process done, result in  ${unZipFile}`);
          console.log(`You are currently in ${cwd()}\\`);
        })
    } else {
      console.log('Operation failed');
      console.log(`You are currently in ${cwd()}\\`);
    };
    
  } catch (err) {
    console.log('Operation failed');
    console.log(`You are currently in ${cwd()}\\`);
  };
};
