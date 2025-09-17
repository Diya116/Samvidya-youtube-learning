import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Target, Clock } from "lucide-react";

interface SetGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialHours?: number;
  initialMinutes?: number;
  onSave?: (hours: number, minutes: number) => void;
}

export function SetGoalDialog({ open, onOpenChange, initialHours = 1, initialMinutes = 0, onSave }: SetGoalDialogProps) {
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);

  const handleSave = () => {
    onSave?.(hours, minutes);
    onOpenChange(false);
  };

  const handleHoursChange = (value: string) => {
    const num = Math.max(0, Math.min(24, parseInt(value) || 0));
    setHours(num);
  };

  const handleMinutesChange = (value: string) => {
    const num = Math.max(0, Math.min(59, parseInt(value) || 0));
    setMinutes(num);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Set Daily Goal
          </DialogTitle>
          <DialogDescription>
            Set your daily learning time goal in hours and minutes.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-center gap-4">
            <div className="text-center space-y-2">
              <Label htmlFor="hours" className="text-sm font-medium">Hours</Label>
              <div className="relative">
                <Input
                  id="hours"
                  type="number"
                  min="0"
                  max="24"
                  value={hours}
                  onChange={(e) => handleHoursChange(e.target.value)}
                  className="w-20 text-center text-lg font-semibold"
                />
              </div>
            </div>
            
            <div className="text-2xl font-bold text-muted-foreground mt-6">:</div>
            
            <div className="text-center space-y-2">
              <Label htmlFor="minutes" className="text-sm font-medium">Minutes</Label>
              <div className="relative">
                <Input
                  id="minutes"
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => handleMinutesChange(e.target.value)}
                  className="w-20 text-center text-lg font-semibold"
                />
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Daily goal: {hours}h {minutes}m
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Goal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}