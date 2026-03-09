import { BookOpen, Award, ClipboardList, Clock, TrendingUp, Flame, Users, Play, Star, ArrowRight } from "lucide-react";

const stats = [
  { icon: BookOpen, label: "Courses Enrolled", value: "12", change: "+2 this month", color: "text-primary" },
  { icon: Award, label: "Completed", value: "7", change: "58% rate", color: "text-success" },
  { icon: ClipboardList, label: "Pending Assignments", value: "4", change: "Due this week", color: "text-warning" },
  { icon: Award, label: "Certificates", value: "5", change: "+1 new", color: "text-primary" },
  { icon: Clock, label: "Learning Hours", value: "248h", change: "+12h this week", color: "text-muted-foreground" },
  { icon: Flame, label: "Learning Streak", value: "14 days", change: "Personal best!", color: "text-destructive" },
];

const courses = [
  { title: "Advanced React Patterns", instructor: "Sarah Chen", progress: 72, lessons: "18/25", category: "Frontend", thumb: "🔵" },
  { title: "Python Machine Learning", instructor: "Dr. Kumar", progress: 45, lessons: "9/20", category: "AI/ML", thumb: "🟢" },
  { title: "Node.js Microservices", instructor: "Alex Rivera", progress: 90, lessons: "27/30", category: "Backend", thumb: "🟡" },
  { title: "UI/UX Design Systems", instructor: "Maya Johnson", progress: 30, lessons: "6/20", category: "Design", thumb: "🟣" },
];

const activities = [
  { text: "Completed lesson 18 of Advanced React Patterns", time: "2 hours ago", icon: "✅" },
  { text: "Submitted assignment: ML Model Evaluation", time: "5 hours ago", icon: "📝" },
  { text: "Earned certificate: JavaScript Mastery", time: "1 day ago", icon: "🏆" },
  { text: "Booked session with Dr. Kumar", time: "2 days ago", icon: "📅" },
];

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner with Parallax */}
      <div className="parallax-section relative overflow-hidden rounded-2xl gradient-primary p-6 sm:p-8 text-primary-foreground">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-3xl">
            👨‍🎓
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Welcome back, Alex!</h1>
            <p className="text-primary-foreground/80 text-sm mt-1">Student ID: STU-2024-0847 · Full Stack Development Program</p>
            <p className="text-primary-foreground/70 text-xs mt-1">Mentor: Dr. Sarah Chen · Enrolled: Jan 2024</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="badge-primary bg-primary-foreground/20 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">Level 8</span>
            <span className="text-xs text-primary-foreground/70">2,450 / 3,000 XP</span>
            <div className="w-24 h-1.5 rounded-full bg-primary-foreground/20 overflow-hidden">
              <div className="h-full bg-primary-foreground/80 rounded-full" style={{ width: "82%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((s, i) => (
          <div key={i} className="stat-card animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
            <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{s.change}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Courses */}
        <div className="lg:col-span-2 space-y-4">
          <div className="section-header">
            <h2 className="page-title text-lg">My Courses</h2>
            <button className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline">View All <ArrowRight className="w-3 h-3" /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {courses.map((c, i) => (
              <div key={i} className="card-premium p-4 hover-lift animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{c.thumb}</span>
                  <span className="badge-primary">{c.category}</span>
                </div>
                <h3 className="font-semibold text-foreground text-sm">{c.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{c.instructor}</p>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{c.lessons} lessons</span>
                    <span>{c.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full gradient-primary transition-all duration-500" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
                <button className="mt-3 w-full btn-primary text-xs justify-center py-1.5">
                  <Play className="w-3 h-3" /> Continue Learning
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div>
          <h2 className="page-title text-lg mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {activities.map((a, i) => (
              <div key={i} className="card-premium p-3 flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                <span className="text-lg">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground font-medium">{a.text}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mentor Card */}
          <div className="mt-4 card-premium p-4 parallax-section">
            <h3 className="text-sm font-semibold text-foreground mb-3">Your Mentor</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">SC</div>
              <div>
                <p className="text-sm font-semibold text-foreground">Dr. Sarah Chen</p>
                <p className="text-xs text-muted-foreground">Full Stack Expert</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 text-warning fill-warning" />
                  <span className="text-xs text-muted-foreground">4.9 · 120 sessions</span>
                </div>
              </div>
            </div>
            <button className="mt-3 w-full btn-secondary text-xs justify-center py-1.5">Book Session</button>
          </div>
        </div>
      </div>
    </div>
  );
}
