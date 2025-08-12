import { Request, Response, RequestHandler } from "express";
import axios from "axios";
export const fetchYouTubeDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { videoId } = req.body;
    if (!videoId) {
      res.status(400).json({ message: "videoId missing" });
    }
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet,contentDetails`;
    const response = await axios.get(apiUrl);
    res
      .status(200)
      .json({ message: "Successfully fetched video detail", data:response.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const fetchPlaylistDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { playlistId } = req.body;
    if (!playlistId) {
      res.status(400).json({ message: "playlistId missing" });
    }
    const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`;
    const response = await axios.get(apiUrl);
    res
      .status(200)
      .json({ message: "Successfully fetched playlist detail", data:response.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};
