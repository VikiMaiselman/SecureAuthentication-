const size = {
  phone: "576px",
  tablet: "768px",
  largeTablet: "992px",
  laptop: "1024px",
  desktop: "1440px",
};

export const device = {
  phone: `(max-width: ${size.phone})`,
  tablet: `(max-width: ${size.tablet})`,
  largeTablet: `(max-width: ${size.largeTablet})`,
  laptop: `(max-width: ${size.laptop})`,
  desktop: `(min-width: ${size.laptop})`,
};
