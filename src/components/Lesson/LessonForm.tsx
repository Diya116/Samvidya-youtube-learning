import React, { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { Link2, ExternalLink, Youtube, Loader2, List } from "lucide-react";

import type { Lesson } from "@/types/lesson";
import type { YouTubeVideoDetails } from "@/types/types";

import { fetchYouTubeDetails } from "@/services/fetchYouTubeDetails";
import { fetchPlaylistVideo } from "@/services/fetchYouTubeDetails";
import { extractVideoId } from "@/utils/extractVideoId";

export const LessonForm: React.FC<{
  onAddLessons: (lesson: Lesson[]) => void;
  onAddLesson: (lesson: Omit<Lesson, "id">) => void;
  onCancel: () => void;
  editingLesson?: Lesson;
  onUpdateLesson?: (lesson: Lesson) => void;
}> = ({
  onAddLessons,
  onAddLesson,
  onCancel,
  editingLesson,
  onUpdateLesson,
}) => {
  const [activeTab, setActiveTab] = useState("single");
  const [lessonData, setLessonData] = useState({
    title: editingLesson?.title || "",
    description: editingLesson?.description || "",
    videoId: editingLesson?.videoId || "",
    duration: editingLesson?.duration || "",
    thumbnail: editingLesson?.thumbnail || "",
    //order: editingLesson?.order,
  });
  // const [playlistData, setPlaylistData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [playlistUrl, setPlaylistUrl] = useState("");
  //const [order, setOrder] = useState(0);
  const [singleVideoUrl, setSingleVideoUrl] = useState("");
  const [isLoadingPlaylist, setIsLoadingPlaylist] = useState(false);
  //set error for yt singlevideo+playlist
  const [error, setError] = useState<{ video?: string; playlist?: string }>({});
  const importFromPlaylist = async () => {
    if (!playlistUrl) return;
    try {
      setIsLoadingPlaylist(true);
      setError((prev) => ({ ...prev, playlist: undefined }));
      const playlist: Lesson[] | null = await fetchPlaylistVideo(playlistUrl);
      console.log(playlist);
      if (playlist) {
        //const newPlaylist=playlist?.map(item=>({...item,order:order+1}))
        onAddLessons(playlist);
        setIsLoadingPlaylist(false);
      }
    } catch (error) {
      setError((prev) => ({
        ...prev,
        playlist:
          "Failed to fetch playlist. Please check the URL and try again it must be a valid and public url.",
      }));
      setIsLoadingPlaylist(false);
      console.error("Failed to fetch playlist video:", error);
    } finally {
      setIsLoadingPlaylist(false);
    }
  };
  const handleFetchDetails = async () => {
    if (!lessonData.videoId) return;
    setIsLoading(true);
    setError((prev) => ({ ...prev, video: undefined }));
    try {
      const details: YouTubeVideoDetails | null = await fetchYouTubeDetails(
        lessonData.videoId
      );
      if (details) {
        setLessonData((prev) => ({
          ...prev,
          title: details.title,
          description: details.description,
          duration: details.duration,
          thumbnail: details.thumbnail,
          //order: order + 1,
        }));
        // setOrder((prev) => prev + 1);
      }
    } catch (error) {
      setError((prev) => ({
        ...prev,
        video:
          "Failed to fetch. Please check the URL and try again it must be a valid and public url.",
      }));
      console.error("Failed to fetch video details:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = () => {
    if (editingLesson && onUpdateLesson) {
      onUpdateLesson({
        ...editingLesson,
        ...lessonData,
      });
    } else {
      onAddLesson(lessonData);
    }
    onCancel();
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="single">
                <Link2 className="h-4 w-4" />
                Single Video
              </TabsTrigger>
              <TabsTrigger value="playlist">Import Playlist</TabsTrigger>
            </TabsList>
            <TabsContent value="single">
              <div className="space-y-4">
                {/* YouTube URL Input */}
                <div className="space-y-2">
                  {error.video && (
                    <p className="text-red-600 mt-2 border border-red-400 p-2 rounded bg-red-50">
                      {error.video}
                    </p>
                  )}
                  <Label htmlFor="videoUrl">YouTube Video URL</Label>
                  <div className="flex flex-col gap-2 sm:flex">
                    <div className="relative flex-1">
                      <Youtube className="absolute left-3 top-3 h-4 w-4 text-red-500" />
                      <Input
                        id="videoUrl"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={singleVideoUrl}
                        onChange={(e) => {
                          setSingleVideoUrl(e.target.value);
                          const getvideoId =
                            extractVideoId(e.target.value) || "";
                          setLessonData((prev) => ({
                            ...prev,
                            videoId: getvideoId,
                          }));
                        }}
                        className="pl-10"
                        required
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleFetchDetails}
                      disabled={isLoading || !lessonData.videoId}
                      className="shrink-0"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
                      ) : (
                        <ExternalLink className="w-4 h-4" />
                      )}
                      Fetch Details
                    </Button>
                  </div>
                </div>

                {/* Lesson Title */}
                <div className="space-y-2">
                  <Label htmlFor="lessonTitle">Lesson Title</Label>
                  <Input
                    id="lessonTitle"
                    placeholder="Enter lesson title"
                    value={lessonData.title}
                    onChange={(e) =>
                      setLessonData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                {/* Lesson Description */}
                <div className="space-y-2">
                  <Label htmlFor="lessonDescription">Lesson Description</Label>
                  <Textarea
                    id="lessonDescription"
                    placeholder="Enter lesson description"
                    value={lessonData.description}
                    onChange={(e) =>
                      setLessonData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={3}
                  />
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (optional)</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 10:30"
                    value={lessonData.duration}
                    onChange={(e) =>
                      setLessonData((prev) => ({
                        ...prev,
                        duration: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1"
                  >
                    {editingLesson ? "Update Lesson" : "Add Lesson"}
                  </Button>
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="playlist" className="space-y-4">
              <div>
                {error.playlist && (
                  <p className="text-red-600 mt-2 border border-red-400 p-2 rounded bg-red-50">
                    {error.playlist}
                  </p>
                )}
                <Label htmlFor="playlistUrl">YouTube Playlist URL</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="playlistUrl"
                    placeholder="https://youtube.com/playlist?list=..."
                    value={playlistUrl}
                    onChange={(e) => setPlaylistUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={importFromPlaylist}
                    // variant="learning"
                    disabled={!playlistUrl.trim() || isLoadingPlaylist}
                  >
                    {isLoadingPlaylist ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <List className="h-4 w-4" />
                    )}
                    Fetch All Video
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Import all videos from a YouTube playlist at once
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonForm;
