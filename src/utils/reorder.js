//Drag drop reorder function
const reorder = (array, startIndex, endIndex) => {
  const result = [...array];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  console.log({ array, result, startIndex, endIndex });
  return result;
};

export default reorder;
