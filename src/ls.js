import * as fs from 'fs';
import * as path from 'path';

export const listFiles = async (currentDirectory) => {
  try {
    const dirEntries = [];
    const entries = await fs.promises.readdir(currentDirectory, { withFileTypes: true });
    for (const element of entries) {
      const elementPath = path.join(currentDirectory, element.name);
      if (element.isDirectory()) {
        dirEntries.push(['Directory', element.name, '']);
      } else {
        const stats = await fs.promises.stat(elementPath);
        dirEntries.push(['File', element.name, stats["size"]]);
      };
    };
    console.table(dirEntries);
  } catch {
    console.log('Operation failed');
  }
};