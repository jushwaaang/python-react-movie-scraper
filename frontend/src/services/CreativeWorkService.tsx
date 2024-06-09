// Add any additional headers here
import api from "./api";

// Define the interface for movie data
interface MovieData {
  id: number;
  title: string;
  page_url: string;
  thumbnail_url: string;
  source: string;
  type: string;
}

interface OutputResult {
  count: number;
  next: string;
  previous: string;
  results: MovieData[]
}

// Fetch movie data from the backend API
const fetchMovieData = async (params: any): Promise<OutputResult> => {
  const response = await api.get("/creativework/", { params });
  return response.data;
};

const fetchUniqueSources = async (): Promise<string[]> => {
  const response = await api.get("/creativework/sources/");
  return response.data;
};
// Export the movie data fetching function and genres array
export { fetchMovieData, fetchUniqueSources };
export type { MovieData };
