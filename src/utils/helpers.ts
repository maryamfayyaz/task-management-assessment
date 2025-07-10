export const getErrorMessage = (error: any, defaultMessage = 'Something went wrong') => {
  return error ? error?.errors?.[0]?.message || error.message : defaultMessage;
};