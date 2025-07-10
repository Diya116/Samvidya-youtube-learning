import React, { useState } from 'react';
import {  ExternalLink,Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {fetchYouTubeDetails} from "@/services/fetchYouTubeDetails"
import type { Lesson } from '@/types/types';

export const LessonForm: React.FC<{
  onAddLesson: (lesson: Omit<Lesson, 'id'>) => void;
  onCancel: () => void;
  editingLesson?: Lesson;
  onUpdateLesson?: (lesson: Lesson) => void;
}> = ({ onAddLesson, onCancel, editingLesson, onUpdateLesson }) => {
  const [lessonData, setLessonData] = useState({
    title: editingLesson?.title || '',
    description: editingLesson?.description || '',
    videoUrl: editingLesson?.videoUrl || '',
    duration: editingLesson?.duration || ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchDetails = async () => {
    if (!lessonData.videoUrl) return;
    
    setIsLoading(true);
    try {
      const details: any = await fetchYouTubeDetails(lessonData.videoUrl);
      if (details) {
        setLessonData(prev => ({
          ...prev,
          title: details.title,
          description: details.description,
          duration: details.duration
        }));
      }
    } catch (error) {
      console.error('Failed to fetch video details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (editingLesson && onUpdateLesson) {
      onUpdateLesson({
        ...editingLesson,
        ...lessonData
      });
    } else {
      onAddLesson(lessonData);
    }
    onCancel();
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">
          {editingLesson ? 'Edit Lesson' : 'Add New Lesson'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* YouTube URL Input */}
          <div className="space-y-2">
            <Label htmlFor="videoUrl">YouTube Video URL</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Youtube className="absolute left-3 top-3 h-4 w-4 text-red-500" />
                <Input
                  id="videoUrl"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={lessonData.videoUrl}
                  onChange={(e) => setLessonData(prev => ({ ...prev, videoUrl: e.target.value }))}
                  className="pl-10"
                  required
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleFetchDetails}
                disabled={isLoading || !lessonData.videoUrl}
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
              onChange={(e) => setLessonData(prev => ({ ...prev, title: e.target.value }))}
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
              onChange={(e) => setLessonData(prev => ({ ...prev, description: e.target.value }))}
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
              onChange={(e) => setLessonData(prev => ({ ...prev, duration: e.target.value }))}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button type="button" onClick={handleSubmit} className="flex-1">
              {editingLesson ? 'Update Lesson' : 'Add Lesson'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};