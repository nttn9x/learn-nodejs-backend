export const filterObject = <T extends unknown>(
  obj: any,
  allowedFields: any
): T => {
  const newObj = {} as T;
  Object.keys(obj).forEach((el: string) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};
