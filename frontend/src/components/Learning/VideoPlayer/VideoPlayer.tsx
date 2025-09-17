type VideoPlayerProps = {
  currentLessonId: string;
  videoId:string
};

function VideoPlayer({ currentLessonId,videoId }: VideoPlayerProps) {
  if (!currentLessonId) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-black text-white">
        No video selected
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full border-0"
      />
    </div>
  );
}

export default VideoPlayer;
