import { TrendingUp, Users, BookOpen, Star, Award } from "lucide-react";

const studentPerformance = [
  { name: "Carlos Rodriguez", progress: 92, grade: "A+" },
  { name: "Priya Sharma", progress: 85, grade: "A+" },
  { name: "Alex Johnson", progress: 72, grade: "A" },
  { name: "Michael Lee", progress: 60, grade: "B+" },
  { name: "Emma Wilson", progress: 45, grade: "A" },
  { name: "Sarah Kim", progress: 38, grade: "B" },
];

const courseCompletion = [
  { course: "Advanced React", enrolled: 18, completed: 12, rate: 67 },
  { course: "Python ML", enrolled: 15, completed: 8, rate: 53 },
  { course: "Node.js Services", enrolled: 12, completed: 9, rate: 75 },
  { course: "UI/UX Design", enrolled: 10, completed: 4, rate: 40 },
];

const monthlyStats = [
  { month: "Oct", sessions: 28, reviews: 45 },
  { month: "Nov", sessions: 32, reviews: 52 },
  { month: "Dec", sessions: 25, reviews: 38 },
  { month: "Jan", sessions: 35, reviews: 48 },
  { month: "Feb", sessions: 38, reviews: 55 },
  { month: "Mar", sessions: 18, reviews: 30 },
];

const maxSessions = Math.max(...monthlyStats.map(m => m.sessions));

export default function MentorAnalytics() {
  return (
    <div className="space-y-6">
      <div className="parallax-section">
        <h1 className="page-title">Analytics</h1>
        <p className="page-subtitle">Track student performance and your mentoring impact</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: Users, label: "Total Students", value: "48", color: "text-primary" },
          { icon: Star, label: "Avg Rating", value: "4.9/5", color: "text-warning" },
          { icon: Award, label: "Completion Rate", value: "72%", color: "text-success" },
          { icon: TrendingUp, label: "Avg Progress", value: "65%", color: "text-primary" },
        ].map((s, i) => (
          <div key={i} className="stat-card animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
            <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Session Activity */}
        <div className="card-premium p-5">
          <h3 className="font-bold text-foreground mb-4">Monthly Sessions</h3>
          <div className="flex items-end gap-3 h-40">
            {monthlyStats.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground">{m.sessions}</span>
                <div className="w-full rounded-t-lg gradient-primary transition-all" style={{ height: `${(m.sessions / maxSessions) * 100}%` }} />
                <span className="text-xs text-muted-foreground">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Course Completion */}
        <div className="card-premium p-5">
          <h3 className="font-bold text-foreground mb-4">Course Completion Rates</h3>
          <div className="space-y-4">
            {courseCompletion.map((c, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-foreground">{c.course}</span>
                  <span className="text-muted-foreground">{c.completed}/{c.enrolled} · {c.rate}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full gradient-primary" style={{ width: `${c.rate}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Performance Ranking */}
      <div className="card-premium p-5">
        <h3 className="font-bold text-foreground mb-4">Student Performance</h3>
        <div className="space-y-2">
          {studentPerformance.map((s, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
              <span className="text-sm font-bold text-muted-foreground w-6">#{i + 1}</span>
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">{s.name.split(" ").map(n => n[0]).join("")}</div>
              <div className="flex-1"><p className="text-sm font-medium text-foreground">{s.name}</p></div>
              <div className="w-32 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full gradient-primary" style={{ width: `${s.progress}%` }} />
              </div>
              <span className="text-xs text-muted-foreground">{s.progress}%</span>
              <span className="badge-success text-[10px]">{s.grade}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
