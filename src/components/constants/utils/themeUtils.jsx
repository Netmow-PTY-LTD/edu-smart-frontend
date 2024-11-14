export const bgPrimary = (themeData) => ({
  backgroundColor: themeData?.branding?.primary_color?.trim() || '#9344E8',
});

export const bgSecondary = (themeData) => ({
  backgroundColor: themeData?.branding?.secondary_color?.trim() || '#162A73',
});

export const navLinkColor = (themeData) => ({
  color: themeData?.branding?.menu_color?.trim() || '#fff',
});

export const colorPrimary = (themeData) => ({
  color: themeData?.branding?.primary_color?.trim() || '#9344E8',
});

export const colorSecondary = (themeData) => ({
  color: themeData?.branding?.secondary_color?.trim() || '#162A73',
});
