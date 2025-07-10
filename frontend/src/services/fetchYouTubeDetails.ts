import type { YouTubeVideoDetails } from "@/types/types";
import { extractVideoId } from "@/utils/extractVideoId";
import { formatDuration } from "@/utils/formatDuration";
export const fetchYouTubeDetails = async (url: string): Promise<YouTubeVideoDetails|null> => {
  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const videoId = extractVideoId(url);
  if (!videoId) return null;

  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet,contentDetails`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data)

    if (!data.items || data.items.length === 0) return null;

    const video = data.items[0];
    const snippet = video.snippet;
    const contentDetails = video.contentDetails;

    return {
      title: snippet.title,
      description: snippet.description,
      duration: formatDuration(contentDetails.duration),
    };
  } catch (error) {
    console.error("Error fetching YouTube video details:", error);
    return null;
  }
};
