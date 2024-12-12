export const convertImageUrlToFile = async (imageUrl) => {
  if (!imageUrl) {
    throw new Error('Invalid image URL');
  }

  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob().then((data) => {
      const file = new File([data], 'image.jpg', { type: 'image/jpeg' });
      return file;
    });

    return blob;
  } catch (error) {
    console.error('Error fetching image:', error);
    throw new Error('Failed to convert image URL to file');
  }
};
