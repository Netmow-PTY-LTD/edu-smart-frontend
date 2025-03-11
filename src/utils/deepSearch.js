export const deepSearch = (obj, searchTerm) => {
  if (!obj) return false;

  // Convert search term to lowercase and split into words
  const searchWords = searchTerm.toLowerCase().split(' ');

  // Function to check if all words exist in object data
  const containsAllWords = (value) => {
    if (typeof value === 'string') {
      const lowerValue = value.toLowerCase();
      return searchWords.every((word) => lowerValue.includes(word));
    }
    return false;
  };

  // If obj is a string, check if it contains all words
  if (containsAllWords(obj)) {
    return true;
  }

  // If obj is an array, recursively search in each element
  if (Array.isArray(obj)) {
    return obj.some((item) => deepSearch(item, searchTerm));
  }

  // If obj is an object, recursively search in each property
  if (typeof obj === 'object') {
    return Object.values(obj).some((value) => deepSearch(value, searchTerm));
  }

  return false;
};
