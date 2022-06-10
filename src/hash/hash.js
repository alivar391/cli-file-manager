

export const hash = async () => {
  const fileBuffer = await fs.readFile(path.join(__dirname, 'files', 'fileToCalculateHashFor.txt'));
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  const hex = hashSum.digest('hex');
  console.log(hex);
};
