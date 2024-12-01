export const isValidObject = (data: any) => {
  return typeof data === "object" && data
    ? Object.keys(data).length > 0
    : false;
};

export const isValidArray = (data: any) => {
  return data && Array.isArray(data) && data.length > 0;
};
