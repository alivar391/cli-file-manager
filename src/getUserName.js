export const getUserName = (argv) => {
  const args = argv.slice(2, argv.length);
  const userName = args[0].split('=')[1];
  return userName;
}