// import { useAuth } from "@/context/AuthContext"
// import NavbarNew from "@/components/layout/Sidebar";
// function Profile() {
//   const { user } = useAuth();

//   return (
//     <div className="flex">
//       {/* <NavbarNew/> */}
//       <div>
//       <h1 className="text-primary font-bold text-5xl m-9">Good Morning, {user?.name}</h1>
//       {user ? (
//         <div>
//           <button className="p-2 bg-blue-300 border rounded">Edit Profile</button>
//           <button>Set Daily Goal</button>
//         </div>
//       ) : (
//         <p>Please log in to view your profile.</p>
//       )}
//       </div>
//     </div>
//   )
// }

// export default Profile
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
//import { Badge } from "@/components/ui/badge";
import { Calendar, Flame, Target, Clock, Trophy, User, Edit } from "lucide-react";
//import { useNavigate } from "react-router-dom";
import { EditProfileDialog } from "@/components/profile/EditProfileDialog";
import { SetGoalDialog } from "@/components/profile/SetGoalDialog";
import { CircularProgressWidget } from "@/components/widget/CircularProgressWidget";
import { StatsCard } from "@/components/widget/StatsCard";

export default function Profile() {
  //const navigate = useNavigate();
  
  // Profile state
  const [profileData] = useState({
    name: "Shah Diya",
    email: "shahdiya1962004@gmail.com"
  });
  
  // Dialog states
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSetGoal, setShowSetGoal] = useState(false);
  
  // Goal state
  const [dailyGoal, setDailyGoal] = useState({ hours: 2, minutes: 0 });
  //const [todayProgress, setTodayProgress] = useState(45); // minutes studied today
  
  // Generate streak data for the last 365 days
  const generateStreakData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Simulate activity (random for demo)
      const activity = Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0;
      
      data.push({
        date: date.toISOString().split('T')[0],
        count: activity,
        level: activity === 0 ? 0 : activity <= 1 ? 1 : activity <= 2 ? 2 : activity <= 3 ? 3 : 4
      });
    }
    return data;
  };

  const [streakData] = useState(generateStreakData());
  const currentStreak = 5; // Mock data
  const longestStreak = 5; // Mock data  
 // const totalLessons = 156; // Mock data
  const totalTime = 2340; // Mock data in minutes
  
  // Calculate goal progress
  //const goalMinutes = dailyGoal.hours * 60 + dailyGoal.minutes;
  
  const handleSaveGoal = (hours: number, minutes: number) => {
    setDailyGoal({ hours, minutes });
  };

  const getActivityColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-muted';
      case 1: return 'bg-primary/20';
      case 2: return 'bg-primary/40';
      case 3: return 'bg-primary/60';
      case 4: return 'bg-primary';
      default: return 'bg-muted';
    }
  };

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">{profileData.name}</h1>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEditProfile(true)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Profile
                </Button>
              </div>
              <p className="text-muted-foreground">{profileData.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowSetGoal(true)} 
              variant="outline"
              className="bg-primary/5 border-primary/20 hover:bg-primary/10"
            >
              <Target className="h-4 w-4 mr-2" />
              Set Daily Goal
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
            <CircularProgressWidget currentHours={5} goalHours={8} />
          
          <StatsCard
            title="Current Streak"
            value={`${currentStreak}`}
            icon={Flame}
            color="progress"
          />

          <StatsCard
            title="Max Streak"
            value={`${longestStreak}`}
            icon={Trophy}
            color="success"
          />

          <StatsCard
            title="Total Time"
            value={`${Math.floor(totalTime / 60)}h ${totalTime % 60}m`}
            icon={Clock}
            color="focus"
          />
        </div>

        {/* Activity Streak Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Learning Activity
            </CardTitle>
            <CardDescription>
              Your daily learning streak over the past year
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Month labels */}
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              {months.map((month, index) => (
                <span key={month} className={index % 2 === 0 ? '' : 'opacity-0'}>
                  {month}
                </span>
              ))}
            </div>
            
            {/* Activity grid */}
            <div className="grid grid-cols-53 gap-1 max-w-full overflow-x-auto">
              {streakData.map((day, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-sm ${getActivityColor(day.level)} cursor-pointer hover:ring-1 hover:ring-primary`}
                  title={`${day.date}: ${day.count} activities`}
                />
              ))}
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Less</span>
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-sm ${getActivityColor(level)}`}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Dialogs */}
      <EditProfileDialog
        open={showEditProfile}
        onOpenChange={setShowEditProfile}
        initialName={profileData.name}
        initialEmail={profileData.email}
      />
      
      <SetGoalDialog
        open={showSetGoal}
        onOpenChange={setShowSetGoal}
        initialHours={dailyGoal.hours}
        initialMinutes={dailyGoal.minutes}
        onSave={handleSaveGoal}
      />
    </div>
  );
}