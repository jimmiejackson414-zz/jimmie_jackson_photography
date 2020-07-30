export const isEmpty = string => !string || string.length === 0;

export const truncate = (string, length = 140) => {
  if (isEmpty(string)) {
    return '...';
  }

  if (string.length < length) {
    return string.trim();
  }

  return `${string.substring(0, length)}...`;
};