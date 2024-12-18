// export const convertImageUrlToFile = async (imageUrl) => {
//   if (!imageUrl) {
//     throw new Error('Invalid image URL');
//   }

//   try {
//     const response = await fetch(imageUrl);
//     const blob = await response.blob().then((data) => {
//       const file = new File([data], 'image.jpg', { type: 'image/jpeg' });
//       return file;
//     });

//     return blob;
//   } catch (error) {
//     console.error('Error fetching image:', error);
//     throw new Error('Failed to convert image URL to file');
//   }
// };

export const convertImageUrlToFile = async (input) => {
  if (typeof input === 'string' && input.startsWith('http')) {
    try {
      const response = await fetch(input);
      const blob = await response.blob();
      const contentType = response.headers.get('content-type');

      const fileName = input.split('/').pop();

      const file = new File([blob], fileName, { type: contentType });
      return file;
    } catch (error) {
      console.error('Error fetching file from URL:', error);

      return null;
    }
  } else if (input instanceof File || input instanceof Blob) {
    return input;
  } else {
    return null;
  }
};
