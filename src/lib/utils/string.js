export const getUniqueId = (length) => {
  const uniqueId = new Date().getTime().toString(36) + Math.random().toString(36).slice(2);
  if (length) {
    return uniqueId.slice(uniqueId.length - length, uniqueId.length);
  }
  return uniqueId;
};
