import type { YouTubeVideoDetails } from "@/types/types";
import { extractPlaylistId } from "@/utils/extractPlaylistId";
import { formatDuration } from "@/utils/formatDuration";
import type { Lesson } from "@/types/lesson";
import { api } from "@/utils/axiosInstance";
export const fetchYouTubeDetails = async (
  videoId: string
): Promise<YouTubeVideoDetails | null> => {
  if (!videoId) return null;
  try {
    const response = await api.post('/youtube/video',{videoId});
    const data = response.data.data;
    if (!data.items || data.items.length === 0) return null;
    const video = data.items[0];
    const snippet = video.snippet;
    const contentDetails = video.contentDetails;
    const thumbnail = snippet.thumbnails.default.url;
    return {
      title: snippet.title,
      description: snippet.description,
      duration: formatDuration(contentDetails.duration),
      thumbnail,
    };
  } catch (error) {
    console.error("Error fetching YouTube video details:", error);
    return null;
  }
};

export const fetchPlaylistVideo = async (
  url: string
): Promise<Lesson[] | null> => {
  const playlistId = extractPlaylistId(url);
  if (!playlistId) return null;
  try {
    const response = await api.post('/youtube/playlist',{playlistId});
    const data = response.data.data;
    if (!data.items) return null;

    const videos: Lesson[] = await Promise.all(
      data.items.map(async (item: any) => {
        const videoId = item.snippet.resourceId.videoId;
        const details = await fetchYouTubeDetails(videoId);
        return {
          title: item.snippet.title,
          videoId,
          thumbnail: item.snippet.thumbnails?.medium?.url,
          description: item.snippet.description,
          duration: details?.duration || '00H 00M 00S',
        };
      })
    );

    return videos;
  } catch (err) {
    console.error("Failed to fetch playlist", err);
    return null;
  }
};

