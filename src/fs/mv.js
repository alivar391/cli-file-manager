import * as fs from 'fs';
import * as path from 'path';
import { cwd } from 'process';

export const mv = async (args) => {
  const [fileName, newFileName] = args.split(' ');
  let fileToCopy;
  let newDirectory;
  let clearFileName;
  try {
    if (path.isAbsolute(fileName)) {
      fileToCopy = path.resolve(cwd(), fileName);
      let arr = fileName.split('\\');
      clearFileName = arr[arr.length - 1];
    } else {
      fileToCopy = path.join(cwd(), fileName);
      clearFileName = fileName;
    }
    if (path.isAbsolute(newFileName)) {
      newDirectory = path.resolve(cwd(), newFileName);
    } else {
      newDirectory = path.join(cwd(), newFileName);
    }
    const stats = await fs.promises.stat(newDirectory);
    if (!stats.isDirectory) {
      console.log('Operation failed: End path is not a directory');
      return;
    }
    const readableStream = fs.createReadStream(fileToCopy);
    const writableStream = fs.createWriteStream(path.join(newDirectory, clearFileName));
    readableStream.pipe(writableStream);
    readableStream.on('error', () => {
      console.log('Operation failed');
      console.log(`You are currently in ${cwd()}\\`);
    });
    readableStream.on('end', async () => {
      await fs.promises.unlink(fileToCopy);
      console.log('File moved successfully');
      console.log(`You are currently in ${cwd()}\\`);
    })
  }
  catch (err) {
    console.log('Operation failed');
    console.log(`You are currently in ${cwd()}\\`);
  }
};
