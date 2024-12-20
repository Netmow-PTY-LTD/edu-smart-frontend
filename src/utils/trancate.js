import DOMPurify from 'dompurify';

export const truncateText = (text, maxLength) => {
  if (typeof text !== 'string') {
    console.warn('Input text must be a string.');
    return '';
  }

  const sanitizedText = DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
  return sanitizedText.length > maxLength
    ? sanitizedText.substring(0, maxLength) + '...'
    : sanitizedText;
};
