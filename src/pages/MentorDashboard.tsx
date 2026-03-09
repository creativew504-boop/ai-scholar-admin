import { Users, BookOpen, Clock, Star, ClipboardList, TrendingUp, ArrowRight, Calendar, CheckCircle } from "lucide-react";

const stats = [
  { icon: Users, label: "Students Mentored", value: "48", change: "+5 this month", color: "text-primary" },
  { icon: BookOpen, label: "Courses Teaching", value: "6", change: "3 active batches", color: "text-success" },
  { icon: Clock, label: "Sessions Completed", value: "312", change: "+18 this month", color: "text-warning" },
  { icon: Star, label: "Average Rating", value: "4.9", change: "From 280 reviews", color: "text-primary" },
  { icon: ClipboardList, label: "Assignments Reviewed", value: "156", change: "12 pending", color: "text-muted-foreground" },
];

const students = [
  { name: "Alex Johnson", course: "Advanced React", progress: 72, lastActive: "2 hours ago", avatar: "AJ" },
  { name: "Priya Sharma", course: "Python ML", progress: 85, lastActive: "1 hour ago", avatar: "PS" },
  { name: "Michael Lee", course: "Node.js Services", progress: 60, lastActive: "3 hours ago", avatar: "ML" },
  { name: "Emma Wilson", course: "UI/UX Design", progress: 45, lastActive: "5 hours ago", avatar: "EW" },
  { name: "Carlos Rodriguez", course: "Advanced React", progress: 92, lastActive: "30 min ago", avatar: "CR" },
];

const upcomingSessions = [
  { student: "Alex Johnson", topic: "React Performance", time: "Today, 2:00 PM", status: "upcoming" },
  { student: "Priya Sharma", topic: "Model Training", time: "Today, 4:30 PM", status: "upcoming" },
  { student: "Michael Lee", topic: "API Design", time: "Tomorrow, 10:00 AM", status: "scheduled" },
];

const pendingReviews = [
  { student: "Emma Wilson", assignment: "Design System Components", submitted: "2 hours ago", course: "UI/UX Design" },
  { student: "Carlos Rodriguez", assignment: "Custom Hooks", submitted: "5 hours ago", course: "Advanced React" },
  { student: "Priya Sharma", assignment: "Feature Engineering", submitted: "1 day ago", course: "Python ML" },
];

export default function MentorDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="parallax-section relative overflow-hidden rounded-2xl p-6 sm:p-8 border border-border bg-card">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xl">SC</div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">Good morning, Dr. Sarah!</h1>
            <p className="text-sm text-muted-foreground mt-1">Full Stack Development Expert · 8 years experience</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span className="text-sm font-semibold text-foreground">4.9</span>
              </div>
              <span className="text-xs text-muted-foreground">48 active students · 6 courses</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn-primary text-xs py-2">Start Session</button>
            <button className="btn-secondary text-xs py-2">View Schedule</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
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
        {/* Students */}
        <div className="lg:col-span-2">
          <div className="section-header">
            <h2 className="page-title text-lg">My Students</h2>
            <button className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline">View All <ArrowRight className="w-3 h-3" /></button>
          </div>
          <div className="card-premium overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="table-header text-left p-3">Student</th>
                    <th className="table-header text-left p-3">Course</th>
                    <th className="table-header text-left p-3">Progress</th>
                    <th className="table-header text-left p-3">Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">{s.avatar}</div>
                          <span className="text-sm font-medium text-foreground">{s.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">{s.course}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full gradient-primary" style={{ width: `${s.progress}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{s.progress}%</span>
                        </div>
                      </td>
                      <td className="p-3 text-xs text-muted-foreground">{s.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Sessions */}
          <div>
            <h2 className="page-title text-lg mb-3">Upcoming Sessions</h2>
            <div className="space-y-2">
              {upcomingSessions.map((s, i) => (
                <div key={i} className="card-premium p-3 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{s.student}</p>
                      <p className="text-xs text-muted-foreground">{s.topic}</p>
                    </div>
                    <span className="badge-primary text-[10px]">{s.status}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{s.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Reviews */}
          <div>
            <h2 className="page-title text-lg mb-3">Pending Reviews</h2>
            <div className="space-y-2">
              {pendingReviews.map((r, i) => (
                <div key={i} className="card-premium p-3 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                  <p className="text-sm font-medium text-foreground">{r.assignment}</p>
                  <p className="text-xs text-muted-foreground">{r.student} · {r.course}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-muted-foreground">{r.submitted}</span>
                    <button className="text-xs text-primary font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
