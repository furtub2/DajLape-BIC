import axios from 'axios';

export function handleAxiosError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    console.error('Error during request:', error);
    return error.response?.data?.message || 'Request failed. Please try again.';
  } else if (error instanceof Error) {
    console.error('Unexpected error:', error);
    return error.message;
  } else {
    console.error('Unknown error:', error);
    return 'An unknown error occurred. Please try again.';
  }
}
