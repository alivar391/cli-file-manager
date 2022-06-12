import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import * as path from 'path';
import * as fs from 'fs';
import { cwd } from 'process';

export const compress = async (args) => {
  const [fileName, newFileName] = args.split(' ');
  let fileToCompress;
  let zipFile;
  
  try {
    if (path.isAbsolute(fileName)) {
      fileToCompress = path.resolve(cwd(), fileName);
    } else {
      fileToCompress = path.join(cwd(), fileName);
    }
    if (path.isAbsolute(newFileName)) {
      zipFile = path.resolve(cwd(), newFileName);
    } else {
      zipFile = path.join(cwd(), newFileName);
    }

    const statsFile = await fs.promises.stat(fileToCompress);
    await fs.promises.writeFile(zipFile, '', { flag: 'wx' });
    const statsDir = await fs.promises.stat(zipFile);

    if (statsFile.isFile() && !statsDir.isDirectory()) {
      const readableStream = createReadStream(fileToCompress);
      const writableStream = createWriteStream(zipFile);
      readableStream
        .pipe(createBrotliCompress())
        .pipe(writableStream)
        .on('finish', () => {
          console.log(`Compression process done, result in  ${zipFile}`);
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
