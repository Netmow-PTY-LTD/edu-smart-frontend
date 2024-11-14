export const getSubdomainHelperFunction = () => {
  const domain = window.location.hostname;
  const parts = domain.split('.');
  if (parts.length === 3 && parts[0] !== 'www') {
    return parts[0];
  }
  if (parts.length === 3 && parts[0] === 'www') {
    return parts[1];
  }
  if (parts.length === 2 && parts[0] !== 'squaddeck') {
    return parts[0];
  }
  if (parts?.length === 2 && parts.includes('localhost')) {
    return parts[0];
  }
  return '';
};
