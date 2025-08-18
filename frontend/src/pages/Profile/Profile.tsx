import { useAuth } from "@/context/AuthContext"

function Profile() {
  const { user } = useAuth();

  return (
    <div className="">
      <h1 className="text-primary font-bold text-5xl m-9">Good Morning, {user?.name}</h1>
      {user ? (
        <div>
          <button className="p-2 bg-blue-300 border rounded">Edit Profile</button>
          <button>Set Daily Goal</button>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  )
}

export default Profile
// import { useState } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Calendar, Flame, Target, Clock, BookOpen, Trophy, User } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function Profile() {
//   const navigate = useNavigate();
  
//   // Generate streak data for the last 365 days
//   const generateStreakData = () => {
//     const data = [];
//     const today = new Date();
    
//     for (let i = 364; i >= 0; i--) {
//       const date = new Date(today);
//       date.setDate(date.getDate() - i);
      
//       // Simulate activity (random for demo)
//       const activity = Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0;
      
//       data.push({
//         date: date.toISOString().split('T')[0],
//         count: activity,
//         level: activity === 0 ? 0 : activity <= 1 ? 1 : activity <= 2 ? 2 : activity <= 3 ? 3 : 4
//       });
//     }
//     return data;
//   };

//   const [streakData] = useState(generateStreakData());
//   const currentStreak = 7; // Mock data
//   const longestStreak = 23; // Mock data
//   const totalLessons = 156; // Mock data
//   const totalTime = 2340; // Mock data in minutes

//   const getActivityColor = (level: number) => {
//     switch (level) {
//       case 0: return 'bg-muted';
//       case 1: return 'bg-primary/20';
//       case 2: return 'bg-primary/40';
//       case 3: return 'bg-primary/60';
//       case 4: return 'bg-primary';
//       default: return 'bg-muted';
//     }
//   };

//   const months = [
//     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//   ];

//   return (
//     <div className="min-h-screen bg-background p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
//               <User className="h-8 w-8 text-primary" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold">Learning Profile</h1>
//               <p className="text-muted-foreground">Track your learning journey and achievements</p>
//             </div>
//           </div>
//           <Button onClick={() => navigate('/')} variant="outline">
//             Back to Dashboard
//           </Button>
//         </div>

//         {/* Stats Overview */}
//         <div className="grid gap-4 md:grid-cols-4">
//           <Card>
//             <CardHeader className="pb-3">
//               <div className="flex items-center gap-2">
//                 <Flame className="h-4 w-4 text-orange-500" />
//                 <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{currentStreak} days</div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="pb-3">
//               <div className="flex items-center gap-2">
//                 <Trophy className="h-4 w-4 text-yellow-500" />
//                 <CardTitle className="text-sm font-medium">Longest Streak</CardTitle>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{longestStreak} days</div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="pb-3">
//               <div className="flex items-center gap-2">
//                 <BookOpen className="h-4 w-4 text-blue-500" />
//                 <CardTitle className="text-sm font-medium">Total Lessons</CardTitle>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{totalLessons}</div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="pb-3">
//               <div className="flex items-center gap-2">
//                 <Clock className="h-4 w-4 text-green-500" />
//                 <CardTitle className="text-sm font-medium">Study Time</CardTitle>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{Math.floor(totalTime / 60)}h {totalTime % 60}m</div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Activity Streak Grid */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Calendar className="h-5 w-5" />
//               Learning Activity
//             </CardTitle>
//             <CardDescription>
//               Your daily learning streak over the past year
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {/* Month labels */}
//             <div className="flex justify-between text-xs text-muted-foreground mb-2">
//               {months.map((month, index) => (
//                 <span key={month} className={index % 2 === 0 ? '' : 'opacity-0'}>
//                   {month}
//                 </span>
//               ))}
//             </div>
            
//             {/* Activity grid */}
//             <div className="grid grid-cols-53 gap-1 max-w-full overflow-x-auto">
//               {streakData.map((day, index) => (
//                 <div
//                   key={index}
//                   className={`w-3 h-3 rounded-sm ${getActivityColor(day.level)} cursor-pointer hover:ring-1 hover:ring-primary`}
//                   title={`${day.date}: ${day.count} activities`}
//                 />
//               ))}
//             </div>
            
//             {/* Legend */}
//             <div className="flex items-center justify-between text-xs text-muted-foreground">
//               <span>Less</span>
//               <div className="flex items-center gap-1">
//                 {[0, 1, 2, 3, 4].map((level) => (
//                   <div
//                     key={level}
//                     className={`w-3 h-3 rounded-sm ${getActivityColor(level)}`}
//                   />
//                 ))}
//               </div>
//               <span>More</span>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Quick Actions */}
//         <div className="grid gap-4 md:grid-cols-2">
//           <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/daily-goals')}>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Target className="h-5 w-5" />
//                 Daily Goals
//               </CardTitle>
//               <CardDescription>Set and track your daily learning objectives</CardDescription>
//             </CardHeader>
//           </Card>

//           <Card className="cursor-pointer hover:shadow-lg transition-shadow">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Trophy className="h-5 w-5" />
//                 Achievements
//               </CardTitle>
//               <CardDescription>View your learning milestones and badges</CardDescription>
//             </CardHeader>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }