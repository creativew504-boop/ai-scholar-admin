import { TrendingUp, BookOpen, Clock, Target, Flame } from "lucide-react";

const weeklyData = [
  { day: "Mon", hours: 3.5 }, { day: "Tue", hours: 4.2 }, { day: "Wed", hours: 2.8 },
  { day: "Thu", hours: 5.1 }, { day: "Fri", hours: 3.9 }, { day: "Sat", hours: 6.2 }, { day: "Sun", hours: 4.5 },
];

const courseProgress = [
  { name: "Advanced React", progress: 72, total: 25, completed: 18 },
  { name: "Python ML", progress: 45, total: 20, completed: 9 },
  { name: "Node.js Services", progress: 90, total: 30, completed: 27 },
  { name: "UI/UX Design", progress: 30, total: 20, completed: 6 },
  { name: "Docker & K8s", progress: 15, total: 20, completed: 3 },
];

const achievements = [
  { title: "First Course Completed", icon: "🏆", earned: true },
  { title: "7-Day Streak", icon: "🔥", earned: true },
  { title: "Top Performer", icon: "⭐", earned: true },
  { title: "Code Master", icon: "💻", earned: false },
  { title: "30-Day Streak", icon: "🎯", earned: false },
  { title: "10 Courses", icon: "📚", earned: false },
];

const maxHours = Math.max(...weeklyData.map(d => d.hours));

export default function StudentProgress() {
  return (
    <div className="space-y-6">
      <div className="parallax-section">
        <h1 className="page-title">Progress Tracking</h1>
        <p className="page-subtitle">Monitor your learning journey and achievements</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: Clock, label: "This Week", value: "30.2h", sub: "+4.5h vs last week" },
          { icon: BookOpen, label: "Lessons Done", value: "63", sub: "+8 this week" },
          { icon: Flame, label: "Streak", value: "14 days", sub: "Personal best!" },
          { icon: Target, label: "Goals Met", value: "4/5", sub: "80% completion" },
        ].map((s, i) => (
          <div key={i} className="stat-card animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
            <s.icon className="w-5 h-5 text-primary mb-2" />
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <div className="card-premium p-5">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /> Weekly Study Activity</h3>
          <div className="flex items-end gap-3 h-40">
            {weeklyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground">{d.hours}h</span>
                <div className="w-full rounded-t-lg gradient-primary transition-all duration-500" style={{ height: `${(d.hours / maxHours) * 100}%` }} />
                <span className="text-xs text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Course Progress */}
        <div className="card-premium p-5">
          <h3 className="font-bold text-foreground mb-4">Course Progress</h3>
          <div className="space-y-4">
            {courseProgress.map((c, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-foreground">{c.name}</span>
                  <span className="text-muted-foreground">{c.completed}/{c.total} lessons · {c.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full gradient-primary transition-all duration-700" style={{ width: `${c.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="card-premium p-5">
        <h3 className="font-bold text-foreground mb-4">Achievements</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {achievements.map((a, i) => (
            <div key={i} className={`text-center p-3 rounded-xl transition-all ${a.earned ? "bg-primary/10" : "bg-muted opacity-50"}`}>
              <span className="text-2xl">{a.icon}</span>
              <p className="text-[10px] font-medium text-foreground mt-1">{a.title}</p>
              {a.earned && <span className="text-[10px] text-success">✓ Earned</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
