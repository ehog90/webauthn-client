export const getBaseUrl = () => {
  return (process.env.REACT_APP_BASE_URL ?? window.origin) + "/api";
};
