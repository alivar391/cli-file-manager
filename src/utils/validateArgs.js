export const validateArgs = (argsArr) => {
  const newArgs = argsArr.split("'");
  const arr1 = newArgs.filter(i => i.length > 1 && i !== ',');
  const arr2 = arr1.map(elem => elem.replaceAll("'", "").trim());
  return arr2;
}