import { toast } from 'react-toastify';

export const downloadFiles = (
  fileUrls,
  toastMessage = 'Downloading files...'
) => {
  if (!fileUrls || fileUrls.length === 0) {
    toast.error('No valid files found to download');
    return;
  }

  toast.success(toastMessage);

  fileUrls.forEach((fileUrl, index) => {
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', fileUrl.split('/').pop() || `file${index}`); // Extract filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, index * 1000); // Delay to prevent browser blocking
  });
};
