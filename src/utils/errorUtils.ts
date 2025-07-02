export const getErrorMessage = (error: unknown): string => {
  if (error && typeof error === 'object' && 'message' in error) {
    return error.message as string;
  }
  return 'Unknown error occurred.';
};
