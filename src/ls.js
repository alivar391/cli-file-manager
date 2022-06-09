import * as fs from 'fs';
import * as path from 'path';
import { cwd } from 'process';

export const listFiles = async () => {
  try {
    const currentDirectory = cwd();
    console.log(currentDirectory);
    const dirEntries = [];
    const entries = await fs.promises.readdir(`${currentDirectory}`, { withFileTypes: true });
    for (const element of entries) {
      const elementPath = path.join(currentDirectory, element.name);
      if (element.isDirectory()) {
        dirEntries.push([element.name, 'Directory', '']);
      } else if (element.isFile()) {
        try {
          const stats = await fs.promises.stat(elementPath);
          dirEntries.push([element.name, 'File', stats["size"]]);
        } catch {
          dirEntries.push([element.name, 'File', 'Unavailable info']);
        }
      } else {
        continue;
      }
    };
    console.table(dirEntries);
    console.log(`${currentDirectory}`);
  } catch {
    console.log('Operation failed');
  }
};