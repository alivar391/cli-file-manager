import * as fs from 'fs';
import * as path from 'path';
import { cwd } from 'process';

export const cp = async (args) => {
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
    const statsDir = await fs.promises.stat(newDirectory);
    const statsFile = await fs.promises.stat(fileToCopy);
    if (statsDir.isDirectory() && statsFile.isFile()) {
      const readableStream = fs.createReadStream(fileToCopy);
      const writableStream = fs.createWriteStream(path.join(newDirectory, clearFileName));
      readableStream.pipe(writableStream);
      readableStream.on('error', () => {
        console.log('Operation failed');
        console.log(`You are currently in ${cwd()}\\`);
      });
      readableStream.on('end', () => {
        console.log('File copied successfully');
        console.log(`You are currently in ${cwd()}\\`);
      })
    } else {
      console.log('Operation failed');
      console.log(`You are currently in ${cwd()}\\`);
    }
  }
  catch (err) {
    console.log('Operation failed');
    console.log(`You are currently in ${cwd()}\\`);
  }
};
